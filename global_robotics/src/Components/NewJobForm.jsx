import React, { useState } from 'react';
import '../Styles/NewJobForm.css';
import Logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaCircleArrowLeft } from "react-icons/fa6";
import Base_URL from '../Config';

export default function NewJobForm() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");


  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      const response = await fetch(`${Base_URL}admin/addnewjob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Job Added Successfully");
        navigate("/admincareer"); // or wherever you want
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
        <form onSubmit={handleSubmit}>
          <div className="circle">
            <img src={Logo} alt="Logo" />
          </div><br />
          <h1>Add New Job</h1>

          <input
            className="input-Jobbox"
            type="text"
            name="title"
            placeholder="Enter Job Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            placeholder="Enter Job Details..."
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", resize: "vertical", padding: "2px", boxSizing: "border-box" }}
            required
          ></textarea><br /><br />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
