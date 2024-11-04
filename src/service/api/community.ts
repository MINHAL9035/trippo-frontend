import Api from "@/config/axiosConfig";
import communityEndpoints from "@/endpoints/communityEndpoints";
import socketEndpoints from "@/endpoints/socketEndpoints";
import apiHandler from "@/utils/apiHandler";

export const createPost = async (formData: FormData) => {
  try {
    const response = await Api.post(communityEndpoints.createPost, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getPosts = async () => {
  try {
    const response = await Api.get(communityEndpoints.getPosts);
    console.log("mfsjf", response);

    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getAllUsers = async () => {
  try {
    const response = await Api.get(communityEndpoints.getAllUsers);
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getUserPost = async (userId: string) => {
  try {
    const response = await Api.get(communityEndpoints.getUserPost, {
      params: { userId },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const searchUsers = async (query: string) => {
  try {
    const response = await Api.get(communityEndpoints.searchUsers, {
      params: { query },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getSearchedUserDetail = async (userName: string | undefined) => {
  try {
    const response = await Api.get(communityEndpoints.searchUserDetails, {
      params: { userName },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getMessages = async (
  senderId: string,
  receiverId: string | undefined
) => {
  try {
    const response = await Api.get(
      `${communityEndpoints.getMessages}/${senderId}/${receiverId}`
    );
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getUserMessageList = async (userId: string) => {
  console.log("hi",userId);
  
  try {
    const response = await Api.get(socketEndpoints.userMessageList, {
      params: { userId },
    });
    return response;
  } catch (error) {
    apiHandler(error);
    return Promise.reject();
  }
};

export const getNotifications = async (userId: string) => {
  try {
    const response = await Api.get(socketEndpoints.getNofications, {
      params: { userId },
    });
    return response;
  } catch (error) {
    apiHandler(error);
  }
};
