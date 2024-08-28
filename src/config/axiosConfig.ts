import axios, { AxiosInstance } from "axios";
import { refreshTokenAxiosIntercepter } from "./intercepters/refreshTokenInterceptor";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

refreshTokenAxiosIntercepter(Api);

export default Api;
