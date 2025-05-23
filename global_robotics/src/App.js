import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Services from './Components/Services';
import Careers from './Components/Careers';
import Contact from './Components/Contact';
import Courses from './Components/Courses';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminHome from './Components/AdminHome';
import AdminCareer from './Components/AdminCareer';
import ProtectRoute from './Components/ProtectRoute';  // Updated import
import UserHome from './Components/UserHome';
import NewJobForm from './Components/NewJobForm';
import EditJobForm from './Components/EditJobForm';
import UserCareers from './Components/UserCareers';
import ForgotPasswordForm from './Components/ForgotPasswordForm';
import AdminCourses from './Components/AdminCourses';
import NewCourseForm from './Components/NewCourseForm';
import UserCourses from './Components/UserCourses';
import AdminMedia from './Components/AdminMedia';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPasswordForm />} />

          {/* User Pages */}
          <Route path="/userHome" element={<ProtectRoute roleRequired="ROLE_USER"><UserHome /></ProtectRoute>} />
          <Route path="/userCareer" element={<ProtectRoute roleRequired="ROLE_USER"><UserCareers /></ProtectRoute>} />
          <Route path="/userCourses" element={<ProtectRoute roleRequired="ROLE_USER"><UserCourses /></ProtectRoute>} />

          {/* Admin Pages */}
          <Route path="/addnewjob" element={<ProtectRoute roleRequired="ROLE_ADMIN"><NewJobForm /></ProtectRoute>} />
          <Route path="/editjob/:id" element={<ProtectRoute roleRequired="ROLE_ADMIN"><EditJobForm /></ProtectRoute>} />
          <Route path="/adminHome" element={<ProtectRoute roleRequired="ROLE_ADMIN"><AdminHome /></ProtectRoute>} />
          <Route path="/adminCareer" element={<ProtectRoute roleRequired="ROLE_ADMIN"><AdminCareer /></ProtectRoute>} />
          <Route path="/adminCourses" element={<ProtectRoute roleRequired="ROLE_ADMIN"><AdminCourses /></ProtectRoute>} />
          <Route path="/addnewcourse" element={<ProtectRoute roleRequired="ROLE_ADMIN"><NewCourseForm /></ProtectRoute>} />
          <Route path="/adminMedia" element={<ProtectRoute roleRequired="ROLE_ADMIN"><AdminMedia /></ProtectRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
