import React from "react";
import "./addproduct.css"
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";


function Login() {
    const { register, handleSubmit, formState: {errors},} = useForm({mode: "onBlur"});
    return (
        <>
        <div className="d-flex flex-column gap-2 form p-1">
            <form onSubmit={handleSubmit((data)=>console.log(data))}>
                <div className="d-flex gap-1 form-item mb-2">
                    <label htmlFor="title">Username*:</label>
                    <input type="text" placeholder="Enter Username" {...register("email", {required: "Email is required"})}/>
                </div>
                {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                <div className="d-flex gap-1 form-item">
                    <label htmlFor="password">Password*:</label>
                    <input type="Password" placeholder="Enter Password" className="ms-1 mb-3 w-auto p-0" style={{ width: "250px" }} {...register("password", {required: "Password is required", minLength:{value:8, message:"Mini 8 charaters required"}} )}/>
                </div>
                {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
                <div className="container d-flex justify-content-end">
                    <Button type="submit" className="btn btn-primary">Login</Button>
                </div>
            </form>
        </div>
        </>
    )
}
export default Login;