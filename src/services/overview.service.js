import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getInventoryOverview: "/consultation/dashboard/overview/inventory-data",
  getOverviewSummaryData: "/consultation/dashboard/overview/summary-data",
};

export const getInventoryOverview = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getInventoryOverview);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getOverviewSummaryData = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getOverviewSummaryData);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
