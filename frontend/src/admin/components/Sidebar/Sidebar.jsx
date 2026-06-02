import React from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Admin Logged Out");

    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>

      <div className="sidebar-links">
        <Link to="/admin/dashboard">Dashboard</Link>

        <Link to="/admin/upload-book">Upload Book</Link>

        <Link to="/admin/upload-pyq">Upload PYQ</Link>

        <Link to="/admin/upload-premium">Upload Premium</Link>

        <Link to="/admin/manage-users">Manage Users</Link>

        <Link to="/admin/manage-requests">Manage Requests</Link>

        <Link to="/admin/manage-payments">Manage Payments</Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
