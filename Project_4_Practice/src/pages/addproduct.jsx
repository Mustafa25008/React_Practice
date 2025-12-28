import React from "react";
import { Button } from "react-bootstrap";
import "./addproduct.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";


function Addproduct() {

    const [msg, setmsg] = useState({message: "", type:""});

    useEffect(()=>{
        if( !msg.type) return;
        const timer = setTimeout(()=>{
            setmsg({message:"", type:""});
        },2000);
        return ()=> clearTimeout(timer);
    },[msg.type])

    const{
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitting}
    } = useForm({mode: "onChange"});

    async function saveproduct(data) {
        try {
            let product = {
                id: 21,
                title: data.title,
                price: data.price,
                description: data.description
            };
            const response = await fetch(import.meta.env.VITE_API_URL+"/products",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            if(response.ok){
                setmsg({message: "Product Saved Successfully", type: "success"});
                reset();
            }else{
                setmsg({message: "Failed to Save Product", type: "error"});
            }
        }
        catch(error){
            setmsg({message:error.message, type: "error"});
        }
    }
    return (
        <div className="container">
            <h1>Enter Product Details</h1>
            <form onSubmit={handleSubmit(saveproduct)}>
                <div className="d-flex flex-column gap-2 ">
                <div className="form-item d-flex gap-2">
                    <label htmlFor="title">Title*:</label>
                    <input type="text" {...register("title", {required: "Title is required", minLength:{value:3, message:"Minimum 3 charaters required"}})} placeholder="Enter Title"/>
                </div>
                {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
                <div className="form-item d-flex gap-2">
                    <label htmlFor="price" className="lb">Price*: </label>
                    <input type="number" {...register("price", {required: "Price is required", valueAsNumber: true, min:{value:1, message:"Price must be greater than 0"}, max:1000000})} placeholder="Enter Price" />
                </div>
                {errors.price && <span style={{ color: 'red' }}>{errors.price.message}</span>}
                <div className="form-item d-flex gap-2">
                    <label htmlFor="description">Description: </label>
                    <input type="text" {...register("description")} placeholder="Enter Description" />
                </div>
                </div>
                <div className="container d-flex justify-content-end">
                    <Button className="btn btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting? "Saving...": "Save"}</Button>
                </div>
            </form>
            {msg.message && <p style={{color: msg.type==="error"? "red": "green" }}>{msg.message}</p>}
        </div>
    )
}
export default Addproduct;