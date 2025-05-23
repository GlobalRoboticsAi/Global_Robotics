import React from 'react'
import Logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom';



export default function AdminNavBar() {
  const navigate=useNavigate();
   const username = sessionStorage.getItem("username");
   const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    navigate("/"); // adjust this path to your actual login route
  };
  return (
    <div>
      <nav class="nave navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="tColor navbar-brand" href="/"><img className='logo' src={Logo}/></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navItems collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item me-5">
              <a class="nav-link active" aria-current="page" href="/adminHome">Home</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/adminCourses">Courses</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/adminCareer">Careers</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/adminMedia">Gallery</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/adminHome">Welcome <span style={{ color: "red",fontWeight:"500" }}>Admin!</span></a>
            </li>
          </ul>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
    </div>
  )
}
