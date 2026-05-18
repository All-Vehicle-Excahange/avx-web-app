import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  createOrder: "/payment/razorpay/create-order",
  verifyPayment: "/payment/razorpay/verify-payment",
};

export const createRazorpayOrder = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.createOrder, payload);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const verifyRazorpayPayment = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.verifyPayment, payload);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
