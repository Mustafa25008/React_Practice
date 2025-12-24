import { Modal, Button } from "react-bootstrap";


function Form({operation, setModalShow, modalShow, setmsg, Iitem, setIitem}){
    
    const handleClose = ()=> {
        setIitem({id:"",title:"", price:""});
        setModalShow(false);}

    const product = ()=>{
        if(!Iitem.title || !Iitem.price || Number(Iitem.price)<=0 || isNaN(Number(Iitem.price))){
            alert("Error: Please enter all fields Correctly");
            return;
        }
        let meth = "";
        (operation ==="edit")?meth = "PUT": meth="POST";
        fetch((operation ==="edit")?import.meta.env.VITE_URL + "/" + Iitem.id : import.meta.env.VITE_URL, {
            method: meth,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Iitem)
        })
        .then(response => {
            if(response.ok){
                setmsg({text:(operation==="add")?"Product added successfully":"Product edited successfully", type:"success"});
                handleClose();
                setIitem({id:"",title:"", price:""});
            }
            else{
                setmsg({text:"Error adding product", type:"error"});
            }
        })
        .catch(err=> setmsg({text:"Error:"+ err, type:"error"}));
    }

    return(
        <div>
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
                    <p>you are doing "{operation}"</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={product}>Save</Button>
                </Modal.Footer>
            </Modal>
            </div>
    );
}
export default Form;