import React from 'react'
import '../Styles/Hero.css'
import HeroSecRobot from '../Images/Robo2.png'
import Banner_Design from '../Images/banner_design.png'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'



export default function Hero() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='HeroSection'>
        <NavBar/>
        <div className='HeroSectionText'>
        <h1>Learn,Build,Create Your Future with <span style={{color:"#28B896"}}>Global Robotics Ai!</span></h1>
        <p>Join Global Robotics Ai to learn cutting-edge technologies, build innovative projects, and create a bright future in robotics and AI through hands-on experience, expert guidance, and a growth-focused environment.</p>
        <button onClick={() => navigate('/contact')}>Contact Us</button>
        </div>
        <img className='robo' src={HeroSecRobot}/>

      </div>
    </div>
  )
}
