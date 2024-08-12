import Api from "@/config/axiosConfig";
import userEndpoints from "@/endpoints/userEndpoints";
import { loginInterface } from "@/interface/user/login";
import { signupInterface } from "@/interface/user/registerInterface";
import { SignUpResponse } from "@/interface/user/registerResponseInterface";
import axios, { AxiosResponse } from "axios";
interface loginResponse {
  email: string;
}

/**
 * Sends user sign up data to the server and returns the response.
 *
 * @param userData - User data for sign up.
 * @returns The user data received from the server with passwords included.
 * @throws Error if the sign up request fails.
 */
export const signUp = async (
  userData: signupInterface
): Promise<signupInterface> => {
  try {
    const response = await Api.post<SignUpResponse>(
      userEndpoints.signUp,
      userData
    );
    const userResponse: signupInterface = {
      ...response.data.user,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    };
    return userResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred during sign up");
    }
  }
};

/**
 * Sends OTP verification data to the server.
 *
 * @param email - The user's email address.
 * @param otp - The OTP to verify.
 * @returns void
 * @throws Error if the OTP verification request fails.
 */
export const verifyOtp = async (
  email: string,
  otp: number
): Promise<AxiosResponse<void> | undefined> => {
  try {
    await Api.post(userEndpoints.verifyOtp, { email, otp });
    console.log("my otp", otp);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};

export const resendOtp = async (
  email: string
): Promise<AxiosResponse<void> | undefined> => {
  try {
    await Api.post(userEndpoints.resendOtp, { email });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};

export const login = async (
  userCredentials: loginInterface
): Promise<AxiosResponse<loginResponse> | undefined> => {
  try {
    const response = await Api.post(userEndpoints.login, userCredentials);
    console.log("my response api", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};

export const logout = async (): Promise<AxiosResponse<unknown> | undefined> => {
  try {
    const response = await Api.post(userEndpoints.logout);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
