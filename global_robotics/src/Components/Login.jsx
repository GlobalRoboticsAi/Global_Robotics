import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import '../Styles/Login.css';
import Logo from '../Images/logo.png';
import axios from 'axios';
import Base_URL from "../Config";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 New state for toggling
 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Base_URL}auth/login`, {
        email,
        password,
      });

      const { token, username, authorities } = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("role", authorities[0]?.authority);

      if (authorities[0].authority === 'ROLE_ADMIN') {
        navigate("/adminHome");
      } else {
        navigate("/userHome");
      }
    } catch (error) {
      setErrorMsg("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginSection">
      <div className="wrapper">
        <FaCircleArrowLeft className="backIcon" onClick={() => navigate(-1)} />
        <form onSubmit={handleLogin}>
          <div className="circle">
            <img src={Logo} alt="Logo" /><br />
          </div>
          <h1>SignIn</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          {/* 👇 Show Password Checkbox */}
          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <button type="submit">Login</button>

          <div className="remember-forgot">
            <Link to="/forgotpassword" className="link-style">Forgot Password?</Link>
          </div><br />
          <div className="registerNow">
            Not Registered? <Link to="/register">Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
