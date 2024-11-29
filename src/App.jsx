import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/sidebar";
import Product_Add from "./pages/Product_Add/Product_Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Register_Login from "./pages/Register-login/Register_Login";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/product_add" element={<Product_Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Register_Login" element={<Register_Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
