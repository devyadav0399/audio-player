import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { storeToken } from "../utils/tokenStorage";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/audio-files");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/login", { username, password })
      .then((response) => {
        storeToken(response.data.access_token);
        login();
        navigate("/audio-files");
        console.info("Logged in successfully.");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button> {/* Submit button for the form */}
      </form>
    </div>
  );
};

export default Login;
