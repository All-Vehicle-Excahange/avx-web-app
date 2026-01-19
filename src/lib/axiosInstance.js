"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 AND we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop

      try {
        console.log("🔄 Token expired. Attempting refresh...");

        const user = useAuthStore.getState().user;

        const res = await axiosInstance.post("/auth/refresh", {
          refreshToken: user?.refreshToken,
        });

        if (res.data?.data && res.data.data?.accessToken) {
          useAuthStore
            .getState()
            .login(res.data.data, res.data.data.accessToken);
        }

        console.log("✅ Token refreshed. Retrying original request...");

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("❌ Refresh failed. Logging out...");
        useAuthStore.getState().logout();

        if (typeof window !== "undefined") {
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const handleResponse = (response) => {
  const api = response.data;

  return {
    success: !api.error,
    message: api.message,
    data: api.data,
    pagination: api.pageResponse || null,
    status: api.status,
    statusCode: api.statusCode,
    timestamp: api.timestamp,
  };
};

export const handleError = (error) => {
  const api = error?.response?.data;

  return {
    success: false,
    message: api?.message || "Something went wrong",
    data: api?.data || null,
    pagination: null,
    status: api?.status || "ERROR",
    statusCode: api?.statusCode || 500,
  };
};

export const showBackendError = (error) => {
  const api = error?.response?.data;

  if (!api) {
    toast.error("Something went wrong");
    return;
  }

  // If validation errors exist
  if (api?.data?.validationErrors) {
    const errors = api.data.validationErrors;

    // Show first error
    const firstMessage = Object.values(errors)[0];
    toast.error(firstMessage);
    return;
  }

  // Normal message
  toast.error(api?.message || "Request failed");
};

export default axiosInstance;
