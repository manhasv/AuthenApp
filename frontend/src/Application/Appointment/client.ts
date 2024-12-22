import axios from "axios";
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api", // Replace with your backend URL
    withCredentials: true, // Include cookies for authentication
  });
export const fetchAppointments = async (email:any) => {
    const response = await apiClient.get(`/appointment`, {
        params: { email },
        withCredentials: true,
    });
    return response.data.appointments;
};

export const createAppointment = async (appointmentData: any) => {
  const response = await apiClient.post(`/appointment/create`, appointmentData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; // Return the response from the server
};