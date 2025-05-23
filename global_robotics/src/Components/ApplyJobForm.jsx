import React, { useState } from 'react';
import '../Styles/ApplyJobForm.css';
import Base_URL from '../Config';

export default function ApplyJobForm({ job, onClose }) {
    const token = sessionStorage.getItem("token");
    console.log("ApplyJobForm opened for:", job.title);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        resume: null
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);  // Loading state

    const handleChange = (e) => {
        if (e.target.name === "resume") {
            setFormData({ ...formData, resume: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.resume) {
            alert("Please upload a resume (PDF only).");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("mobile", formData.mobile);
        data.append("jobTitle", job.title);
        data.append("resume", formData.resume);

        setIsSubmitting(true);  // Start loading

        try {
            const response = await fetch(`${Base_URL}user/applyjob`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data
            });

            if (response.ok) {
                setMessage("Application submitted successfully!");
            } else {
                const text = await response.text();
                setMessage("Failed to submit application: " + text);
            }
        } catch (err) {
            console.error("Error submitting application:", err);
            setMessage("Something went wrong.");
        } finally {
            setIsSubmitting(false);  // Stop loading once submission is done
        }
    };

    return (
        <div className="applyFormSection">
            <div className="applySectionFields">
                <h2>Apply for {job.title}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input name="name" type="text" required onChange={handleChange} /><br />
                    <label>Email:</label>
                    <input name="email" type="email" required onChange={handleChange} /><br />
                    <label>Mobile:</label>
                    <input name="mobile" type="tel" required onChange={handleChange} /><br />
                    <label>Resume (PDF):</label>
                    <input name="resume" type="file" accept="application/pdf" required onChange={handleChange} /><br />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Apply Now"}
                    </button>
                    {isSubmitting && <div className="loadingSpinner"></div>}  {/* Loading Spinner */}
                    {message && <p className="message">{message}</p>}
                </form>
                <button className="closeBtn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
