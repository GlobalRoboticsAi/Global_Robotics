import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import '../Styles/Careers.css'
import ServicesRobo from '../Images/careers.png'
import Footer from './Footer'
import Base_URL from '../Config';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
      fetchJobs();
    }, []);
  
    const fetchJobs = () => {
     
      fetch(`${Base_URL}auth/getalljobs`, {
        method: "GET",
        headers: {
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
                <NavBar />
                <div className='careersSectionText'>
                    <h1>Join Our <span style={{ color: "#28B896" }}>Team</span></h1>
                    <p>At <b>Global Robotics AI</b>, we believe our people are the driving force behind our success. We are on a mission to revolutionize the future through robotics, AI, and education — and we’re always looking for passionate, curious, and committed individuals to join our journey.</p>
                    <div className='careersBt'><b>Home &gt;&gt; <span style={{ color: "#28B896" }}>Careers</span></b></div>
                </div>
                <img className='robo' src={ServicesRobo} />
            </div>

            {/* Why Work With Us */}
              <div className="block">
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
            </div>

            {/* Open Positions */}
              <div className="block">
            <div className="CareersOpenPositionSection">
              <h1>Open <span style={{ color: "#28B896" }}>Positions</span></h1>
              <h2>📌 We’re currently hiring for the following roles:</h2>

          {error && <p style={{color: 'red',textAlign:'center' }}>{error}</p>}
               <div className="UnknownCareerCardSection">
          {jobs.length === 0 && !error ? (
            <p><span style={{textAlign:'center'}}>Loading or no job positions available.</span></p>
          ) : (
            <div className="UnknownCareerCard" >
            {jobs.map((job) => (
                <div className="CareerCard" key={job.id}>
                  <div className="UnknownCareerCardText">
                    <h3>{job.title}</h3>
                    <div className="job-description">
                    <p>{job.description}</p>
                    <h5><a href="/login">Login for Apply</a></h5>
                    </div>
                  </div>
                </div>
            ))}
              </div>
          )}
        </div>

            </div>
            </div>
            <Footer/>
    </div>
  )
}
