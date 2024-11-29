import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
      <NavLink to="/Register_Login" className="sidebar-option">
          <i class="fa-solid fa-user"></i>
          <p>Login</p>
        </NavLink>
        <NavLink to="/product_add" className="sidebar-option">
        <i class="fa-brands fa-product-hunt"></i>
          <p>Add Product</p>
        </NavLink>

        <NavLink to="/list" className="sidebar-option">
          <i class="fa-solid fa-list"></i>
          <p>List Items</p>
        </NavLink>

        <NavLink to="/orders" className="sidebar-option">
        <i class="fa-solid fa-truck-fast"></i>
          <p>Order Items</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
