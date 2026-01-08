import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

interface Product {
    id?: number;
    title: string;
    price: number;
    description: string;
}

function AddProducts() {
    const [msg, setmsg] = useState({message: "", type: ""});

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Product>({mode:"all"});

        async function saveproduct(data: Product) {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL+"/products",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(response.ok){
                setmsg({message: "Product Saved Successfully", type: "success"});
                reset();
            }else{
                setmsg({message: "Failed to Save Product", type: "error"});
            }
        }
        catch(e){
            setmsg({message:"An Error Occured"+e, type: "error"});
        }
    }

    useEffect(()=>{
        if(!msg.type) return;
        const timer = setTimeout(()=>{
            setmsg({message: "", type: ""});
        }, 2000);
        return () => clearTimeout(timer);
    })

    return(
        <>
        <h1 className="mb-3">Add Products</h1>
        <form onSubmit={handleSubmit(saveproduct)}>
            <div className="d-flex flex-column gap-2 ">
                <div className="form-item d-flex gap-2">
                    <label htmlFor="title">Title*:</label>
                    <input type="text" {...register("title", {required: "Title is required", minLength:{value:3, message:"Minimum 3 charaters required"}})} placeholder="Enter Title"/>
                </div>
                {errors.title && <span style={{ color: 'red' }}>{errors.title.message?.toString()}</span>}
                <div className="form-item d-flex gap-2">
                    <label htmlFor="price" className="lb">Price*: </label>
                    <input type="number" {...register("price", {required: "Price is required", valueAsNumber: true, min:{value:1, message:"Price must be greater than 0"}, max:1000000})} placeholder="Enter Price" />
                </div>
                {errors.price && <span style={{ color: 'red' }}>{errors.price.message?.toString()}</span>}
                <div className="form-item d-flex gap-2">
                    <label htmlFor="description">Description: </label>
                    <input type="text" {...register("description")} placeholder="Enter Description" />
                </div>
                <div className="container d-flex justify-content-end">
                    <Button className="btn btn-primary me-5" type="submit" disabled={isSubmitting}>{isSubmitting? "Saving":"Save"}</Button>
                </div>
            </div>
        </form>
        {msg.message && <p style={{color: msg.type==="error"? "red": "green" }}>{msg.message}</p>}
        </>
    );
}
export default AddProducts;