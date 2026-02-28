import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getAllConsultService: "/consultation/filter/get-services",
  getUserCityAndStateByLatLong: "/util/address/city-state-by-lat-lan",
  getFilteredConsult: "/consultation/filter/basic-or-pro",
  getPremiumConsult: "/consultation/filter/premium",
};

export const getAllConsultService = async (data) => {
  try {
    const { pageNo, size } = data;

    const res = await axiosInstance.get(ENDPOINT.getAllConsultService, {
      params: { pageNo, size },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
export const getUserCityAndStateByLatLong = async (data) => {
  try {
    const { latitude, longitude } = data;

    const res = await axiosInstance.get(ENDPOINT.getUserCityAndStateByLatLong, {
      params: { latitude, longitude },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getFilteredConsult = async (data, payload) => {
  try {
    const { pageNo, size } = data;

    const res = await axiosInstance.post(ENDPOINT.getFilteredConsult, payload, {
      params: {
        pageNo,
        size,
        sortBy: "minVehiclePrice",
        direction: "desc",
      },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
export const getPremiumConsult = async (data, payload) => {
  try {
    const { pageNo, size } = data;

    const res = await axiosInstance.post(ENDPOINT.getPremiumConsult, payload, {
      params: {
        pageNo,
        size,
        sortBy: "minVehiclePrice",
        direction: "desc",
      },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
