import React from 'react';
import '../Styles/Testimonial.css';
import { RiDoubleQuotesL } from "react-icons/ri";

const testimonials = [
  {
    name: 'Rohit Yadav',
    role: 'Student',
    message: 'All the courses are very nice!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Deepak Patil',
    role: 'Student',
    message: 'This product has transformed the way we work. Highly recommended!',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Omkar Mali',
    role: 'Student',
    message: 'Amazing experience and seamless integration with our system.',
    image: 'https://randomuser.me/api/portraits/men/53.jpg',
  },
  
  // Add more testimonials if needed
];

const Testimonial = () => {
  return (
    <div className="testimonial-container">
      <h1 className="testimonial-heading">
        Client <span style={{ color: "#28B896" }}>Testimonials</span>
      </h1>
      <p className="testimonial-subheading">What Our Clients Say</p><br />

      <div className="testimonial-card-grid">
        {testimonials.map((testimonial, idx) => (
          <div className="testimonial-card" key={idx}>
            <RiDoubleQuotesL className='double-colon'/>
            <img src={testimonial.image} alt={testimonial.name} className="user-image" />
            <h3>{testimonial.name}</h3>
            <p className="role">{testimonial.role}</p>
            <p className="message">"{testimonial.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
