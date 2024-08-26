import axios, { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// interface QueueItem {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: unknown) => void;
// }

// let isRefreshing = false;
// let failedQueue: QueueItem[] = [];

// const processQueue = (
//   error: AxiosError | null,
//   token: string | null = null
// ) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// Api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise<unknown>((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => {
//           return Api(originalRequest);
//         });
//       }

//       isRefreshing = true;

//       return Api.post("/auth/refresh")
//         .then(({ data }) => {
//           processQueue(null, data.accessToken);
//           return Api(originalRequest);
//         })
//         .catch((err: AxiosError) => {
//           processQueue(err, null);
//           return Promise.reject(err);
//         })
//         .finally(() => {
//           isRefreshing = false;
//         });
//     }
//     return Promise.reject(error);
//   }
// );

export default Api;
