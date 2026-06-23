import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getInquiries: "/vehicles/inquiry/received",
  getMyInquiries: "/vehicles/inquiry/sent",
  approveInquiry: "/vehicles/inquiry/approve",
  closeInquiry: "/vehicles/inquiry/close",
  rejectInquiry: "/vehicles/inquiry/reject",
};

export const getInquiries = async (payload) => {
  try {
    const params = {};

    if (payload?.inquiryStatus) {
      params.inquiryStatus = payload.inquiryStatus;
    }
    if (payload?.pageNo !== undefined) {
      params.pageNo = payload.pageNo;
    }
    if (payload?.pageSize !== undefined) {
      params.size = payload.pageSize;
    }

    const res = await axiosInstance.get(ENDPOINT.getInquiries, {
      params,
    });

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getMyInquiries = async (payload) => {
  try {
    const params = {};

    if (payload?.inquiryStatus) {
      params.inquiryStatus = payload.inquiryStatus;
    }
    if (payload?.pageNo !== undefined) {
      params.pageNo = payload.pageNo;
    }
    if (payload?.pageSize !== undefined) {
      params.size = payload.pageSize;
    }

    const res = await axiosInstance.get(ENDPOINT.getMyInquiries, {
      params,
    });

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

export const closeInquiry = async (id, reason) => {
  try {
    const res = await axiosInstance.patch(`${ENDPOINT.closeInquiry}/${id}`, {
      closeReason: reason,
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
