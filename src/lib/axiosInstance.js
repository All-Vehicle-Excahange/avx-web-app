import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIwM2M0ZTFhZC1mYTY2LTRlZjctYjhmMi03MWMwM2Q4YzliMzgiLCJyb2xlIjoiVVNFUl9TRUxMRVJfQVBQTElDQU5UIiwidHlwZSI6IkFDQ0VTUyIsImlhdCI6MTc2NzkzNTU2MywiZXhwIjoxNzcwNTI3NTYzfQ.jMMv3nxFe2asfE7UuxtCq0DcssnRWsqfGZcXIGW7e7uF8wIS9vdDfPKUgU8wxaDq";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
