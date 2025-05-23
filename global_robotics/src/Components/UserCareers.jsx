import React, { useEffect, useState } from 'react';
import '../Styles/UserCareer.css'
import ServicesRobo from '../Images/careers.png'
import Footer from './Footer'
import UserNavBar from './UserNavBar';
import ApplyJobForm from './ApplyJobForm';
import Base_URL from '../Config';

export default function UserCareers() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const token = sessionStorage.getItem("token");
  

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    if (!token) {
      setError("Unauthorized: No token found.");
      return;
    }

    fetch(`${Base_URL}user/getalljobs`, {
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

  return (
    <div>
      <div className="careersSection">
        <UserNavBar />
        <div className='careersSectionText'>
          <h1>Join Our <span style={{ color: "#28B896" }}>Team</span></h1>
          <p>At <b>Global Robotics AI</b>, we’re always looking for passionate individuals to join our journey.</p>
          <div className='careersBt'><b>Home &gt;&gt; <span style={{ color: "#28B896" }}>Careers</span></b></div>
        </div>
        <img className='robo' src={ServicesRobo} alt="careers" />
      </div>

      {/* Why Work With Us */}

            <div className="CareersWhyWork">
              <h1>Why Work With <span style={{ color: "#28B896" }}>Us?</span></h1>
              <h2>Empowering Innovation Through Talent</h2>
              <div className="CareersWhyWorkSection">
                <div className="WhyWorkCircle">
                  <h3>Cutting-Edge Technology</h3>
                  <p>Work with the latest advancements in robotics, AI, and automation.</p>
                </div>

                <div className="WhyWorkCircle">
                  <h3>Continuous Learning</h3>
                  <p>We offer ongoing training, workshops, and growth opportunities.</p>
                </div>

                <div className="WhyWorkCircle">
                  <h3>Innovative Culture</h3>
                  <p>Be part of a collaborative team that encourages creativity and experimentation.</p>
                </div>

                 <div className="WhyWorkCircle">
                  <h3>Impactful Work</h3>
                  <p>Help shape the future by contributing to education, industry, and society.</p>
                </div>
              </div>
            </div>

        {/* Open Positions */}

      <div className="CareersOpenPositionSection">
        <h1>Open <span style={{ color: "#28B896" }}>Positions</span></h1>
        <h2>📌 We’re currently hiring for the following roles:</h2>

    <div className="UserCareerCardSection">
  {error && <p style={{ color: 'red' }}>{error}</p>}
  {jobs.length === 0 && !error ? (
    <p>Loading or no job positions available.</p>
  ) : (
    <div className="UserCareerCard">
      {jobs.map((job) => (
        <div className="UserCard" key={job.id}>
          <div className="UserCareerCardText">
            <h3>{job.title}</h3>
            <div className="job-description">
              <p>{job.description}</p>
            </div>
            <button
              className="applyBtn"
              onClick={() => {
                console.log("Selected job:", job);
                setSelectedJob(job);
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      </div>

      {selectedJob && (
        <ApplyJobForm job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}


      <Footer />
    </div>
  );
}
