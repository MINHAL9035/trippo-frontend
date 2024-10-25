import Api from "@/config/axiosConfig";
import userEndpoints from "@/endpoints/userEndpoints";
import apiHandler from "@/utils/apiHandler";

export const userDetails = async (email: string) => {
  try {
    const response = await Api.get(userEndpoints.getUserDetails, {
      params: { email },
    });

    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const editProfile = async (formData: FormData) => {
  try {
    const response = await Api.patch(userEndpoints.editProfile, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("my es", response.data);

    return response.data;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getUserBookings = async () => {
  try {
    const response = await Api.get(userEndpoints.userBookings);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};
export const getUserCancelledBookings = async () => {
  try {
    const response = await Api.get(userEndpoints.cancelledBookings);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const cancelBooking = async (bookingId: string) => {
  try {
    const response = await Api.post(userEndpoints.cancelBooking, { bookingId });
    return response;
  } catch (error) {
    apiHandler(error);
  }
};

export const getUserWallet = async (userId: string) => {
  try {
    const response = await Api.get(userEndpoints.userWallet, {
      params: { userId },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};
