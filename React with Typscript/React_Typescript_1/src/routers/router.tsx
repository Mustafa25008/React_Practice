import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../pages/addProducts";
import Layout from "../pages/layout";
import ShowProduct from "../pages/showProducts";

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
        }
    ]
  }
]);

export default router;