import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function Showproduct() {
    const [products, setProducts] = useState([]);
    const [msg, setmsg] = useState({message: "", type:""});
    const [Btn, setBtn] = useState("Load Products");

    useEffect(()=>{
        if(!msg) return;
        const timer = setTimeout(()=>{
            setmsg("");
        },2000);
        return ()=>clearTimeout(timer);
    },[msg]);

    async function loadProducts() {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL+"/products");
            if(res.ok){
                const data = await res.json();
                setProducts(data);
                setmsg({message: "Data loaded Successfully", type: "success"});
                setBtn("Products Loaded");
            }else{
                setmsg({message: "Failed to Load Products", type: "error"});
                setBtn("Load Products");
            }
        }
        catch(error){
            setmsg({message:error, type: "error"});
        }
    }
    return (
        <>
        <div>
            <h1>Show Product</h1>
            <Button onClick={()=>{setBtn("Loading...");loadProducts()}} className="btn btn-warning" disabled={Btn==="Load Products"? false:true}>{Btn}</Button>
            {msg.message && <p className="m-2" style={{color: msg.type==="success"? "green": "red"}}>{msg.message}</p>}
        </div>
        {products.length>0 &&
        <div className="m-2">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        }
        </>
    )
}
export default Showproduct;