import axios from "axios";

const DEFAULT_API_URL = "http://localhost:5000/api";
const apiBaseURL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
