import { isAxiosError } from "axios";

export const getErrorMessage = (error: any) => {
  if (isAxiosError(error) && error.response) {
    if (Array.isArray(error.response.data.error)) {
      return error.response.data.error[0];
    } else {
      return error.response.data.error;
    }
  } else if (error.message) {
    return error.message;
  } else {
    return "Something went wrong";
  }
};
