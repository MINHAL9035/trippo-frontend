import Api from "@/config/axiosConfig";
import adminEndpoints from "@/endpoints/adminEndpoints";
import { IUser } from "@/interface/user/IUser.interface";
import { loginInterface } from "@/interface/user/login";
import apiHandler from "@/utils/apiHandler";
import { AxiosResponse } from "axios";

export const adminLogin = async (
  adminCredentials: loginInterface
): Promise<AxiosResponse<loginInterface>> => {
  try {
    const response = await Api.post(adminEndpoints.login, adminCredentials);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};
export const getUsers = async (): Promise<
  AxiosResponse<{ users: IUser[] }>
> => {
  try {
    const response = await Api.get(adminEndpoints.getUsers);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};
export const getRequest = async () => {
  try {
    const response = await Api.get(adminEndpoints.getRequests);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
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
    apiHandler(error);
    return Promise.reject();
  }
};

export const updateOwnerStatus = async (
  ownerId: string,
  action: "accepted" | "rejected"
) => {
  try {
    const response = await Api.patch(
      `${adminEndpoints.updateOwnerStatus}?ownerId=${ownerId}&action=${action}`
    );
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getOwners = async () => {
  try {
    const response = await Api.get(adminEndpoints.getOwners);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};
