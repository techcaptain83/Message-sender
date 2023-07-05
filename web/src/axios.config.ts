import axios from "axios";

const DEV_URL = "http://localhost:8000";
const PROD_URL = "https://chatmaid.onrender.com"
const axiosInstance = axios.create({
    baseURL: DEV_URL
});

export default axiosInstance;
