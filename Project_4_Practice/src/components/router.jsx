import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Addproduct from "../pages/addproduct";
import Showproduct from "../pages/showproduct";
import Login from "../pages/login";
import Cart from "../pages/cart";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Addproduct />,
      },
      {
        path: "showproducts",
        element: <Showproduct />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
      }
    ],
  },
]);
export default router;