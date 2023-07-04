import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://chatmaid.onrender.com",
});

export default axiosInstance;
