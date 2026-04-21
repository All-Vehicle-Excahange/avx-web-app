import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  requestBasicDetails: "/consultation/updation/request/basic",
  requestAddressDetails: "/consultation/updation/request/address",
  requestKycDetails: "/consultation/updation/request/documents",
  finalSubmitUpdateRequest: "/consultation/updation/request/final-submit",
};

export const requestBasicDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINT.requestBasicDetails,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const requestAddressDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINT.requestAddressDetails,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const requestKycDetails = async (data) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINT.requestKycDetails,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};
