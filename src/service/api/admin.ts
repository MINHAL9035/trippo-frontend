import Api from "@/config/axiosConfig";
import adminEndpoints from "@/endpoints/adminEndpoints";
import { loginInterface } from "@/interface/user/login";
import axios, { AxiosResponse } from "axios";

export const adminLogin = async (
  adminCredentials: loginInterface
): Promise<AxiosResponse<loginInterface> | undefined> => {
  try {
    const response = await Api.post(adminEndpoints.login, adminCredentials);
    console.log(response);
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
export const adminLogout = async (): Promise<
  AxiosResponse<unknown> | undefined
> => {
  try {
    const response = await Api.post(adminEndpoints.logout);
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
