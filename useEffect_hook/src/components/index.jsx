import React from "react";
import { Button } from "react-bootstrap";
import "./index.css";

function Index({setmsg, setOpe, data, setIitem, setModalShow}) {
    

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

    return(
            <div>
            <h1 className="headin-1">Product Data</h1>
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
                                <td><Button onClick={()=>{{setOpe("edit"); setModalShow(true); setIitem({id:item.id, title:item.title, price:item.price}) }}}>Edit</Button></td>
                                <td><Button className="btn btn-danger sm" onClick={()=>{removeProduct(item.id);}}>Remove</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
}
export default Index;