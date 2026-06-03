import axios from "axios";

const api = axios.create({
  baseURL: "https://heartbroken-mattie-cuter.ngrok-free.dev",
});

export default api;