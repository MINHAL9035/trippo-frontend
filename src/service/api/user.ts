import Api from "@/config/axiosConfig";
import userEndpoints from "@/endpoints/userEndpoints";
import { loginInterface } from "@/interface/user/login";
import { signupInterface } from "@/interface/user/registerInterface";
import { SignUpResponse } from "@/interface/user/registerResponseInterface";
import apiHandler from "@/utils/apiHandler";
import { TokenResponse } from "@react-oauth/google";
import { AxiosResponse } from "axios";
interface loginResponse {
  email: string;
  image: string;
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
): Promise<AxiosResponse<SignUpResponse>> => {
  try {
    const response = await Api.post(userEndpoints.signUp, userData);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
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
): Promise<AxiosResponse<SignUpResponse> | undefined> => {
  try {
    const response = await Api.post(userEndpoints.verifyOtp, { email, otp });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const resendOtp = async (
  email: string
): Promise<AxiosResponse<void> | undefined> => {
  try {
    const response = await Api.post(userEndpoints.resendOtp, { email });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const login = async (
  userCredentials: loginInterface
): Promise<AxiosResponse<loginResponse> | undefined> => {
  try {
    const response = await Api.post(userEndpoints.login, userCredentials);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const logout = async (): Promise<AxiosResponse<unknown> | undefined> => {
  try {
    const response = await Api.post(userEndpoints.logout);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const googleLogin = async (data: TokenResponse) => {
  try {
    const response = await Api.post(userEndpoints.googleLogin, data);
    return response.data;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const userDetails = async (email: string) => {
  try {
    const response = await Api.get(userEndpoints.getUserDetails, {
      params: { email },
    });
    console.log("dagfda", response);

    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};
