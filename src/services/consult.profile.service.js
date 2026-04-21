import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  createUpdateRequest: "/consultation/updation/request",
  updateRequest: "/consultation/updation/request",
  finalSubmit: "/consultation/updation/request",
  getActiveBasicUpdate: "/consultation/updation/request/active/basic",
  getActiveAddressUpdate: "/consultation/updation/request/active/address",
  getActiveKycUpdate: "/consultation/updation/request/active/documents",
};

export const createUpdateRequest = async (data) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINT.createUpdateRequest,
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

export const updateBasicDetails = async (data, updateId) => {
  try {
    const response = await axiosInstance.post(
      `${ENDPOINT.updateRequest}/${updateId}/basic`,
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

export const updateAddressDetails = async (data, updateId) => {
  try {
    const response = await axiosInstance.post(
      `${ENDPOINT.updateRequest}/${updateId}/address`,
      data,
    );
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const updateKycDocuments = async (data, updateId) => {
  try {
    const response = await axiosInstance.post(
      `${ENDPOINT.updateRequest}/${updateId}/documents`,
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

export const finalSubmit = async (updateId) => {
  try {
    const response = await axiosInstance.patch(
      `${ENDPOINT.finalSubmit}/${updateId}/final-submit`,
    );
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const getActiveBasicUpdate = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getActiveBasicUpdate);
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const getBaiscDetails = getActiveBasicUpdate;

export const getActiveAddressUpdate = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getActiveAddressUpdate);
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const getActiveKycUpdate = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getActiveKycUpdate);
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};
