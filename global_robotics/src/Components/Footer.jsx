import React from 'react'
import '../Styles/Footer.css'
import Logo from '../Images/logo.png'


export default function Footer() {
  return (
    <>
      <div className="footerSection">
        <div className="footerSectionText">
        <div className="footerCompanyDetails">
          <img src={Logo}/>
          <p>Join Global Robotics Ai to learn cutting-edge technologies, build innovative projects, and create a bright future in robotics and AI through hands-on experience, expert guidance, and a growth-focused environment.</p>
        </div>
        <div className="footerLinks">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footerServices">
          <h3>Our Services</h3>
          <ul>
            <li>Robotics Lab Designing</li>
            <li>Franchisee Operation</li>
            <li>Research & Developement</li>
            <li>Training & Placement</li>
            <li>Robotics Competition</li>
            <li>Robot Kit Manufacturing & Sale</li>
            <li>Robotics Competition</li>
          </ul>
        </div>

        <div className="footerContact">
          <h3>Contact Us</h3>
          <ul>
            <li>+91 7756051573</li>
            <li><a href="mailto:globalrobotics.ai@gmail.com.com">globalrobotics.ai@gmail.com</a></li>
            <li>Office no.s-6, 2nd floor, Krystal Plaza, near Gold's Gym, Tarabai Park, Kolhapur, Maharashtra 416003</li>
          </ul>
          <div className="footerSocial">
              <div className="socialIcons">
              <a href="mailto:globalrobotics.ai@gmail.com" target="_blank" rel="noopener noreferrer"><SiGmail /></a>
              <a href="https://www.linkedin.com/company/global-robotics-and-ai-research-company/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://www.instagram.com/global_robotics_ai/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://wa.me/917756051573" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              </div>
            </div>
        </div>
        </div>
        <hr/>
        <h6>Copyright @2025, Globalrobotics ai All Rights Reserved.</h6>
      </div>
    </>
  )
}
