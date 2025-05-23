import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import Footer from './Footer';
import '../Styles/Courses.css'
import '../Styles/AdminCourses.css'
import { useNavigate } from 'react-router-dom';
import Base_URL from '../Config';

export default function AdminCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [error, setError] = useState("");
    const token = sessionStorage.getItem("token");
   

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        fetch(`${Base_URL}admin/getallcourses`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch courses");
                return response.json();
            })
            .then(data => {
                setCourses(data);
                fetchImages(data);
            })
            .catch(err => setError("Error fetching courses: " + err.message));
    };

    const fetchImages = (courses) => {
        courses.forEach(course => {
            fetch(`${Base_URL}admin/course-image/${course.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setImageUrls(prev => ({ ...prev, [course.id]: imageUrl }));
                })
                .catch(err => console.error(`Error loading image for course ${course.id}:`, err));
        });
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        fetch(`${Base_URL}admin/delete-course/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text || "Failed to delete course") });
                }
                return response.text();
            })
            .then(msg => {
                alert(msg);
                // Remove deleted course from state so UI updates immediately
                setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
                // Also remove its image URL
                setImageUrls(prevUrls => {
                    const newUrls = { ...prevUrls };
                    delete newUrls[id];
                    return newUrls;
                });
            })
            .catch(err => alert("Error deleting course: " + err.message));
    };


    return (
        <div>
            <div className='AdminHeroSection'>
                <AdminNavBar />
                <div className="AdminHeroSectionText">
                    <h1>Courses <span style={{ color: "#28B896" }}>Section</span></h1>
                </div>
            </div>

            <div className="CareersOpenPositionSection">
                <h1>All <span style={{ color: "#28B896" }}>Courses</span></h1>
                <button className='addNewCourseBtn' onClick={() => navigate('/addnewcourse')}>Add New Course</button>

                <div className="ourCoursesCardSection">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {courses.length === 0 && !error ? (
                        <p>Loading or no courses available.</p>
                    ) : (
                        <div className="CoursesCard">
                            {courses.map(course => (
                                <div className="CourseCard" key={course.id}>
                                    <div className="CourseCardText">
                                         {imageUrls[course.id] ? (
                                            <img
                                                src={imageUrls[course.id]}
                                                alt="Course"
                                                className="CourseCardLogo"
                                            />
                                        ) : (
                                            <p>Loading image...</p>
                                        )}
                                        <h3>{course.title}</h3>
                                        <ul>
                                            {course.description.split('\n').map((line, index) => (
                                                <li key={index}>{line}</li>
                                            ))}
                                        </ul>

                                       
                                        <div style={{ marginTop: '10px',display:"flex",alignItems:"center",justifyContent:"center" }}>
                                            <button style={{ backgroundColor: '#e74c3c', color: 'white',width:"20%",height:"auto" }}  onClick={() => handleDelete(course.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
