import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../pages/addProducts";
import Layout from "../pages/layout";
import ShowProduct from "../pages/showProducts";
import ProductCart from "../pages/productsCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
        {
            path: "/",
            element: <AddProducts />
        },
        {
            path: "/index",
            element: <ShowProduct/>
        },
        {
          path: "/cart",
          element: <ProductCart/>
        }
    ]
  }
]);

export default router;