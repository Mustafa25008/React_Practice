import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function EditModal({modalShow, setModal, setmsg, prod, setprod}) {

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitting}
    } = useForm({mode:"all"});

    useEffect(() => {
        if (prod?.id) {
            reset({
                title: prod.title,
                price: prod.price,
                description: prod.description
            });
        }
    }, [prod, reset]);

    const handleClose = () => {
        setModal(false);
        setprod({id:"", title:"", price:"", description:""});
    };

    async function saveProduct(data) {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL+"/products/" + prod.id,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(response.ok) {
                setmsg({message: "Product Update Successfully", type: "success"});
            }
            else {
                throw new Error("Error in Updating Product");
            }
        }
        catch(error){
            setmsg({message:error.message, type: "error"})
        }
        reset();
        handleClose();
    }

    return (
        <div>
            <Modal show={modalShow} onHide={handleClose}>
                <form onSubmit={handleSubmit(saveProduct)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Enter Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex gap-0 flex-column">
                        <div className="d-flex gap-2 m-2">
                            <label htmlFor="ti">Product Title:</label>
                            <input type="text" id="ti" className="lb bg-light text-black no-border" placeholder="Enter Product Title" {...register("title", {required: "Title is required", minLength:{value:3, message:"Minimum 3 charaters required"}})}/>
                        </div>
                        {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
                        <div className="d-flex gap-2 m-2">
                            <label htmlFor="pr">Product Price:</label>
                            <input type="number" step="0.01" id="pr" className="lb bg-light text-black no-border" placeholder="Enter Price" {...register("price", {required: "Price is required", valueAsNumber: true, min:{value:1, message:"Price must be greater than 0"}, max:1000000})}/>
                        </div>
                        {errors.price && <span style={{ color: 'red' }}>{errors.price.message}</span>}
                        <div className="d-flex gap-2">
                            <label htmlFor="desc">Product Description:</label>
                            <input type="text" className="lb bg-light text-black no-border" placeholder="Enter Description" {...register("description")}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" onClick={handleClose} disabled={isSubmitting}>Close</Button>
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting? "Saving...": "Save"}</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
export default EditModal;