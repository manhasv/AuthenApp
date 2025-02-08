import axios from "axios";

// Base API client
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api", // Replace with your backend URL
  withCredentials: true, // Include cookies for authentication
});

export const signup = async (userData: any) => {
  const response = await apiClient.post("/auth/signup", userData);
  return response.data;
};

export const login = async (credentials: any) => {
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

// Fetch the current user's profile
export const fetchProfile = async (email: any) => {
  const response = await apiClient.get("/user", {
    params: { email },
    withCredentials: true,
  });
  return response.data.user;
};

// Update the user's profile
export const updateProfile = async (profileData: any) => {
  const response = await apiClient.put("/user", profileData);
  return response.data;
};

// Delete the user's account
export const deleteProfile = async () => {
  const response = await apiClient.delete("/user");
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await apiClient.get("/user/");
  return response.data;
};

export const fetchUserWithID = async (id: any) => {
  const response = await apiClient.get(`/user/fetch/${id}`);
  return response.data;
};

export const deleteUserWithID = async (id: any) => {
  const response = await apiClient.delete(`/user/${id}`);
  return response.data;
}

export const updateUserWithID = async (id: any, userData: any) => {
  const response = await apiClient.put(`/user/${id}`, userData);
  return response.data;
}

export const fetchAllAppointments = async () => {
  const response = await apiClient.get("/appointment/fetch");
  return response.data;
}

export const fetchAppointmentWithID = async (id: any) => {
  const response = await apiClient.get(`/appointment/${id}`);
  return response.data;
}

export const deleteAppointment = async (id: any) => {
  const response = await apiClient.delete(`/appointment/${id}`);
  return response.data;
}
export const updateAppointment = async (id: any, appointmentData: any) => {
  const response = await apiClient.put(`/appointment/${id}`, appointmentData);
  return response.data;
}