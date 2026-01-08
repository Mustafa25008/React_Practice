import type { Product } from "../redux/product/productslice";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import EditModal from "./editproduct";

interface Products_items {
  id?: number| null;
  title?: string;
  price?: number | null;
  description?: string;
}

function ProductMap({ product }: { product: Product[] }) {

  const [deletedIds, setDeletedIds] = useState<number[]>([]);
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
        setDeletedIds((pre) => [...pre, id]);
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
        {msg.message && <p style={msg.type === "error"? {color:"red"}: {color:"green"}}>{msg.message}</p>}
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
              const isDeleted = deletedIds.includes(items.id);
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
                      disabled={isDeleted}
                    >
                      {isDeleted ? "Deleted" : "Delete"}
                    </Button>
                  </td>
                  <td>
                    <Button variant="warning" size="sm">
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
