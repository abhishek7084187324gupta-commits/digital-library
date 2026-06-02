import React, { useState } from "react";
import "./UploadBook.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import API from "../../../services/api";

function UploadBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    semester: "",
    subject: "",
    description: "",
    file: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" || name === "coverImage") {
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
      data.append("author", formData.author);
      data.append("category", formData.category);
      data.append("semester", formData.semester);
      data.append("subject", formData.subject);
      data.append("description", formData.description);

      /* PDF */
      data.append("file", formData.file);

      /* Cover Image */
      data.append("coverImage", formData.coverImage);

      await API.post("/books/upload", data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book Uploaded Successfully 🔥");

      setFormData({
        title: "",
        author: "",
        category: "",
        semester: "",
        subject: "",
        description: "",
        file: null,
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
        <h1>Upload Book</h1>

        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
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
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Upload PDF File</label>

          <input type="file" name="file" onChange={handleChange} required />

          <label>Upload Cover Image</label>

          <input type="file" name="coverImage" onChange={handleChange} />

          <button type="submit">Upload Book</button>
        </form>
      </div>
    </div>
  );
}

export default UploadBook;
