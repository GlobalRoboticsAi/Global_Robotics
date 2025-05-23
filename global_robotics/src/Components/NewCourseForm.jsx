import React, { useState } from 'react';
import '../Styles/NewJobForm.css';
import Logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaCircleArrowLeft } from "react-icons/fa6";
import Base_URL from '../Config';

export default function NewCourseForm() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const [image, setImage] = useState(null); // Image file
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (image) {
      data.append("image", image); // Make sure the backend field name matches
    }

    try {
      const response = await fetch(`${Base_URL}admin/addnewcourse`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
          // Do NOT set Content-Type manually for FormData
        },
        body: data
      });

      if (response.ok) {
        alert("Course Added Successfully");
        navigate("/admincourses");
        window.location.reload();
      } else {
        const errMsg = await response.text();
        setError("Error: " + errMsg);
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <div className="AddNewJobFormSection">
      <div className="AddNewJobFormSectionInput">
        <FaCircleArrowLeft className="backIcon" onClick={() => navigate(-1)} />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="circle">
            <img src={Logo} alt="Logo" />
          </div><br />
          <h1>Add New Course</h1>

          <input
            className="input-Jobbox"
            type="text"
            name="title"
            placeholder="Enter Course Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            placeholder="Enter Course Details..."
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", resize: "vertical", padding: "2px", boxSizing: "border-box" }}
            required
          ></textarea><br />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          /><br /><br />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
