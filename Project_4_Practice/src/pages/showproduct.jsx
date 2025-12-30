import React from "react";
import Modal from "../components/modal";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Showproduct() {
    const [products, setProducts] = useState([]);
    const [msg, setmsg] = useState({message: "", type:""});
    const [Btn, setBtn] = useState("Load Products");
    const [deletedIds, setDeletedIds] = useState([]);
    const [modal, setModal] = useState(false);
    const [product, setproduct] = useState({id:"",title:"", price:"", description:""});
    const {cart, setCart} = useOutletContext();

    useEffect(()=>{
        cart.map((ct, i)=>{console.log("Title: "+i, ct.title)});
    },[cart]);

    useEffect(()=>{
        if(!msg.message) return;
        const timer = setTimeout(()=>{
            setmsg({message:"", type:""});
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
            setmsg({message:error.message, type: "error"});
        }
    }

    async function removeProduct(id) {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this item?");
            if (!confirmed) return;
            const res = await fetch(import.meta.env.VITE_API_URL+"/products/"+id, {
                method: 'DELETE'
            })
            if (res.ok) {
                setmsg({message:"Product removed successfully", type:"success"});
                setDeletedIds(pre=>[...pre,id]);
            } else {
                throw new Error("Network response was not ok");
            }
        }
        catch(error) {
            setmsg({message:"Error:"+error.message, type:"Error"});
        }
    
    }

    const addtoCart = (item)=> {
        setCart((prev) => [...prev, item]);
        setmsg({message: "Item added to cart", type: "success"});
    };

    return (
        <>
        <div>
            <h1>Show Product</h1>
            <Button onClick={()=>{setBtn("Loading...");loadProducts()}} className="btn btn-warning" disabled={Btn==="Load Products"? false:true}>{Btn}</Button>
        </div>
        {msg.message && <p className="m-2" style={{color: msg.type==="success"? "green": "red"}}>{msg.message}</p>}
        {
        products.length>0 &&
        <div className="d-flex mt-2">
            <table className="table table-border border table-striped table-hover">
                <thead className="table-light text-center">
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th colSpan='3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>
                        {
                            const isDeleted = deletedIds.includes(product.id);
                            return (
                                <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <img src={product.image} alt={product.title} style={{width: "50px"}}/>
                                </td>
                                <td className="text-wrap">{product.title}</td>
                                <td>{"$"+product.price}</td>
                                <td><Button onClick={()=>{ setproduct({id: product.id, title: product.title, price: product.price, description: product.description}); setModal(true); }} disabled={isDeleted}>Edit</Button></td>
                                <td><Button className="btn btn-danger" onClick={()=>{removeProduct(product.id);}} disabled={isDeleted}>{isDeleted? "Deleted": "Delete"}</Button></td>
                                <td><Button className="btn btn-warning text-nowrap" disabled={isDeleted} onClick={()=>addtoCart(product)}>Add to Cart</Button></td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
        }
        {/*Edit button logic here*/}
        {modal && <Modal modalShow = {modal} setModal = {setModal} setmsg = {setmsg} prod = {product} setprod={setproduct}/>}
        </>
    )
}
export default Showproduct;