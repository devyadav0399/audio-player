import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";
import "./Logout.css";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthorizationHeader();
    axiosInstance
      .post("/logout")
      .then(() => {
        logout();
        navigate("/login");
        console.info("Logged out successfully.");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <button type="button" className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
