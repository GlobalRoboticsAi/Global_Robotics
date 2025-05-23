import React, { useEffect, useState } from 'react';
import AdminNavBar from './AdminNavBar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../Styles/AdminCareer.css'
import Base_URL from '../Config';

export default function AdminCareer() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    if (!token) {
      setError("Unauthorized: No token found.");
      return;
    }

    fetch(`${Base_URL}admin/getalljobs`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs (Status: " + response.status + ")");
        }
        return response.json();
      })
      .then(data => setJobs(data))
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setError("Error fetching job data. " + err.message);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`${Base_URL}admin/deletejob/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert("Job deleted successfully");
        fetchJobs(); // refresh the list
      } else {
        const errMsg = await response.text();
        alert("Failed to delete job: " + errMsg);
      }
    } catch (error) {
      alert("Error deleting job: " + error.message);
    }
  };

  return (
    <>
      <div className='AdminHeroSection'>
        <AdminNavBar />
        <div className="AdminHeroSectionText">
          <h1>Career <span style={{ color: "#28B896" }}>Section</span></h1>
        </div>
      </div>

      <div className="CareersOpenPositionSection">
        <h1>Job <span style={{ color: "#28B896" }}>Positions</span></h1>
        <button className='addNewJobBtn' onClick={() => navigate('/addnewjob')}>Add New Job</button>

        <div className="AdminCareerCardSection">
  {error && <p style={{ color: 'red' }}>{error}</p>}
  {jobs.length === 0 && !error ? (
    <p>Loading or no job positions available.</p>
  ) : (
    <div className="AdminCareerCard">
      {jobs.map((job) => (
        <div className="AdCareerCard" key={job.id}>
          <div className="AdminCareerCardText">
            <h3>{job.title}</h3>
            <div className="job-description">
              <p>{job.description}</p>
            </div>
            <div style={{ marginTop: '10px' }}>
              <button
                style={{
                  marginRight: '10px',
                  backgroundColor: '#28B896',
                  color: 'white',
                  padding: '5px 10px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/editjob/${job.id}`)}
              >
                Edit
              </button>
              <button
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  padding: '5px 10px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      </div>
      <Footer/>
    </>
  );
}
