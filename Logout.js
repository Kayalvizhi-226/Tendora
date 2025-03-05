import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Clear user session
    navigate("/login"); // Redirect to login page after logout
  }, [logout, navigate]);

  return <p>Logging out...</p>; // Optional UI feedback
};

export default Logout;
