import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080",
  //baseURL: "https://vectorjobsapi-uce2gnnn.b4a.run/",
  baseURL: "https://vectorjobs.onrender.com/",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
