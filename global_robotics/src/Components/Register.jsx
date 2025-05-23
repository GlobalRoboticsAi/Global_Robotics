import '../Styles/Register.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import Logo from '../Images/logo.png';
import axios from 'axios';
import Base_URL from '../Config';

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, contact, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    setError("Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.");
    return;
  }

  try {
    await axios.post(`${Base_URL}auth/register`, {
      name,
      email,
      contact,
      password
    });

    alert("Registration successful!");
    navigate("/login");
  } catch (err) {
    setError("Registration failed. Please try again.");
  }
};

  return (
    <div className="loginSection">
      <div className="wrapper">
        <FaCircleArrowLeft className="backIcon" onClick={() => navigate(-1)} />
        <form onSubmit={handleSubmit}>
          <div className="circle">
            <img src={Logo} alt="Logo" />
          </div>
          <h1>SignUp</h1>

          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="contact"
              placeholder="Enter Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>

          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Register</button>

          <div className="registerNow">
            <br />
            Already Registered? <Link to="/login">Login Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
