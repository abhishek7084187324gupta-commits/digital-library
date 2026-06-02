import React, { useEffect, useState } from "react";

import "./ManageUsers.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import API from "../../../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: token,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="manage-content">
        <h1>Manage Users</h1>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
