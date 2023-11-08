import _ from "axios";

const DEV_URL = "http://localhost:8000";
const PROD_URL = "https://chatmaid.onrender.com"
const axios = _.create({
    baseURL: process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL,
});

export default axios;
