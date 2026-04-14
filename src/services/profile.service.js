import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getVerificationStatus: "/consultation/dashboard/profile/verification-status",
  getDocumentStatus: "/consultation/dashboard/profile/document-status",
  getConsualtProfile: "/consultation/owner",
  getConsualtAdress: "/consultation/owner/address"
};

export const getVerificationStatus = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getVerificationStatus);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getDocumentStatus = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getDocumentStatus);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getConsualtProfile = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getConsualtProfile);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getConsualtAdress = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getConsualtAdress);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
