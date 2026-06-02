import React, { useEffect, useState } from "react";

import "./ManageRequests.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import API from "../../../services/api";

function ManageRequests() {
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests", {
        headers: {
          Authorization: token,
        },
      });

      setRequests(res.data.requests);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/requests/update/${id}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      alert(`Request ${status}`);

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await API.delete(`/requests/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Request Deleted");

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="manage-content">
        <h1>Manage Requests</h1>

        <div className="request-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Book</th>
                <th>Subject</th>
                <th>Semester</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((item) => (
                <tr key={item._id}>
                  <td>{item.studentName}</td>
                  <td>{item.bookTitle}</td>
                  <td>{item.subject}</td>
                  <td>{item.semester}</td>
                  <td>{item.status}</td>

                  <td className="action-buttons">
                    <button
                      className="approve"
                      onClick={() => updateStatus(item._id, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="reject"
                      onClick={() => updateStatus(item._id, "Rejected")}
                    >
                      Reject
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteRequest(item._id)}
                    >
                      Delete
                    </button>
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

export default ManageRequests;
