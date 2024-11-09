import axios from "axios";
import { Bounds, IExplorePlaces } from "@/interface/user/explore.interface";
import Api from "@/config/axiosConfig";
import tripEndpoints from "@/endpoints/tripEndpoints";

const isValidPlace = (place: IExplorePlaces) => {
  return Boolean(
    place.name?.trim() &&
      place.photo?.images?.medium?.url &&
      (place.address || place.distance_string)
  );
};

export const getPlacesData = async (type: string, bond: Bounds | null) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bond?.sw.lat,
          tr_latitude: bond?.ne.lat,
          bl_longitude: bond?.sw.lng,
          tr_longitude: bond?.ne.lng,
        },

        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return (data || [])
      .filter(isValidPlace)
      .sort(
        (a: { rating: string }, b: { rating: string }) =>
          Number(b.rating || 0) - Number(a.rating || 0)
      );
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

export const getMyTrips = async () => {
  try {
    const response = await Api.get(tripEndpoints.getMyTrips);
    return response;
  } catch (error) {
    throw new Error();
  }
};

export const savePlaceToTrip = async (
  tripId: string,
  place: IExplorePlaces
) => {
  try {
    const response = await Api.post(tripEndpoints.createTripPlaces, {
      tripId,
      placeData: {
      name: place.name,
      longitude: place.longitude,
      latitude: place.latitude,
      price: place.price,
      photo: place.photo,
      rating: place.rating,
      num_reviews: place.num_reviews,
      address: place.address,
      phone: place.phone,
      distance_string: place.distance_string,
    },
    });
    return response;
  } catch (error) {
    throw new Error();
  }
};
