import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getHomeFeed: "/homefeed/vehicles",
  getState: "/util/address/states/101",
  getCities: "util/address/cities",
};

export const getUserHomeFeed = async (data) => {
  try {
    const { pageNo, size } = data;

    const res = await axiosInstance.get(ENDPOINT.getHomeFeed, {
      params: { pageNo, size },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getState = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getState);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getCities = async (id) => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.getCities}/${id}`);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
