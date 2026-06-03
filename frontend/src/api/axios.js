import axios from "axios";

const api = axios.create({
  baseURL: "https://portal-project-kb2y.onrender.com",
});

export default api;
