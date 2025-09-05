import axios from "axios";

const API = axios.create({
  baseURL: "https://resume-analyzer-2-5m13.onrender.com",
});

export default API;
