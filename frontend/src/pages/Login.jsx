import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { storeToken } from "../utils/tokenStorage";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/login", { username, password })
      .then((response) => {
        storeToken(response.data.access_token);
        login();
        navigate("/");
        console.info("Logged in successfully.");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-title">
          <span>Login</span>
        </div>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required // Make the field required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Make the field required
            />
            <button type="submit">Login</button>{" "}
            {/* Submit button for the form */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
