import React, { useEffect, useState } from "react";

import "./ManagePayments.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import API from "../../../services/api";

function ManagePayments() {
  const [payments, setPayments] = useState([]);

  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments", {
        headers: {
          Authorization: token,
        },
      });

      setPayments(res.data.payments);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/payments/update/${id}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      alert(`Payment marked ${status}`);

      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePayment = async (id) => {
    try {
      await API.delete(`/payments/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Payment Deleted");

      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="manage-content">
        <h1>Manage Payments</h1>

        <div className="payment-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Content</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((item) => (
                <tr key={item._id}>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.contentTitle}</td>
                  <td>₹ {item.amount}</td>
                  <td>{item.status}</td>

                  <td className="action-buttons">
                    <button
                      className="complete"
                      onClick={() => updateStatus(item._id, "Completed")}
                    >
                      Complete
                    </button>

                    <button
                      className="failed"
                      onClick={() => updateStatus(item._id, "Failed")}
                    >
                      Failed
                    </button>

                    <button
                      className="delete"
                      onClick={() => deletePayment(item._id)}
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

export default ManagePayments;
