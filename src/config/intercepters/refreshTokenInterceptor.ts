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

      // Handle specific token not found cases
      if (
        errorMessage?.message === "User Token Not Found" ||
        errorMessage?.message === "Admin Token Not Found"
      ) {
        // Clear local storage and redirect to login
        if (errorMessage?.message === "User Token Not Found") {
          localStorage.removeItem("userInfo");
          window.location.href = "/login";
        } else if (errorMessage?.message === "Admin Token Not Found") {
          localStorage.removeItem("adminInfo");
          window.location.href = "/admin/";
        }
        return Promise.reject(error);
      }

      // Handle token expired cases
      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log("Interceptor triggered for 401 - token expired");

        let refreshPath: string | undefined;
        let userInfoKey: string | undefined;

        if (errorMessage?.message === "User Token expired") {
          refreshPath = "/auth/refresh";
          userInfoKey = "userInfo";
        } else if (errorMessage?.message === "Admin Token expired") {
          refreshPath = "/admin/refresh";
          userInfoKey = "adminInfo";
        }

        if (refreshPath === undefined) {
          return Promise.reject(new Error("Refresh path is undefined"));
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
