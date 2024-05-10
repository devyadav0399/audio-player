import { useState, useEffect, useRef } from "react";
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
  const toastRef = useRef(null);

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
        if (toastRef.current) {
          const toastElement = new window.bootstrap.Toast(toastRef.current);
          toastElement.show();
        }
        setUsername("");
        setPassword("");
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
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-describedby="usernameHelp"
                id="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 11 }}
      >
        <div
          className="toast"
          ref={toastRef}
          data-autohide="true"
          data-delay="3000"
          style={{ borderColor: "red", borderWidth: "2px" }}
        >
          <div className="toast-header">
            <strong className="me-auto">Login Error</strong>
          </div>
          <div className="toast-body">
            Invalid credentials. Please try again.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
