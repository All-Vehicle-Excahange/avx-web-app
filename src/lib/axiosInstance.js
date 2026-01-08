import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIwM2M0ZTFhZC1mYTY2LTRlZjctYjhmMi03MWMwM2Q4YzliMzgiLCJyb2xlIjoiVVNFUl9TRUxMRVJfQVBQTElDQU5UIiwidHlwZSI6IkFDQ0VTUyIsImlhdCI6MTc2Nzg3MjA3NCwiZXhwIjoxNzY3ODcyOTc0fQ.6iYOwahHiTsqiugETp8asdPm4QP1K1C-nGggD2hPIoHdUci5L6K4owyg8PWUCv9c";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
