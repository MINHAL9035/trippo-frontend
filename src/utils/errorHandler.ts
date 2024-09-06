import { message } from "antd";
import { AxiosError } from "axios";

const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      message.error(`${errorMessage.message}`);
    } else if (error.request) {
      message.error("No response from server. Please try again later.");
    } else {
      message.error("An unexpected error occurred. Please try again.");
    }
  } else {
    message.error("An unexpected error occurred. Please try again.");
  }
};

export default handleError;
