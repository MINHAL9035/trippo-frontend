import Api from "@/config/axiosConfig";
import adminEndpoints from "@/endpoints/adminEndpoints";
import { IUser } from "@/interface/user/IUser.interface";
import { loginInterface } from "@/interface/user/login";
import axios, { AxiosResponse } from "axios";

export const adminLogin = async (
  adminCredentials: loginInterface
): Promise<AxiosResponse<loginInterface>> => {
  try {
    const response = await Api.post(adminEndpoints.login, adminCredentials);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred during sign up");
    }
  }
};
export const getUsers = async (
  page: number
): Promise<AxiosResponse<{ users: IUser[]; totalPages: number }>> => {
  try {
    const response = await Api.get(adminEndpoints.getUsers, {
      params: { page: page },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred while fetching users");
    }
  }
};

export const updateUserStatus = async (
  userIds: string[],
  action: "block" | "unblock"
) => {
  const response = await Api.patch(adminEndpoints.changeStatus, {
    userIds,
    action,
  });
  return response.data;
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
