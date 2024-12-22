import axios from "axios";

// Base API client
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api", // Replace with your backend URL
  withCredentials: true, // Include cookies for authentication
});

export const signup = async (userData:any) => {
  const response = await apiClient.post("/auth/signup", userData);
  return response.data;
};

export const login = async (credentials:any) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const checkAuth = async () => {
  const response = await apiClient.get("/auth/check-auth");
  return response.data;
};
