import React from "react";
import Modal from "../components/modal";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { load } from "../redux/product/product-Slice";
import {saveCart} from "../redux/product/cart-Slice";

function Showproduct() {
  // Redux toolkit
  const products = useSelector((state) => state.showProduct.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products,loadProducts]);

  //useStates
  // const [products, setProducts] = useState([]); use it when redux not use
  const [msg, setmsg] = useState({ message: "", type: "" });
  const [deletedIds, setDeletedIds] = useState([]);
  const [modal, setModal] = useState(false);
  const [product, setproduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
  });

  //useOutletContext
//   const { cart, setCart } = useOutletContext();

  useEffect(() => {
    if (!msg.message) return;
    const timer = setTimeout(() => {
      setmsg({ message: "", type: "" });
    }, 2000);
    return () => clearTimeout(timer);
  }, [msg]);

  // use this when redux not use
  // At first Render
  /*useEffect(()=>{
        const savedProducts = localStorage.getItem("product");
        if(savedProducts){
            setProducts(JSON.parse(savedProducts));
            return;
        }
        loadProducts();
    },[]);*/

  // Save Products to local storage
  /*useEffect(()=>{
        if( products.length > 0){
            localStorage.setItem("product", JSON.stringify(products));
        }
    },[products]);*/

  async function loadProducts() {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/products");
      if (res.ok) {
        const data = await res.json();
        // setProducts(data); use this when redux not use
        dispatch(load(data));
        setmsg({ message: "Data loaded Successfully", type: "success" });
      } else {
        setmsg({ message: "Failed to Load Products", type: "error" });
      }
    } catch (e) {
      if (e)
        setmsg({ message: "An Error Occcurs! Try Again Later", type: "error" });
    }
  }

  async function removeProduct(id) {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!confirmed) return;
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/products/" + id,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setmsg({ message: "Product removed successfully", type: "success" });
        setDeletedIds((pre) => [...pre, id]);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setmsg({ message: "Error:" + error.message, type: "Error" });
    }
  }

  const addtoCart = (item) => {
    // setCart((prev) => [...prev, item]);
    dispatch(saveCart(item));
    setmsg({ message: "Item added to cart", type: "success" });
  };

  return (
    <>
      <div>
        <h1>Show Product</h1>
      </div>
      {msg.message && (
        <p
          className="m-2"
          style={{ color: msg.type === "success" ? "green" : "red" }}
        >
          {msg.message}
        </p>
      )}
      {products.length > 0 && (
        <div className="d-flex mt-2">
          <table className="table table-border border table-striped table-hover">
            <thead className="table-light text-center">
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isDeleted = deletedIds.includes(product.id);
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td className="text-wrap">{product.title}</td>
                    <td>{"$" + product.price}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setproduct({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            description: product.description,
                          });
                          setModal(true);
                        }}
                        disabled={isDeleted}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          removeProduct(product.id);
                        }}
                        disabled={isDeleted}
                      >
                        {isDeleted ? "Deleted" : "Delete"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn btn-warning text-nowrap"
                        disabled={isDeleted}
                        onClick={() => addtoCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {/*Edit button logic here*/}
      {modal && (
        <Modal
          modalShow={modal}
          setModal={setModal}
          setmsg={setmsg}
          prod={product}
          setprod={setproduct}
        />
      )}
    </>
  );
}
export default Showproduct;
