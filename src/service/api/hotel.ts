import Api from "@/config/axiosConfig";
import hotelEndpoints from "@/endpoints/hotelEndpoints";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import { HotelAndOwnerInterface } from "@/interface/owner/IHotelAndOwner.interface";
import apiHandler from "@/utils/apiHandler";
import { AxiosResponse } from "axios";
import { submitDetailsInterface } from "../../interface/owner/IHotelAndOwner.interface";

export const createHotel = async (
  hotelDetails: HotelInterface,
  ownerEmail: string
): Promise<AxiosResponse<HotelInterface>> => {
  try {
    const response = await Api.post(hotelEndpoints.createHotel, {
      ...hotelDetails,
      ownerEmail,
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getHotelDetails = async (
  email: string
): Promise<AxiosResponse<HotelInterface>> => {
  try {
    const response = await Api.get(hotelEndpoints.getHotelDetails, {
      params: { email },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const updateHotel = async (
  hotelDetails: HotelInterface,
  hotelId: string
): Promise<AxiosResponse<HotelInterface>> => {
  try {
    const response = await Api.patch(hotelEndpoints.updateHotel, hotelDetails, {
      params: { hotelId },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getFullDetails = async (
  hotelId: string
): Promise<AxiosResponse<HotelAndOwnerInterface>> => {
  try {
    const response = await Api.get(hotelEndpoints.getFullDetails, {
      params: { hotelId },
    });
    console.log("my details response", response.data);

    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const submitDetails = async (details: submitDetailsInterface) => {
  try {
    const response = await Api.post(hotelEndpoints.submitDetails, details);
    return response;
  } catch (error) {
    apiHandler(Error);
    return Promise.reject();
  }
};

export const fetchHotelDetails = async (hotelId: string) => {
  try {
    const response = await Api.get(hotelEndpoints.hotelDetails, {
      params: { hotelId },
    });

    return response;
  } catch (error) {
    apiHandler(Error);
    return Promise.reject();
  }
};

export const editHotel = async (
  hotelDetails: HotelInterface,
  hotelId: string
) => {
  try {
    const response = await Api.patch(
      `${hotelEndpoints.editHotel}?hotelId=${hotelId}`,
      hotelDetails
    );
    return response;
  } catch (error) {
    apiHandler(Error);
    return Promise.reject();
  }
};

export const editHotelInformation = async (
  formData: FormData,
  hotelId: string
) => {
  formData.forEach((values) => {
    console.log("sdvgs", values);
  });

  try {
    const response = await Api.patch(
      `${hotelEndpoints.editHotelInformation}?hotelId=${hotelId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    apiHandler(Error);
    return Promise.reject();
  }
};

export const getFullHotelDetails = async (hotelId: string) => {
  try {
    const response = await Api.get(hotelEndpoints.getFullHotelDetails, {
      params: { hotelId },
    });
    return response;
  } catch (error) {
    apiHandler(Error);
    return Promise.reject();
  }
};
