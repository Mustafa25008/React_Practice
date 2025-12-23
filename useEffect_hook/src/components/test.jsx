import React,{useState} from "react";
import {Button} from "react-bootstrap";
import ProductForm from "./productform";
import Index from "./index";
import Msg from "./message";

 function Test(){

    const [modalShow, setModalShow] = useState(false);
    const [msg, setmsg] = useState({text:"", type:""});
    const [productShow, setproductShow] = useState(false);
    const [ope, setOpe] = useState("");
    const [data, setData] = useState([]);
    const [Iitem, setIitem] = useState({id:"",title:"", price:""});

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

    return(
        <div>
            <div>
                <Button onClick={()=>{setOpe("add"); setModalShow(true)}}>Add Products</Button>
            </div>
            {modalShow && <ProductForm operation={ope} setModalShow={setModalShow} modalShow={modalShow} setmsg={setmsg} Iitem={Iitem} setIitem={setIitem}/>}
            <div>
                <Button className="btn btn-secondary" onClick={()=>{fetch_data(); setproductShow(true);}}>Show All Products</Button>
                <Msg msg={msg} setmsg={setmsg}/>
                {productShow && <Index  setmsg={setmsg} setOpe={setOpe} data={data} setIitem={setIitem} setModalShow={setModalShow}/>}
            </div>
            
        </div>
    );
 }
 export default Test;