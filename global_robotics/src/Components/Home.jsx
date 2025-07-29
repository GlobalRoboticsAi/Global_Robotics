import React from 'react'
import Hero from './Hero'
import '../Styles/Home.css'
import AiImage from '../Images/Ai_Logo.png'
import ServiceImg from '../Images/Robotics Lab Designing (1).png'
import WhyChooseUsImage from '../Images/Why_Choose_Us.jpg'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Testimonial from './Testimonial'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Partner1 from '../Images/ITBTE.png';
import Partner2 from '../Images/IIT_Bombay.png';
import Partner3 from '../Images/MSME.png';
import Partner4 from '../Images/Skill_India.png';
import Partner5 from '../Images/niti-seeklogo.png'
import ChannelPartner1 from '../Images/SunRobotics_Social_Sharing.webp'
import ChannelPartner2 from '../Images/DYPCET_Logo.png'
import ChannelPartner3 from '../Images/belectriq_logo.png'
import ChannelPartner4 from '../Images/Vyankateshwara.png'
import ChannelPartner5 from '../Images/SIT.png'
import ChannelPartner6 from '../Images/DKTE.png'
import ChannelPartner7 from '../Images/Ashwamedh.png'
import ChannelPartner8 from '../Images/khanjire school.png'
import ChannelPartner9 from '../Images/saint_anthony.png'
import ChannelPartner10 from '../Images/tiit_jalna.png'
import ChannelPartner11 from '../Images/women bed.png'
import Base_URL from '../Config'




