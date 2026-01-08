import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts, setLoading, setFailed , type ProductState} from "../redux/product/productslice";
import type { RootState } from "../redux/store";
import Loader from "../components/loader";
import ProductMap from "../components/productsmap";

function ShowProduct() {
  const dispatch = useDispatch();
  const { value, status } = useSelector((state: RootState) => state.showproduct) as ProductState;

  useEffect(() => {
    if(value.length===0){
      dispatch(setLoading());
      async function fetchProducts() {
        try {
          const response = await fetch(import.meta.env.VITE_API_URL + "/products");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          dispatch(loadProducts(data));
        } catch (e) {
          console.log(e);
          dispatch(setFailed());
        }
      }
      fetchProducts();
    }
  },[value.length, dispatch]);

  return (
    <>
    <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column gap-1">
      {
        (status==="loading" || status=== "idle")? <Loader/>: <ProductMap product={value}/>
      }
    </div>
      
    </>
  );
}
export default ShowProduct;
