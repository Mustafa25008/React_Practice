import React from "react";

function Product ({ product}){
    return(
        <div style={{border:"1px solid black", margin:"10px", padding:"10px"}}>
            <p>Product ID: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: Rs.{product.price}</p>
            <p>Stock: {product.stock}</p>
        </div>
    )
}
export default Product;