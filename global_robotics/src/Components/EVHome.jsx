import React from 'react'
import NavBar from './NavBar'
import "../Styles/EVHome.css"
import ServicesRobo from '../Images/AI.png'
import EVImage from '../Images/EVCar.jpg'
import EVServiceCrads from './EVServiceCrads'
import WhyChoose from "../Images/WhyChoose.jpg"
import Evlogo from "../Images/flow_chart.jpg"
import Footer from './Footer'
import { useState } from 'react'
import Base_URL from '../Config'
import axios from 'axios'


export default function EVHome() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post(`${Base_URL}auth/contact`, formData);
      setSuccessMessage('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' }); // clear form
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again.');
    }
    setLoading(false);
  };
  return (
   <>
    <div className="evChargingSection">
               <NavBar/>
                <div className='evChargingSectionText'>
                    <h1>Our <span style={{ color: "#28B896" }}>EV Charging Services!</span></h1>
                    <p>At Global Robotics and AI Research Company, in partnership with Belectriq, we provide a complete range of EV charging station services aimed at building a smarter, greener future. Our solutions are designed for residential, commercial, industrial, and public sector clients across Maharashtra.</p>
                    <div className='evChargingBt'><b>Home &gt;&gt; <span style={{ color: "#28B896" }}>EV Charging</span></b></div>
                </div>
                <img className='EvPlayLogo' src={ServicesRobo} alt='xyz'/>
            </div>
            
            <div className="block">
            <div className="evAboutSection">
        <img className="evAboutSectionImage" src={EVImage} />
        <div className="evAboutSectionText">
          <h1><span style={{ color: "#28B896" }}>⚡Overviews!</span></h1>
          <p><b>Global Robotics and AI Research Company</b> is proud to announce its strategic partnership with <b>Belectriq</b>, a leading innovator in electric vehicle (EV) charging solutions. Through this collaboration, we aim to accelerate the adoption of EV infrastructure across Maharashtra by offering state-of-the-art EV charging station installation services.</p>
            <br />
            <br />
            <h1>🤝 Our Partnership with<span style={{ color: "#28B896" }}> Belectriq</span></h1>
          <p><b>Belectriq</b> brings cutting-edge EV charging technology and smart energy solutions, while we at Global Robotics handle the on-ground execution, installation, and service operations. Together, we are committed to building a sustainable and energy-efficient future.</p>
        </div>
      </div>
      </div>
      <EVServiceCrads/>

      {/* Why Choose Us */}
      <div className="block">
        <div className="evAboutSection">
        <div className="evAboutSectionText">
          <h1>Why Choose<span style={{ color: "#28B896"}}> Us?</span></h1>
          <br />
          <ul>
            <li>✅ Strong partnership with a reputed EV tech company – <b>belectriq</b></li>
            <li>✅ Expert installation team and technical support</li>
            <li>✅ Pan-Maharashtra reach</li>
            <li>✅ Scalable, smart, and eco-friendly solutions</li>
            <li>✅ Future-ready infrastructure</li>
          </ul>
        </div>
          <img className="evAboutSectionImage" src={WhyChoose} />
      </div>
      </div>
        {/* Types of charger */}
        <div className="block">
        <div className="typesofev">
  <h1>🔌 Types of EV Chargers We Offer</h1>
  <div className="responsive-table-container">
    <table className="ev-table">
      <thead>
        <tr>
          <th>Charger Type</th>
          <th>Output Power</th>
          <th>Use Case</th>
          <th>Charging Time</th>
        </tr>
      </thead>
      <tbody>
        {/* AC Chargers */}
        <tr>
          <td rowSpan="6"><b>AC Charger</b></td>
          <td>3.3 kW</td>
          <td>Homes, Offices</td>
          <td>6–8 hours</td>
        </tr>
        <tr>
          <td>7.4 kW (Single & Dual Gun)</td>
          <td>Apartments, Society Parking</td>
          <td>4–6 hours</td>
        </tr>
        <tr>
          <td>10 kW (Triple Socket)</td>
          <td>Commercial & Residential</td>
          <td>4–6 hours</td>
        </tr>
        <tr>
          <td>11 kW (Single & Dual Gun)</td>
          <td>Offices, Fleets</td>
          <td>3–5 hours</td>
        </tr>
        <tr>
          <td>14 kW Hybrid</td>
          <td>Mixed Charging Requirements</td>
          <td>3–6 hours</td>
        </tr>
        <tr>
          <td>22 kW (Single & Dual Gun)</td>
          <td>Fast AC Charging for Businesses</td>
          <td>2–4 hours</td>
        </tr>

        {/* DC Fast Chargers */}
        <tr>
          <td rowSpan="2"><b>DC Fast Charger</b></td>
          <td>15–30 kW</td>
          <td>Commercial Locations</td>
          <td>1–2 hours</td>
        </tr>
        <tr>
          <td>60 kW</td>
          <td>EV Stations, Bus Depots</td>
          <td>45–60 minutes</td>
        </tr>

        {/* Ultra-Fast Chargers */}
        <tr>
          <td rowSpan="3"><b>Ultra-Fast Charger</b></td>
          <td>120 kW</td>
          <td>Highways, Large Fleets</td>
          <td>30–40 minutes</td>
        </tr>
        <tr>
          <td>180 kW</td>
          <td>High-Speed Charging Hubs</td>
          <td>20–30 minutes</td>
        </tr>
        <tr>
          <td>240 kW</td>
          <td>Heavy-Duty EVs, Express Charging</td>
          <td>15–25 minutes</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>

          {/* Our Process */}
                <br />
                <div className="block">
                <div className='EvProcess'>
                <h1>Our <span style={{ color: "#28B896" }}>Process</span></h1>
              <img src={Evlogo} className='beLogo' alt="" />
              </div>
              </div>
              <br />

        
       {/* Contact Us Form */}
       <div className="block">
      <div className="contactUsFormSection">
        
        <div className="contactUsForm">
          <h1>Drop Us a <span style={{ color: "#28B896" }}>Message!</span></h1>
          <p>Fill out the form below and our team will reach out to you soon.</p>
          <form onSubmit={handleSubmit}>
            <h4>Name:</h4>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Name..." required /><br />

            <h4>Email:</h4>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email..." required /><br />

            <h4>Phone:</h4>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Your Phone..." required /><br />

            <h4>Message:</h4>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Your Message..."
              rows="5"
              style={{ width: "100%", resize: "vertical", padding: "2px", boxSizing: "border-box" }}
              required
            ></textarea><br />

            <button className="formBtn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>

          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
        <div className="contactUsAddress">
          <h1>Contact <span style={{ color: "#28B896" }}>Us</span></h1>
          <p>Ready to install an EV charging station at your location?</p>
          <div className="contactUsAddressData">
            <h2>📍 Our Office</h2>
            <p>Office no.s-6, 2nd floor, Krystal Plaza, near Gold's Gym, Tarabai Park, Kolhapur, Maharashtra 416003</p><br />

            <h2>📞 Get in Touch</h2>
            <p><b>Phone:</b> +91 98765 43210 <br />

              <b>Email:</b> globalrobotics.ai@gmail.com</p><br />

            <h2>🕒 Working Hours</h2>
            <p><b>Monday to Saturday:</b> 10:00 AM – 6:00 PM  <br />
              <b>Sunday:</b> Closed</p>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
   </>
  )
}
