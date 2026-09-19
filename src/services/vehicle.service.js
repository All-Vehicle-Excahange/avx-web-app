import axiosInstance, {
  axiosNodeInstance,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getVehicleOverview: "/vehicle/detail-page",
  getVehicleSummary: "/vehicle/detail-page/consultation/meta",
  sendInquary: "/vehicles/inquiry/create",
  checkIsUserEligbleToSendInquary: "/vehicles/inquiry/latest-by-vehicle",
  markAsSoldVehicle: "/vehicle/sell/basic/sold",
  getActiveInspectionByVehicleId: "/vehicle/inspection/active",
  getVehicleInspectionDetails: "/vehicle/detail-page",
  getVehicleSpecification: "/specifications",
  getVehicleExtraDetails: "/vehicle/sell/extra-details",
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

export const getVehicleSpecification = async (variantId) => {
  try {
    const res = await axiosNodeInstance.get(
      `${ENDPOINT.getVehicleSpecification}/${variantId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getVehicleExtraDetails = async (vehicleId) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.getVehicleExtraDetails}/${vehicleId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getVehicleOwnerContact = async (vehicleId) => {
  try {
    const res = await axiosInstance.get(
      `/vehicles/call-lead/owner-contact/${vehicleId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const createVehicleCallLead = async (vehicleId) => {
  try {
    const res = await axiosInstance.post(`/vehicles/call-lead`, { vehicleId });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getReceivedCallLeads = async (params = {}) => {
  try {
    const res = await axiosInstance.get(`/vehicles/call-lead/received`, {
      params,
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const markCallLeadCompletedByOwner = async (callLeadId) => {
  try {
    const res = await axiosInstance.patch(
      `/vehicles/call-lead/owner/${callLeadId}/mark-completed`
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getCallLeadsKpis = async () => {
  try {
    const res = await axiosInstance.get(
      `/consultation/dashboard/inquiry/call-leads/kpis`
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const recordInquiryClick = async (vehicleId) => {
  try {
    const res = await axiosInstance.post(`/vehicles/inquiry/click/${vehicleId}`);
    return handleResponse(res);
  } catch (error) {
    console.error("Error recording inquiry click API:", error);
    return null;
  }
};



