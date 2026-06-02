import React, { useState } from "react";
import "./UploadPYQ.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import API from "../../../services/api";

function UploadPYQ() {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    semester: "",
    year: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("subject", formData.subject);
      data.append("semester", formData.semester);
      data.append("year", formData.year);
      data.append("file", formData.file);

      await API.post("/pyq/upload", data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("PYQ Uploaded Successfully 🔥");

      setFormData({
        title: "",
        subject: "",
        semester: "",
        year: "",
        file: null,
      });
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="upload-content">
        <h1>Upload PYQ</h1>

        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="PYQ Title"
            value={formData.title}
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

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <input type="file" name="file" onChange={handleChange} required />

          <button type="submit">Upload PYQ</button>
        </form>
      </div>
    </div>
  );
}

export default UploadPYQ;
