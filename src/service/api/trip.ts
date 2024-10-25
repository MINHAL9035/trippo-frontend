import apiHandler from "@/utils/apiHandler";
import axios from "axios";
import { Feature, MapboxResponse, Place } from "../interface/ITripApi";
import Api from "@/config/axiosConfig";
import tripEndpoints from "@/endpoints/tripEndpoints";

const access_token = import.meta.env.VITE_MAPBOX_TOKEN;

export const getPlaces = async (query: string): Promise<Place[]> => {
  try {
    const response = await axios.get<MapboxResponse>(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&proximity=ip&types=country%2Cdistrict%2Cplace&language=en&autocomplete=true&access_token=${access_token}`
    );
    const responseData = response.data.features;
    const data: Place[] = responseData.map(
      (place: Feature): Place => ({
        id: place.id,
        name: place.properties.name,
        place_formatted: place.properties.place_formatted,
      })
    );
    return data;
  } catch (error) {
    apiHandler(error);
    return [];
  }
};

export const createTrip = async (formData: FormData) => {
  try {
    const response = await Api.post(tripEndpoints.createTrip, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    apiHandler(error);
  }
};

export const getTripDetails = async (
  userId: string,
  page: number = 1,
  limit: number = 5
) => {
  try {
    const response = await Api.get(tripEndpoints.getTripDetails, {
      params: { userId, page, limit },
    });
    return response;
  } catch (error) {
    apiHandler(error);
  }
};

export const createAiTrip = async (tripData: unknown) => {
  console.log("my api tripData", tripData);
  try {
    const response = await Api.post(tripEndpoints.createAiTrip, tripData);
    return response;
  } catch (error) {
    apiHandler(error);
  }
};

export const getAiCreatedTrip = async (tripId: string | undefined) => {
  console.log("tripId", tripId);

  try {
    const response = await Api.get(tripEndpoints.getAitrip, {
      params: { tripId },
    });
    return response;
  } catch (error) {
    apiHandler(error);
  }
};
