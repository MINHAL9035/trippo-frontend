import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

interface ErrorResponse {
  message: {
    message: string;
    error: string;
    statusCode: number;
  };
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const refreshTokenAxiosIntercepter = (Api: AxiosInstance) => {
  Api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const errorData = error.response?.data as ErrorResponse;
      const errorMessage = errorData?.message;

      if (errorMessage?.message === "User Token Not Found") {
        localStorage.removeItem("userInfo");
        window.location.href = "/";
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log("sfs", errorMessage);

        let refreshPath: string | undefined;
        let userInfoKey: string | undefined;
        console.log("welocme");

        if (errorMessage?.message === "User Token expired") {
          console.log("hi");

          refreshPath = "/auth/refresh";
          userInfoKey = "userInfo";
        } else if (errorMessage?.message === "Refresh Token is Invalid!") {
          localStorage.removeItem("userInfo");
          window.location.href = "/";
        } else {
          console.log("returnered");

          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return Api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;
        try {
          if (refreshPath) {
            const refreshResponse = await Api.post(refreshPath);
            console.log("refreshResponse", refreshResponse);

            processQueue(null);

            return Api(originalRequest);
          } else {
            throw new Error("Refresh path is undefined");
          }
        } catch (refreshError) {
          console.log("hello");

          processQueue(refreshError, null);
          // Clear user info
          if (userInfoKey) {
            localStorage.removeItem(userInfoKey);
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};