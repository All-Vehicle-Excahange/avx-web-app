import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getAnalyticsKips: "/consultation/dashboard/analytics/kpis",
  getTrafficConversion: "/consultation/dashboard/analytics/traffic-conversion",
};

export const getAnalyticsKips = async (days) => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getAnalyticsKips, {
      params: {
        daysRange: days,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const getTrafficConversion = async (days) => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getTrafficConversion, {
      params: {
        daysRange: days,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};
