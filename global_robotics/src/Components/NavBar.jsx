import React from 'react'
import '../Styles/NavBar.css'
import Logo from '../Images/logo.png'

export default function NavBar() {
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
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/about">About</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/services">Services</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/evHome">EV Charging</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/courses">Courses</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/careers">Careers</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/contact">Contact us</a>
            </li>
            <li class="nav-item me-5">
              <a class="nav-link" href="/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}
