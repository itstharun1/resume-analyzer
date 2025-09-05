import axios from "axios";

const API = axios.create({
  baseURL: "https://resume-analyzer-1-7l1f.onrender.com",
});

export default API;
