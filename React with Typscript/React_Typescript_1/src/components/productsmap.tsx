import type { Product } from "../redux/product/productslice";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import EditModal from "./editproduct";
import { useDispatch } from "react-redux";
import { saveCart } from "../redux/product/cart-Slice";
import {deleteProduct} from "../redux/product/productslice";

interface Products_items {
  id?: number| null;
  title?: string;
  price?: number | null;
  description?: string;
  category?: string;
    image?: string;
    rating?: {
        rate: number | null;
        count: number | null;
    };
}

function ProductMap({ product }: { product: Product[] }) {

  const dispatch = useDispatch();

  const [modal, setModal] = useState<boolean>(false);
  const [msg, setmsg] = useState<{ message: string; type: string }>({
    message: "",
    type: "",
  });
  
  const [product_item, setproduct_item] = useState<Products_items>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: null,
      count: null,
    },
  });

  async function removeProduct(id: number) {
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
        dispatch(deleteProduct(id));
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setmsg({ message: "Error:" + error, type: "Error" });
    }
  }

  useEffect(()=>{
    if(!msg.type) return;
    const timer = setTimeout(()=>{
        setmsg({message: "", type: ""});
    }, 2000);
    return () => clearTimeout(timer);
  },[msg.type]);

  return (
    <div className="container-fluid mt-2 overflow-hidden">
        <div>
          <h1>All Products</h1>
          {msg.message && <p style={msg.type === "error"? {color:"red"}: {color:"green"}}>{msg.message}</p>}
        </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover w-100">
          <thead className="table-light text-center">
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th style={{ minWidth: "200px" }}>Title</th>
              <th>Price</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((items) => {
              return (
                <tr key={items.id} className="align-middle text-center">
                  <td>{items.id}</td>
                  <td>
                    <img
                      src={items.image}
                      alt={items.title}
                      style={{ width: "40px" }}
                    />
                  </td>
                  <td
                    className="text-start text-wrap"
                    style={{ maxWidth: "300px" }}
                  >
                    {items.title}
                  </td>
                  <td>{"$" + items.price}</td>
                  <td>
                    <Button size="sm" 
                    onClick={() => {
                          setproduct_item({
                            id: items.id,
                            title: items.title,
                            price: Number(items.price),
                            description: items.description,
                            category: items.category,
                            image: items.image,
                            rating: items.rating,
                          });
                          setModal(true);
                        }}
                    >Edit</Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {removeProduct(items.id);}}
                    > Delete
                    </Button>
                  </td>
                  <td>
                    <Button variant="warning" size="sm" onClick={()=>{dispatch(saveCart(items)); setmsg({message: "Product added to cart successfully", type: "success"})}}>
                      Add to Cart
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modal && (
        <EditModal
          modalShow={modal}
          setModal={setModal}
          setmsg={setmsg}
          prod={product_item}
          setprod={setproduct_item}
        />
      )}
    </div>
  );
}
export default ProductMap;
