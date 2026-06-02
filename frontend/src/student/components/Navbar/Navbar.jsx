import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Smart Library</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/student/dashboard">Library</Link>

        <Link to="/student/pyq">PYQ</Link>

        <Link to="/student/premium">Premium</Link>

        <Link to="/student/request">Request</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
