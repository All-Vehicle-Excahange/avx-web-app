import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getInventoryOverview: "/consultation/dashboard/overview/inventory-data",
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
