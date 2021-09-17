import React, { useEffect, useState } from 'react';
// import GifLoading from '.../public/giphy.gif'; // with import

function Product({product}) {
    
    return (
        <div>
           <p>id: {product.id}</p>
           <p>price: {product.price}</p>
           <p>size: {product.size}</p>
           <p>face: {product.face}</p>
        </div>
    );
  }
  
export default Product;
  