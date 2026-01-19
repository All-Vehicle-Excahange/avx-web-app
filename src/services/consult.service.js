import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  basicDetials: "/consultation/owner",
};

export const postbasicDetials = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.basicDetials, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
