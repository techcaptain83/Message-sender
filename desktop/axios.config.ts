import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

const DEV_URL = "http://localhost:8000";
const PROD_URL = "https://chatmaid.onrender.com"
const axiosInstance = axios.create({
    // baseURL: isDev ? DEV_URL : PROD_URL,
    baseURL: PROD_URL,
});

export default axiosInstance;
