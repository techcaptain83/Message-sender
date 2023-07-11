import axios from "axios";

const DEV_URL = "http://localhost:8000";
const PROD_URL = "https://chatmaid.onrender.com"
const axiosInstance = axios.create({
    // baseURL:process.env.NODE_ENV==="development"? DEV_URL:PROD_URL
    baseURL:PROD_URL
});

export default axiosInstance;
