import React, { useState } from "react";
import "./Payment.css";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import API from "../../../services/api";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const contentTitle = location.state?.title || "";

  const amount = location.state?.price || "";

  const premiumId = location.state?.premiumId || "";

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contentTitle,
    amount,
    premiumId,
    userId: user?._id || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/payments/create", formData);

      alert(
        "Payment Submitted Successfully 🔥\nAdmin approval ke baad Full PDF unlock ho jayegi.",
      );

      navigate("/student/premium");
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="payment-page">
        <div className="payment-box">
          <h2>Complete Payment</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="Your Name"
              value={formData.userName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="contentTitle"
              value={formData.contentTitle}
              readOnly
            />

            <input
              type="number"
              name="amount"
              value={formData.amount}
              readOnly
            />

            <button type="submit">Confirm Payment</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
