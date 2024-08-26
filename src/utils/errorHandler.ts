import { AxiosError } from "axios";
import { toast } from "sonner";

const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(`${errorMessage.message}`);
    } else if (error.request) {
      toast.error("No response from server. Please try again later.");
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  } else {
    toast.error("An unexpected error occurred. Please try again.");
  }
};

export default handleError;
