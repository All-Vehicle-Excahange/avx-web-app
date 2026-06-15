import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  addTopUpPaymemt: "/consultation/wallet-billing/top-up/order",
  getWallerBalance: "/consultation/wallet-billing/balance",
  getPaymentHistory: "/subscription/payment-history",
};


export const addTopUpPaymemt = async (payload) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINT.addTopUpPaymemt,
      payload,
    );
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getWallerBalance = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getWallerBalance);
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getPaymentHistory = async (payload) => {
  const queryParams = {};

  if (payload?.pageNo !== undefined) {
    queryParams.pageNo = payload.pageNo;
  }
  if (payload?.pageSize !== undefined) {
    queryParams.size = payload.pageSize;
  }

  try {
    const response = await axiosInstance.get(ENDPOINT.getPaymentHistory, {
      params: queryParams,
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};
