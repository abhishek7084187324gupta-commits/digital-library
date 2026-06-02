import React, { useState } from "react";
import "./UploadPremium.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import API from "../../../services/api";

function UploadPremium() {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    semester: "",
    price: "",
    description: "",
    fullFile: null,
    previewFile: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (
      name === "fullFile" ||
      name === "previewFile" ||
      name === "coverImage"
    ) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
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
      data.append("price", formData.price);
      data.append("description", formData.description);

      /* Full Premium PDF */
      data.append("fullFile", formData.fullFile);

      /* Preview Sample PDF */
      data.append("previewFile", formData.previewFile);

      /* Cover Thumbnail */
      data.append("coverImage", formData.coverImage);

      await API.post("/premium/upload", data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Premium Note Uploaded Successfully 🔥");

      setFormData({
        title: "",
        subject: "",
        semester: "",
        price: "",
        description: "",
        fullFile: null,
        previewFile: null,
        coverImage: null,
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
        <h1>Upload Premium Notes</h1>

        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Premium Note Title"
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
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Upload Full Premium PDF</label>

          <input type="file" name="fullFile" onChange={handleChange} required />

          <label>Upload Preview PDF (1–2 Pages)</label>

          <input
            type="file"
            name="previewFile"
            onChange={handleChange}
            required
          />

          <label>Upload Cover Image</label>

          <input type="file" name="coverImage" onChange={handleChange} />

          <button type="submit">Upload Premium Note</button>
        </form>
      </div>
    </div>
  );
}

export default UploadPremium;
