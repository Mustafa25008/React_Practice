import React from "react";
import { useState } from "react";
import ShowProducts from "./showproducts";

function Apiexample() {

  const [products, setProducts] = useState([]);
  const [msg, setmsg] = useState({text:"", type:""});

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}`);
      const data = await response.json();
      setProducts(data);
      setmsg({text:"Products fetched successfully", type:"success"});
    }
    catch (e) {
      setmsg({text: `Error fetching products: ${e.message}}`, type: "error"});
    }
  };

  return<div>
    <div><h1>Api Example Component</h1></div>
    <div><button onClick={fetchProducts}>Fetch Products</button></div>
    <div><p style={msg.type==="error"?{color:"red"}:{color:"green"}}>{msg.text}</p></div>
    {products.length>0 &&
      <div>
        <h2>Products List</h2>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", overflowWrap:"break-word"}}>
        {products.map(product=>(
          <ShowProducts key={product.id} Product={product} />
        ))}
        </div>
      </div>
    }
  </div>;
}
export default Apiexample;