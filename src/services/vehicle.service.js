import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getVehicleOverview: "/vehicle/detail-page",
  getVehicleSummary: "/vehicle/detail-page/consultation/meta",
  sendInquary: "/vehicles/inquiry/create",
  checkIsUserEligbleToSendInquary: "/vehicles/inquiry/latest-by-vehicle",
  markAsSoldVehicle: "/vehicle/sell/basic/sold",
  getActiveInspectionByVehicleId: "/vehicle/inspection/active",
  getVehicleInspectionDetails: "/vehicle/detail-page",
};

export const getVehicleOverview = async (id) => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.getVehicleOverview}/${id}`);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getVehicleSummary = async (id) => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.getVehicleSummary}/${id}`);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const sendInquary = async (vehicleId, data) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.sendInquary}/${vehicleId}`,
      data,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const checkIsUserEligbleToSendInquary = async (vehicleId) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.checkIsUserEligbleToSendInquary}/${vehicleId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const markAsSoldVehicle = async (vehicleId, closingPrice) => {
  try {
    const res = await axiosInstance.patch(
      `${ENDPOINT.markAsSoldVehicle}/${vehicleId}`,
      {},
      {
        params: {
          closingPrice: closingPrice,
        },
      },
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getActiveInspectionByVehicleId = async (vehicleId) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.getActiveInspectionByVehicleId}/${vehicleId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getVehicleInspectionDetails = async (vehicleId) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.getVehicleInspectionDetails}/${vehicleId}/inspection-details`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
