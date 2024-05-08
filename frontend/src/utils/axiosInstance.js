import axios from "axios";
import { getToken } from "./tokenStorage";

// Create an Axios instance with a base URL
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";
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

export { axiosInstance, setAuthorizationHeader };
