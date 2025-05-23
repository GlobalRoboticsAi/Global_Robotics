import React from 'react'
import NavBar from './NavBar'
import '../Styles/Contact.css'
import ContactUs from '../Images/Contact_Us.png'
import Footer from './Footer'
import UserNavBar from './UserNavBar'
import { useState } from 'react'
import axios from 'axios'
import Base_URL from '../Config'

export default function Contact() {
    const token=sessionStorage.getItem("token");
        const role=sessionStorage.getItem("role");
        let NavbarComponent;
      
         if (token && role === 'ROLE_USER') {
            NavbarComponent = <UserNavBar />;
        } else {
            NavbarComponent = <NavBar />;
        }

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
        <div>
            <div className="contactSection">
                {NavbarComponent}
                <div className='contactSectionText'>
                    <h1>Get In <span style={{ color: "#28B896" }}>Touch</span></h1>
                    <p>We’re here to help and answer any question you might have. Whether you're curious about features, a partnership, or anything else — we’re ready to answer all your questions.</p>
                    <div className='contactBt'><b>Home &gt;&gt; <span style={{ color: "#28B896" }}>Contact Us</span></b></div>
                </div>
                <img className='robo' src={ContactUs} />
            </div>

            {/* Contact Us Form */}
            <div className="contactUsFormSection">
                <div className="contactUsAddress">
                    <h1>Contact <span style={{ color: "#28B896" }}>Us</span></h1>
                    <p>We’d love to hear from you! </p>
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
            </div>
            <Footer />
        </div>
    )
}
