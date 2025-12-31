import React from "react";
import { Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

function Cart() {

    const {cart, setCart} = useOutletContext();

    const deleteCart = (index)=>{
        const confirm = window.confirm("Are you sure to remove the item from cart?");
        if (!confirm) return;
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    }

    const totalPrice = cart.reduce((sum, item) => {
        return sum + item.price;
        }, 0);

    return (
        <>
        <div>
            <h1>Your Cart</h1>
            {cart.map((items, ind)=>{
                return (
                <div key={items.id} className="d-flex align-items-center gap-1 border p-2 m-2 bg-light text-black">
                    <img className="me-2" src={items.image} alt={items.title} style={{width: "50px"}}/>
                    <p className="mb-0 flex-grow-1">{items.title}</p>
                    <p className="mb-0 text-end fw-semibold" style={{ width: "150px" }}>Price: ${items.price}</p>
                    <Button className="btn btn-danger ms-3" onClick={()=>deleteCart(ind)}>Remove</Button>
                </div>
                );
            })}
            <div className="d-flex m-2 flex-column border bg-light text-black p-2 text-end">
                <p>Total Items: {cart.length}</p>
                <p>Total Price: ${totalPrice}</p>
            </div>
        </div>
        </>
    );
}
export default Cart;