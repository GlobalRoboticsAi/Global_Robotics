import React, { useState } from 'react';
import '../Styles/AdmissionForm.css';
import Base_URL from '../Config';

export default function CourseAdmissionForm({ course, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    courseTitle: course.title,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    fetch(`${Base_URL}auth/admission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        setLoading(false);
        if (!res.ok) throw new Error("Failed to submit admission form");
        setSuccessPopup(true);
        setTimeout(() => {
          setSuccessPopup(false);
          onClose(); // Close the form after showing popup
        }, 2000);
      })
      .catch(err => {
        setLoading(false);
        alert(err.message);
      });
  };

  return (
    <div className="admission-form-overlay">
      <div className="admission-form-container">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Course Admission Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" required onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" required onChange={handleChange} />

          <label>Mobile:</label>
          <input type="tel" name="mobile" required onChange={handleChange} />

          <label>Course:</label>
          <input type="text" value={formData.courseTitle} readOnly />

          <label>Message:</label>
          <textarea name="message" onChange={handleChange}></textarea>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>

        {/* Success Popup */}
        {successPopup && (
          <div className="success-popup">
            🎉 Form sent successfully!
          </div>
        )}
      </div>
    </div>
  );
}
