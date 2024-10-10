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
    console.log("res", response);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};
