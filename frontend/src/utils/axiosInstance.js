import axios from "axios";
import { getToken, removeToken } from "./tokenStorage";

// Create an Axios instance with a base URL
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:5000";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Set the authorization header with a valid token
const setAuthorizationHeader = () => {
  const token = getToken();
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Response interceptor to catch 401 errors and remove the token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("401 error: Removing access token from sessionStorage");
      removeToken();
    }

    return Promise.reject(error);
  }
);

export { axiosInstance, setAuthorizationHeader };
