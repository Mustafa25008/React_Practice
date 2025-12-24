import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";

const router = createBrowserRouter([
  {
    element: <Layout />, // layout with Navbar
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

export default router;
