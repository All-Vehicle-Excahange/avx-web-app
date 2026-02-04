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

export const axiosNodeInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API_URL,
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

let refreshAttempts = 0;

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const { user, isLoggedIn } = useAuthStore.getState();

      if (!isLoggedIn || !user?.refreshToken) {
        return Promise.reject(error);
      }

      if (refreshAttempts >= 2) {
        console.log("❌ Refresh limit reached. Logging out...");

        useAuthStore.getState().logout();
        useAuthStore.getState().openLoginPopup();

        if (typeof window !== "undefined") {
          window.location.href = "/";
        }

        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        refreshAttempts++;

        try {
          console.log(
            `🔄 Token expired. Refresh attempt ${refreshAttempts}...`,
          );

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
              refreshToken: user.refreshToken,
            },
            { withCredentials: true },
          );

          if (res.data?.data?.accessToken) {
            useAuthStore
              .getState()
              .login(res.data.data, res.data.data.accessToken);
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.log("❌ Refresh failed. Logging out...");

          useAuthStore.getState().logout();

          return Promise.reject(refreshError);
        }
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
