import React, { useEffect, useState, useReducer, useRef } from 'react';
// import GifLoading from '.../public/giphy.gif'; // with import
import Product from './Product.js';

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET':
            return action.value;
        case 'SORT-ID':
            return state.slice().sort((a,b)=> (a.id > b.id) ? 1 : -1);
        case 'SORT-PRICE':
            return state.slice().sort((a,b)=> (a.price > b.price) ? 1 : -1)
        case 'SORT-SIZE':
            return state.slice().sort((a,b)=> (a.size > b.size) ? 1 : -1)
        default:
          return state
    }
}

function ProductLists() {
    const [products, dispatch] = useReducer(reducer, []);
    const cacheProducts = useRef([]);
    const currPage = useRef(1);
    const [loading, setLoading] = useState(true);


    const addCache = () => {
        const newProducts = products.concat(cacheProducts.current);
        dispatch({type: 'SET', value: newProducts});
        cacheProducts.current = [];
    }

    const loadCache = () => {
        fetch('http://localhost:8000/products?_page=' + currPage.current + '&_limit=15')
        .then((response) => response.json())
        .then((responseData) => {
            setLoading(false);
            cacheProducts.current = responseData;
            currPage.current = currPage.current + 1;
        })
        .catch(error => console.warn(error));
    }

    const handleScroll = (e) => {
        const isBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
        if (isBottom && !loading) {
            addCache();
            loadCache();
            if(cacheProducts.current.length === 0){
                setLoading(true);
            }
        }
    }
    
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    });

    useEffect(()=>{
        fetch('http://localhost:8000/products?_page=0&_limit=15')
        .then((response) => response.json())
        .then((responseData) => {
          setLoading(false);
          const action = {type: 'SET', value: responseData};
          dispatch(action);
        })
        .catch(error => console.warn(error));

        fetch('http://localhost:8000/products?_page=' + currPage.current + '&_limit=15')
        .then((response) => response.json())
        .then((responseData) => {
            cacheProducts.current = responseData;
            currPage.current = currPage.current + 1;
        })
        .catch(error => console.warn(error));
    }, []);


    return (
        <>
            <button onClick={()=> dispatch({type: 'SORT-ID'})}>Sort by ID</button>
            <button onClick={()=> dispatch({type: 'SORT-PRICE'})}>Sort by price</button>
            <button onClick={()=> dispatch({type: 'SORT-SIZE'})}>Sort by SIZE</button>
            <div>
                {products.map((product, i)=>(
                    <Product key={product.id+i} product={product}/>
                ))}
            </div>
            {loading && <h1>loading</h1>}
        </>
    );
  }

  
export default ProductLists;
  