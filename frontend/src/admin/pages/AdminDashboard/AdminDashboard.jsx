import React, { useEffect, useState } from "react";

import "./AdminDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import API from "../../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/dashboard", {
        headers: {
          Authorization: token,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        <h1>Admin Dashboard</h1>

        <div className="dashboard-grid">
          <DashboardCard title="Total Users" value={stats.totalUsers} />

          <DashboardCard title="Total Books" value={stats.totalBooks} />

          <DashboardCard title="Total PYQ" value={stats.totalPYQ} />

          <DashboardCard title="Revenue" value={`₹ ${stats.totalRevenue}`} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
