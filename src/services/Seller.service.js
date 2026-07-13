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
  getListingCreditPrice: "/listing-credit/price",
  purchaseListingCreditWallet: "/listing-credit/purchase/wallet",
  purchaseListingCreditRazorpay: "/listing-credit/purchase/razorpay",
  getLisitingLimits: "/consultation/dashboard/inventory/listing-count",
};

export const getInventoryVehicle = async (payload) => {
  try {
    const params = {};

    if (payload?.listingStatus) {
      params.listingStatus = payload.listingStatus;
    }
    if (payload?.pageNo !== undefined) {
      params.pageNo = payload.pageNo;
    }
    if (payload?.size !== undefined || payload?.pageSize !== undefined) {
      params.size = payload.size || payload.pageSize;
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

export const getTopPerformingVehicles = async (payload) => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getTopPerformingVehicles, {
      params: payload,
    });
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

export const getListingCreditPrice = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getListingCreditPrice);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const purchaseListingCreditWallet = async (quantity) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.purchaseListingCreditWallet, {
      quantity,
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const purchaseListingCreditRazorpay = async (quantity) => {
  try {
    const res = await axiosInstance.post(
      ENDPOINT.purchaseListingCreditRazorpay,
      { quantity },
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getLisitingLimits = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getLisitingLimits);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
