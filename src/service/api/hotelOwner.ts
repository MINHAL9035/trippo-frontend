import Api from "@/config/axiosConfig";
import hotelEndpoints from "@/endpoints/hotelEndpoints";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import { Owner } from "@/interface/owner/IOwner.interface";
import { loginInterface } from "@/interface/user/login";
import apiHandler from "@/utils/apiHandler";
import { AxiosResponse } from "axios";

export const hotelSentOtp = async (email: string) => {
  try {
    const response = await Api.post(hotelEndpoints.sendOtp, { email });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const hotelVerifyOtp = async (otp: number, email: string) => {
  try {
    const response = await Api.post(hotelEndpoints.verifyOtp, {
      otp,
      email,
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getOwnerDetails = async (email: string) => {
  try {
    const response = await Api.get(hotelEndpoints.getOwnerDetails, {
      params: { email },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const updateOwner = async (ownerDetails: Owner) => {
  try {
    const response = await Api.patch(hotelEndpoints.updateOwner, ownerDetails);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const ownerLogin = async (ownerDetails: loginInterface) => {
  try {
    const response = await Api.post(hotelEndpoints.loginOwner, ownerDetails);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const ownerLoggedOut = async (): Promise<
  AxiosResponse<unknown> | undefined
> => {
  try {
    const response = await Api.post(hotelEndpoints.ownerLogout);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getOwnerHotels = async (
  ownerId: string
): Promise<AxiosResponse<HotelInterface[]>> => {
  try {
    const response = await Api.get(hotelEndpoints.getOwnerHotels, {
      params: { ownerId },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getDashboardDetails = async (ownerId: string) => {
  try {
    const response = await Api.get(hotelEndpoints.getOwnerDashboard, {
      params: { ownerId },
    });
    return response;
  } catch (error) {
    apiHandler(error);
  }
};
