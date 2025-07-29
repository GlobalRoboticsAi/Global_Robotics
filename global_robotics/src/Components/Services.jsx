import React from 'react'
import '../Styles/Services.css'
import NavBar from './NavBar'
import ServicesRobo from '../Images/ServiceRobo.png'
import Card1Icon from '../Images/card1Icon.png'
import Card2Icon from '../Images/Handshake.png'
import Card3Icon from '../Images/research.png'
import Card4Icon from '../Images/placement.png'
import Card5Icon from '../Images/learning.png'
import Card6Icon from '../Images/robotKit.png'
import Card7Icon from '../Images/competition.png'
import Card8Icon from '../Images/EV_Charging.png'
import Card9Icon from '../Images/AgriAI.png'
import Card10Icon from '../Images/Industrial_Automation.png'
import Footer from './Footer'
import UserNavBar from './UserNavBar'


export default function Services() {
    const token=sessionStorage.getItem("token");
        const role=sessionStorage.getItem("role");
        let NavbarComponent;
      
         if (token && role === 'ROLE_USER') {
            NavbarComponent = <UserNavBar />;
        } else {
            NavbarComponent = <NavBar />;
        }
    return (
        <>
            
            <div className="serviceSection">
               {NavbarComponent}
                <div className='ServiceSectionText'>
                    <h1>Our <span style={{ color: "#28B896" }}>Services</span></h1>
                    <p>At Global Robotics AI, we offer a comprehensive suite of services designed to advance the field of robotics education and innovation. Our offerings cater to students, educators, institutions, and businesses seeking cutting-edge solutions in robotics and automation.</p>
                    <div className='serviceBt'><b>Home &gt;&gt; <span style={{ color: "#28B896" }}>Services</span></b></div>
                </div>
                <img className='robo' src={ServicesRobo} />
            </div>
            <div className="block">
            <div className="ServiceHomeCardSection">
                <h4>SERVICES WE PROVIDE</h4>
                <h6>Our Purpose is To Deliver Excellence in Service and Execution</h6>
                <div className="ServicesCard">
                    <div className="card">
                        <img className="cardLogo" src={Card1Icon} />
                        <div className="cardText">
                            <h3>Robotics Lab Designing</h3>
                            <p>We specialize in designing state-of-the-art robotics labs tailored to the needs of educational institutions and training centers. Our labs are equipped with modern tools and components to foster hands-on learning and innovation.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card2Icon} />
                        <div className="cardText">
                            <h3>Franchisee Operation</h3>
                            <p>Join our network through our franchisee model and become a part of the growing robotics revolution. We provide all the support and resources needed to establish and run a successful robotics training center.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card3Icon} />
                        <div className="cardText">
                            <h3>Research & Development</h3>
                            <p>Our dedicated R&D team constantly explores new frontiers in robotics and automation, creating innovative solutions and upgrading existing technologies to meet industry demands.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card4Icon} />
                        <div className="cardText">
                            <h3>Training & Placement</h3>
                            <p>We specialize in designing state-of-the-art robotics labs tailored to the needs of educational institutions and training centers. Our labs are equipped with modern tools and components to foster hands-on learning and innovation.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card5Icon} />
                        <div className="cardText">
                            <h3>Online & Offline Learning Platform</h3>
                            <p>Our hybrid learning platform offers both online and classroom-based programs. Learners can access interactive courses, live sessions, and practical projects, making robotics education accessible and flexible.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card6Icon} />
                        <div className="cardText">
                            <h3>Robot Kit Manufacturing & Sale</h3>
                            <p>We manufacture and sell high-quality robot kits designed for education, hobby, and prototyping purposes. Our kits include detailed instructions and components to simplify the learning process.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card7Icon} />
                        <div className="cardText">
                            <h3>Robotics Competition</h3>
                            <p>We organize and support robotics competitions to spark creativity and innovation among students. These competitions provide a platform for young minds to showcase their technical skills and problem-solving abilities.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card8Icon} />
                        <div className="cardText">
                            <h3>EV Electric Charging Station</h3>
                            <p>We establish and promote EV electric charging stations to encourage the adoption of sustainable transportation. These stations offer convenient and eco-friendly solutions for electric vehicle users, contributing to a greener future and reducing our carbon footprint.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card9Icon} />
                        <div className="cardText">
                            <h3>AI in Agriculture</h3>
                            <p>We harness AI to revolutionize farming practices. From crop monitoring to predictive analytics, our solutions enhance efficiency and yield. This empowers farmers to make smarter, data-driven decisions for sustainable agriculture.</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="cardLogo" src={Card10Icon} />
                        <div className="cardText">
                            <h3>Industrial Automation Robots</h3>
                            <p>We develop and deploy industrial robots to streamline manufacturing processes. These robots boost productivity, ensure precision, and reduce human error. Our automation solutions help industries achieve greater efficiency and consistency.</p>
                        </div>
                    </div>

                </div>
            </div>
            </div>
            <Footer/>
           
        </>
    )
}
