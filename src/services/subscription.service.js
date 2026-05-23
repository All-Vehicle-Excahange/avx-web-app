import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  subscription: "/subscription",
};

export const createSubscription = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.subscription, payload);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getActiveSubscription = async () => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.subscription}/active`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const checkActiveSubscription = async () => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.subscription}/check`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId, payload) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.subscription}/${subscriptionId}/cancel`,
      payload,
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const pauseSubscription = async (subscriptionId) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.subscription}/${subscriptionId}/pause`,
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const resumeSubscription = async (subscriptionId) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.subscription}/${subscriptionId}/resume`,
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
