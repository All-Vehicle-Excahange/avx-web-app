import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getSellerTier: "/consultation/dashboard/profile/current-tier",
  getInventoryVehicle: "/consultation/dashboard/inventory/vehicles",
  getTopPerformingVehicles:
    "/consultation/dashboard/inventory/top-performing-vehicles",
  getInventorySnapShotCount:
    "/consultation/dashboard/inventory/health-check-snapshot-count",
  getNeedAttenctionVehicles:
    "/consultation/dashboard/inventory/need-attention-vehicle",
  getInquiryKpis: "/consultation/dashboard/inquiry/kpis",
  getSusPendedVehicles: "/consultation/dashboard/inventory/suspended-vehicles",
};

export const getInventoryVehicle = async (listingStatus) => {
  try {
    const params = {};

    if (listingStatus) {
      params.listingStatus = listingStatus;
    }

    const res = await axiosInstance.get(ENDPOINT.getInventoryVehicle, {
      params,
    });

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getSusPendedVehicles = async (payload) => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getSusPendedVehicles, {
      params: payload,
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getTopPerformingVehicles = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getTopPerformingVehicles);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getInventorySnapShotCount = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getInventorySnapShotCount);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getNeedAttenctionVehicles = async (payload) => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getNeedAttenctionVehicles, {
      params: payload,
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getSellerTier = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getSellerTier);
    const response = handleResponse(res);

    const tierData = response?.data;
    if (tierData) {
      localStorage.setItem("sellerTier", tierData.tierTitle);
      localStorage.setItem("sellerTierData", JSON.stringify(tierData));
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const getInquiryKpis = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getInquiryKpis);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
