import React from 'react'
import NavBar from './NavBar'
import '../Styles/NavBar.css'
import '../Styles/About.css'
import AboutSecRobot from '../Images/AboutPng.png'
import AiImage from '../Images/Ai_Logo.png'
import Footer from './Footer'
import UserNavBar from './UserNavBar'


export default function About() {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  let NavbarComponent;

  if (token && role === 'ROLE_USER') {
    NavbarComponent = <UserNavBar />;
  } else {
    NavbarComponent = <NavBar />;
  }
  return (
    <>
      <div className="aboutSection">
        {NavbarComponent}
        <div className='AboutSectionText'>
          <h1>About <span style={{ color: "#28B896" }}>Us</span></h1>
          <p>At Global Robotics AI, we are passionate about shaping the future through innovation in robotics and artificial intelligence. Our mission is to empower learners, creators, and businesses with cutting-edge technology solutions that drive progress and solve real-world problems. With a commitment to quality, creativity, and accessibility, we strive to make robotics education and automation tools available to everyone.</p>
          <div className='aboutSecBt'><b>Home &gt;&gt; <span style={{ color: "#28B896" }}>About Us</span></b></div>
        </div>
        <img className='robo' src={AboutSecRobot} />
      </div>
      <div className="block">
      <div className="homeAboutSection">
        <img className="homeAboutSectionImage" src={AiImage} />
        <div className="homeAboutSectionText">
          <h1>About <span style={{ color: "#28B896" }}>Us</span></h1>
          <p>At <b>Global Robotics</b>, we are at the forefront of innovation, transforming the way industries operate through intelligent automation. Since our inception, we have been driven by a mission to design and deliver cutting-edge robotic solutions that enhance productivity, safety, and efficiency across sectors — from manufacturing and healthcare to logistics and agriculture.</p>
          <p>With a team of dedicated engineers, researchers, and visionaries, Global Robotics combines the power of AI, machine learning, and advanced hardware to create systems that think, move, and adapt. Our portfolio includes collaborative robots (cobots), autonomous vehicles, industrial arms, and custom-built automation systems — all designed with precision, scalability, and reliability in mind.</p>
          <p>As a global leader in robotics, we believe in pushing boundaries, empowering businesses, and building a smarter, more sustainable future through technology.</p>
          <p><b>Innovation. Intelligence. Impact.</b> That’s what drives Global Robotics.</p>
        </div>
      </div>
      </div>
      <Footer />

    </>
  )
}
