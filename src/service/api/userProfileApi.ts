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

export const editUser = async (formData: FormData) => {
  try {
    const response = await Api.post(userEndpoints.editProfile, formData, {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    apiHandler(error);
  }
};
