import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
    
    return (
        <div>
            <ul className="list-unstyled ps-0">
                <li className="mb-2">
                    <NavLink to ="/" className="sidebar-link">Add Products</NavLink>
                </li>
                <li className="mb-2">
                    <NavLink to ="/about" className="sidebar-link">About</NavLink>
                </li>
                <li className="mb-2">
                    <NavLink to = "/index" className="sidebar-link flex-nowrap">Show all Products</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;