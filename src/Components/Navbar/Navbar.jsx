import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import Sidebar from "../Sidebar/sidebar";
import { Outlet } from "react-router-dom";

function Navbar() {
  const [adminEmail, setAdminEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on initial render
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("adminEmail");
    if (token && email) {
      setIsLoggedIn(true);
      setAdminEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminEmail");
    setIsLoggedIn(false);
    setAdminEmail("");
    window.location.reload(); // Reload the page after logout
  };

  return (
    <>
      <div>
        <div className="navbar">
          <img src={assets.logo} alt="Logo" className="logo" />
          <h1>ADMIN PANEL</h1>
          <div className="profile-section">
            <FaUser className="login-icon" />
            {isLoggedIn ? (
              <div className="admin-info">
                <span>{adminEmail}</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <span>Not logged in</span>
            )}
          </div>
        </div>
        <hr />
        <div className="flex">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Navbar;
