import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    headers:{
        "Content-Type":"Application/json"
    }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response error interceptor to catch and display backend error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details to console for debugging
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.response?.data?.message,
      error: error.message
    });

    // Extract error message from response
    if (error.response?.data?.message) {
      // Backend returned a specific error message - this will be shown by component catch blocks
      console.log("Backend error message to display:", error.response.data.message);
    }

    // If it's an auth error, redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
