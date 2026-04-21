import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getAnalyticsKips: "/consultation/dashboard/analytics/kpis",
  getTrafficConversion: "/consultation/dashboard/analytics/traffic-conversion",
  getWeeklyAnalytics:
    "/consultation/dashboard/analytics/inquiry/weekly-performance",
  subTypeDemandBreakdown:
    "/consultation/dashboard/analytics/subtype-demand-breakdown",
  cityDemandBreakdown:
    "/consultation/dashboard/analytics/city-demand-breakdown",
  getKeyInsights: "/consultation/dashboard/analytics/key-insights",
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

export const getWeeklyAnalytics = async (days) => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getWeeklyAnalytics, {
      params: {
        daysRange: days,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const getSubTypeDemandBreakdown = async (days) => {
  try {
    const response = await axiosInstance.get(ENDPOINT.subTypeDemandBreakdown, {
      params: {
        daysRange: days,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const getCityDemandBreakdown = async (days) => {
  try {
    const response = await axiosInstance.get(ENDPOINT.cityDemandBreakdown, {
      params: {
        daysRange: days,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};

export const getKeyInsights = async (days) => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getKeyInsights, {
      params: {
        daysRange: days,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleResponse(error);
  }
};
