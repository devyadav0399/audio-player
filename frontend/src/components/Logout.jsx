import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthorizationHeader();
    axiosInstance
      .post("/logout")
      .then(() => {
        logout(); // Clear authentication state
        navigate("/login"); // Navigate to the login page
        console.info("Logged out successfully.");
      })
      .catch((error) => {
        console.error("Error during logout:", error); // Handle any errors
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
