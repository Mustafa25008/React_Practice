import React, { useState, useEffect } from "react";
import "./Table.css";
import { Modal, Button } from "react-bootstrap";

function Table() {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [msg, setmsg] = useState({text:"", type:""});
    const [Iitem, setIitem] = useState({id:"",title:"", price:""});
    const [ope, setOpe] = useState("");


    const handleOpen = ()=> setModalShow(true);
    const handleClose = ()=> setModalShow(false);
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setmsg({text:"", type:""});
        }, 3000);
        return ()=>{
            clearTimeout(timer);
        }
    }, [msg])

    const fetch_data = () => {
        fetch(`${import.meta.env.VITE_URL}`)
            .then(response => {
                if (response.ok) {
                    setmsg({text:"Products fetched successfully", type:"success"});
                    return response.json();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then(actualData => {
                setData(actualData);
            })
            .catch(err => setmsg({text:"Error:"+err, type:"Error"}));
    };
    function show(){
        return(
            <div>
            <h1 classname="headin-1">Product Data</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <img src={item.image} alt={item.title} style={{ width: "50px" }} />
                                </td>
                                <td>{item.title}</td>
                                <td>{item.price} Rs</td>
                                <td><Button onClick={()=>{{setOpe("edit"); handleOpen();setIitem({id:item.id, title:item.title, price:item.price}) }}}>Edit</Button></td>
                                <td><Button className="btn btn-danger sm" onClick={()=>{removeProduct(item.id);}}>Remove</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
    const removeProduct = (id)=>{
        fetch(`${import.meta.env.VITE_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setmsg({text:"Product removed successfully", type:"success"});
            } else {
                throw new Error("Network response was not ok");
            }
        })
        .catch(err => setmsg({text:"Error:"+err, type:"Error"}));
    
    }
    const product = ()=>{
        if(!Iitem.title || !Iitem.price || Number(Iitem.price)<=0 || isNaN(Number(Iitem.price))){
            alert("Error: Please enter all fields Correctly");
            return;
        }
        let meth = "";
        (ope ==="edit")?meth = "PUT": meth="POST";
        fetch((ope ==="edit")?import.meta.env.VITE_URL + "/" + Iitem.id : import.meta.env.VITE_URL, {
            method: meth,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Iitem)
        })
        .then(response => {
            if(response.ok){
                setmsg({text:(ope==="add")?"Product added successfully":"Product edited successfully", type:"success"});
                handleClose();
                setOpe("");
                setIitem({id:"",title:"", price:""});
            }
            else{
                setmsg({text:"Error adding product", type:"error"});
            }
        })
        .catch(err=> setmsg({text:"Error:"+ err, type:"error"}));
    }
    return (
        <div>
            <div>
                <Button onClick={()=>{setOpe("add"); handleOpen()}}>Add Products</Button>
                <Modal show={modalShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="ti">Product Title: </label>
                        <input type="text" id="ti" className="lb bg-white text-black no-border" value={Iitem.title} onChange={(e)=>{setIitem({...Iitem, title:e.target.value})}}/>
                        <br />
                        <label htmlFor="pr">Enter Price: </label>
                        <input type="Number" id="pr" className="lb bg-white text-black no-border" value={Iitem.price} onChange={(e)=>{setIitem({...Iitem, price:e.target.value})}}/>
                        <p>you are doing "{ope}"</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={product}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Button className="btn btn-secondary" onClick={fetch_data}>Show All Products</Button>
            <p style={{color:(msg.type)==="error"? "red": "green"}}>{msg.text}</p>
            {show()}
        </div>
    );
};

export default Table;