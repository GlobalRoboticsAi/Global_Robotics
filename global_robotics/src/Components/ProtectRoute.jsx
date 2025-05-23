import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children, roleRequired }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");  // Assuming role is saved in sessionStorage
  console.log(role);
  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    // If the user role doesn't match the required role, redirect to a general page or access denied page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRoute;
