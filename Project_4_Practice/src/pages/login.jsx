import React from "react";
import "./addproduct.css"
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";


function Login() {

    const [msg, setmsg] = useState({message: "", type:""});

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setmsg({message:"", type:""});
        }, 5000);
        return ()=> clearTimeout(timer);
    },[msg.message]);

    const { register, handleSubmit, reset, formState: {errors, isSubmitting},} = useForm({mode: "onChange"});

    async function login(data) {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL+"/auth/login",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(response.status === 401){
                setmsg({message: "Login Successful ", type: "success"});
                reset();
            }else{
                setmsg({message: "Login Failed ", type: "error"});
            }
        }
        catch(error){
            setmsg({message:error.message, type: "error"});
        }
        
    }

    return (
        <>
        <h1>Login</h1>
        <div className="d-flex flex-column gap-2 form p-1">
            <form onSubmit={handleSubmit(login)}>
                <div className="d-flex gap-1 form-item mb-2">
                    <label htmlFor="title">Username*:</label>
                    <input type="text" placeholder="Enter Username" {...register("username", {required: "Username is required"})}/>
                </div>
                {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
                <div className="d-flex gap-1 form-item">
                    <label htmlFor="password">Password*:</label>
                    <input type="password" placeholder="Enter Password" className="ms-1 mb-3 w-auto p-0" style={{ width: "250px" }} {...register("password", {required: "Password is required", minLength:{value:6, message:"Mini 6 charaters required"}} )}/>
                </div>
                {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
                <div className="container d-flex justify-content-end">
                    <Button type="submit" disabled={isSubmitting} className="btn btn-primary">{isSubmitting? "Logging...": "Login"}</Button>
                </div>
                {msg.message && <p style={{color: msg.type==="error"? "red": "green" }}>{msg.message}</p>}
            </form>
        </div>
        </>
    )
}
export default Login;