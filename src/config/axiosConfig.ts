import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("url", BASE_URL);

const Api = axios.create({
  baseURL: BASE_URL,
});

export default Api;
