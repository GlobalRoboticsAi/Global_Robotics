import React from 'react'
import NavBar from './NavBar'
import CoursesPng from '../Images/Courses.png'
import '../Styles/Courses.css'
import Footer from './Footer'
import { useState,useEffect} from 'react'
import Base_URL from '../Config'

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        fetch(`${Base_URL}auth/getallcourses`, {
            method: "GET",
          
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
            fetch(`${Base_URL}auth/course-image/${course.id}`, {
                method: "GET",
            })
                .then(res => res.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setImageUrls(prev => ({ ...prev, [course.id]: imageUrl }));
                })
                .catch(err => console.error(`Error loading image for course ${course.id}:`, err));
        });
    };



    return (
        <>
            <div className="coursesSection">
                <NavBar/>
                <div className='coursesSectionText'>
                    <h1>Our <span style={{ color: "#28B896" }}>Courses</span></h1>
                    <p>At Global Robotics AI, our courses are designed to equip learners with cutting-edge skills in robotics, AI, and automation. Whether you're a beginner or a professional, our hands-on programs foster innovation, creativity, and real-world problem-solving. Start your learning journey with us and shape the future today.</p>
                    <div className='coursesBt'><b>Home &gt;&gt; <span style={{ color: "#28B896" }}>Courses</span></b></div>
                </div>
                <img className='robo' src={CoursesPng} />
            </div>
            <div className="block">
            <div className="CareersOpenPositionSection">
                <div className="ourCoursesSectionText">
                    <h1>Our <span style={{ color: "#28B896" }}>Courses</span></h1>
                    <h2>📌 We’re currently offering the following courses:</h2>
                </div>


                <div className="ourCoursesCardSection">
                    {error && <p style={{ color: 'red',textAlign:'center' }}>{error}</p>}
                    {courses.length === 0 && !error ? (
                        <p><span style={{textAlign:"center"}}>Loading or no courses available.</span></p>
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
                                         <h5><a href="/login">Login to Get Admission</a></h5>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </div>
            </div>
            <Footer />
        </>
    )
}
