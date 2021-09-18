import React from 'react';
// import GifLoading from '.../public/giphy.gif'; // with import

function Product({product}) {
    
    return (
        <div className='product'>
          <h1>{product.face}</h1>
           <p>id: {product.id}</p>
           <p>price: {product.price}</p>
           <p>size: {product.size}</p> 
        </div>
    );
  }
  
export default Product;
  