import { message } from "antd";
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
      const errorMessage = errorData?.message?.message;

      if (error.response?.status === 401) {
        // Handle specific token not found cases
        if (
          errorMessage === "User Token Not Found" ||
          errorMessage === "Admin Token Not Found" ||
          errorMessage === "User is blocked"
        ) {
          // Clear local storage and redirect to login
          if (errorMessage === "User Token Not Found") {
            localStorage.removeItem("userInfo");
            window.location.href = "/login";
          } else if (errorMessage === "User is blocked") {
            message.error(
              "You have been blocked. Contact the website support team."
            );
            localStorage.removeItem("userInfo");
            window.location.href = "/login";
          } else if (errorMessage === "Admin Token Not Found") {
            localStorage.removeItem("adminInfo");
            window.location.href = "/admin/";
          }
          return Promise.reject(error);
        }

        // Handle token expired cases
        if (
          (errorMessage === "User Token expired" ||
            errorMessage === "Admin Token expired") &&
          !originalRequest._retry
        ) {
          console.log("Interceptor triggered for 401 - token expired");

          let refreshPath: string;
          let userInfoKey: string;

          if (errorMessage === "User Token expired") {
            refreshPath = "/auth/refresh";
            userInfoKey = "userInfo";
          } else {
            refreshPath = "/admin/refresh";
            userInfoKey = "adminInfo";
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
            const refreshResponse = await Api.post(refreshPath);
            console.log("Refresh response:", refreshResponse);

            processQueue(null, refreshResponse.data.token);
            return Api(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.removeItem(userInfoKey);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
      }

      return Promise.reject(error);
    }
  );
};