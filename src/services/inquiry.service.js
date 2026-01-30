import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getInquiries: "/vehicles/inquiry/received",
  approveInquiry: "/vehicles/inquiry/approve",
  closeInquiry: "/vehicles/inquiry/close",
  rejectInquiry: "/vehicles/inquiry/reject",
};

export const getInquiries = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getInquiries);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const approveInquiry = async (id) => {
  try {
    const res = await axiosInstance.patch(`${ENDPOINT.approveInquiry}/${id}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const rejectInquiry = async (id) => {
  try {
    const res = await axiosInstance.patch(`${ENDPOINT.rejectInquiry}/${id}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const closeInquiry = async (id) => {
  try {
    const res = await axiosInstance.patch(`${ENDPOINT.closeInquiry}/${id}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
