import React, { useState } from "react";
import "./BookRequest.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import API from "../../../services/api";

function BookRequest() {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    bookTitle: "",
    subject: "",
    semester: "",
    message: "",
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
      await API.post("/requests/create", formData);

      alert("Request Submitted Successfully 🔥");

      setFormData({
        studentName: "",
        email: "",
        bookTitle: "",
        subject: "",
        semester: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Request Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="request-page">
        <div className="request-box">
          <h2>Request New Book</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="studentName"
              placeholder="Your Name"
              value={formData.studentName}
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
              name="bookTitle"
              placeholder="Book Title"
              value={formData.bookTitle}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Additional Message"
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookRequest;