export default function Home() {
   const [mediaList, setMediaList] = useState([]);
  const [previewUrls, setPreviewUrls] = useState({});
  const navigate = useNavigate();
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

  const partnerLogos = [Partner1, Partner2, Partner3, Partner4, Partner5]; 

  const ChannelPartnerLogos = [ChannelPartner1,ChannelPartner2,ChannelPartner3,ChannelPartner4,ChannelPartner5,ChannelPartner6,ChannelPartner7,ChannelPartner8,ChannelPartner9,ChannelPartner10,ChannelPartner11]; 

  const fetchMedia = () => {
    fetch(`${Base_URL}auth/all`, {
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch media");
        return res.json();
      })
      .then((data) => {
        setMediaList(data);
      })
      .catch((err) => console.error("Fetch media failed", err));
  };

  // Fetch binary blobs for all media and create preview URLs
  const loadPreviews = async (mediaData) => {
    const urls = {};
    for (const media of mediaData) {
      try {
        const res = await fetch(`${Base_URL}auth/view/${media.id}`, {
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        urls[media.id] = url;
      } catch (e) {
        console.error(`Preview fetch failed for ID ${media.id}`);
      }
    }
    setPreviewUrls(urls);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // After mediaList is set, load preview URLs
  useEffect(() => {
    if (mediaList.length > 0) loadPreviews(mediaList);
  }, [mediaList]);
  return (
    <>
      <Hero />

      {/* About Section */}
      <div className="block">
      <div className="homeAboutSection">
        <img className="homeAboutSectionImage" src={AiImage} />
        <div className="homeAboutSectionText">
          <h1>About <span style={{ color: "#28B896" }}>Us</span></h1>
          <p>At <b>Global Robotics</b>, we are at the forefront of innovation, transforming the way industries operate through intelligent automation. Since our inception, we have been driven by a mission to design and deliver cutting-edge robotic solutions that enhance productivity, safety, and efficiency across sectors — from manufacturing and healthcare to logistics and agriculture.</p>
          <p>With a team of dedicated engineers, researchers, and visionaries, Global Robotics combines the power of AI, machine learning, and advanced hardware to create systems that think, move, and adapt. Our portfolio includes collaborative robots (cobots), autonomous vehicles, industrial arms, and custom-built automation systems — all designed with precision, scalability, and reliability in mind.</p>
          <p>As a global leader in robotics, we believe in pushing boundaries, empowering businesses, and building a smarter, more sustainable future through technology.</p>
          <p><b>Innovation. Intelligence. Impact.</b> That’s what drives Global Robotics.</p>
          <button onClick={() => navigate('/about')}>Read More</button>
        </div>
      </div>
      </div>
      {/* Services */}
      <div className="block">
      <div className="homeServiceSection">
        <div className="homeServiceSectionText">
          <h1>Our <span style={{ color: "#28B896" }}>Services</span></h1>
          <button onClick={() => navigate('/services')}>Read More</button>
        </div>
        <img className="homeServiceSectionImage" src={ServiceImg} />
      </div>
      </div>
      <br />
      {/* Why choose us */}
      <div className="block">
      <div className="homeWhyChooseUsSection">
        <img src={WhyChooseUsImage} />
        <div className="homeWhyChooseUsSectionText">
          <h1>Why <span style={{ color: "#28B896" }}>Choose Us</span></h1><br />
          <p><b>🔧 Cutting-Edge Technology</b><br />
            We harness the power of advanced robotics, artificial intelligence, and automation to deliver innovative solutions that future-proof your business.
            <br />
            <b>👨‍💼 Expert Team</b><br />
            Our team of seasoned engineers, developers, and researchers brings deep industry knowledge and technical expertise to every project.
            <br />
            <b>📈 Proven Track Record</b><br />
            With successful deployments across multiple industries, our solutions have consistently increased efficiency, reduced operational costs, and delivered measurable ROI.
            <br />
            <b>🌍 Global Reach</b><br />
            From startups to Fortune 500 companies, we serve clients around the world — delivering consistent performance, no matter the scale.
            <br />
            <b>🛠️ Tailored Solutions</b><br />
            We understand that every business is unique. That’s why we design flexible, scalable robotics solutions that meet your specific needs.
            <br />
            <b>🔒 Reliability & Support</b><br />
            We don’t just build robots — we build relationships. Our dedicated support team ensures your systems perform reliably, long after deployment.

          </p>
        </div>
      </div>
      </div>
         {/* Affiliated to */}
         <div className="block">
      <div className="ourPartnersSection">
        <h1>Affiliated <span style={{ color: "#28B896" }}>to</span></h1>
        <p>Associated with pioneers and trusted organizations at the forefront of robotics and AI</p>

        <div className="partnerLogoGrid">
          {partnerLogos.map((logo, index) => (
            <div key={index} className="partnerLogoTile">
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
          </div>
            {/* Videos Section */}
            <div className="block">
      <div className="reelSection">
  <h1>
    Our <span style={{ color: "#28B896" }}>Highlights</span>
  </h1>
  <p>Catch a glimpse of our latest activities, innovations.</p>

  {mediaList.length === 0 ? (
    <p style={{ textAlign: "center", color: "#888", marginTop: "1rem" }}>
      There are no videos and images.
    </p>
  ) : (
    <div className="mediaGallery">
      {mediaList.map((media) => (
        <div key={media.id} className="mediaItem">
          {media.type === "video" ? (
            <video
              src={previewUrls[media.id]}
              controls
              className="mediaPreview"
            />
          ) : (
            <img
              src={previewUrls[media.id]}
              alt="uploaded"
              className="ImageMediaPreview"
            />
          )}
        </div>
      ))}
    </div>
  )}
</div>
</div>

          {/* Channel Partners */}
          <div className="block">
      <div className="ourChannelPartnersSection">
        <h1>Our Channel <span style={{ color: "#28B896" }}>Partners</span></h1>
        <p>Working alongside pioneers and organizations at the forefront of robotics and AI innovation</p>

        <div className="ChannelPartnerLogoGrid">
          {ChannelPartnerLogos.map((logo, index) => (
            <div key={index} className="ChannelPartnerLogoTile">
              <img src={logo} alt={`ChannelPartner ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      </div>
          <Testimonial />

      {/* Contact Us Form */}
      <div className="block">
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
          </div>
      {/* <div className="ourPartnersSection">
        <h1>Our <span style={{ color: "#28B896" }}>Partners</span></h1>
        <p>Trusted by leading innovators and organizations powering the future of robotics and AI.</p>
        <Slider {...sliderSettings}>
          {partnerLogos.map((logo, index) => (
            <div key={index} className="partnerLogoSlide">
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div> */}
        <div className="block">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.076639054881!2d74.24230387461287!3d16.71192262191338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc10196dc303375%3A0xc6739ffa664a8806!2sGlobal%20Robotics%20and%20AI%20Research!5e1!3m2!1sen!2sin!4v1747220157716!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Global Robotics and AI Research Location"
      />
      </div>


      {/* Footer Section */}
      <Footer />
    </>
  )
}
