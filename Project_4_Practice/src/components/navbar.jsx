import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => 
                        isActive ? 'active-link' : 'inactive-link'
                        }>Add Products</NavLink>
                </li>
                <li>
                    <NavLink to="/showproducts" className={({ isActive }) => 
                        isActive ? 'active-link' : 'inactive-link'
                        }>Show Products</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={({ isActive }) => 
                        isActive ? 'active-link' : 'inactive-link'
                        }>Login</NavLink>
                </li>
            </ul>
        </div>
    )
}
export default NavBar;