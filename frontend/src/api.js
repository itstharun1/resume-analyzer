import axios from "axios";

const API = axios.create({
  baseURL: "https://resume-analyzer-4-uazd.onrender.com",
});

export default API;
