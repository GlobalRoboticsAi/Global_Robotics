import React, { useEffect, useState } from 'react';
import '../Styles/NewJobForm.css';
import Logo from '../Images/logo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCircleArrowLeft } from "react-icons/fa6";
import Base_URL from '../Config';

export default function EditJobForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // job ID from URL
  const token = sessionStorage.getItem("token");
  

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

 

  useEffect(() => {
    fetch(`${Base_URL}aadmin/getbyid/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load job details");
        return res.json();
      })
      .then(data => {
        setFormData({
          title: data.title,
          description: data.description,
        });
      })
      .catch(err => {
        setError("Error: " + err.message);
      });
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${Base_URL}admin/editjob/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Job updated successfully");
        navigate("/admincareer");
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
          <h1>Edit Job</h1>

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

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
