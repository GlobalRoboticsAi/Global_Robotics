import React from 'react'
import '../Styles/AdminHome.css'
import AdminHero from './AdminHero'
import Footer from './Footer'
import AiImage from '../Images/Ai_Logo.png'

export default function AdminHome() {
  
  return (
    <>
      <AdminHero/>

       {/* About Section */}
       <div className="AdminHomeAboutSection">
        <img className="AdminHomeAboutSectionImage" src={AiImage} />
        <div className="AdminHomeAboutSectionText">
          <h1>About <span style={{ color: "#28B896" }}>Us</span></h1>
          <p>At <b>Global Robotics</b>, we are at the forefront of innovation, transforming the way industries operate through intelligent automation. Since our inception, we have been driven by a mission to design and deliver cutting-edge robotic solutions that enhance productivity, safety, and efficiency across sectors — from manufacturing and healthcare to logistics and agriculture.</p>
          <p>With a team of dedicated engineers, researchers, and visionaries, Global Robotics combines the power of AI, machine learning, and advanced hardware to create systems that think, move, and adapt. Our portfolio includes collaborative robots (cobots), autonomous vehicles, industrial arms, and custom-built automation systems — all designed with precision, scalability, and reliability in mind.</p>
          <p>As a global leader in robotics, we believe in pushing boundaries, empowering businesses, and building a smarter, more sustainable future through technology.</p>
          <p><b>Innovation. Intelligence. Impact.</b> That’s what drives Global Robotics.</p>
        </div>
      </div>

      <Footer/>
    </>
  )
}
