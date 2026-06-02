import React, { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import API from "../../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      await API.post("/users/register", formData);

      alert("Registration Successful 🔥");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create Account</h2>
        <p>Register to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="bottom-text">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
