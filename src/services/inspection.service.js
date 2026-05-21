import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getInspectionByVehicleId: "/vehicle/inspection/active",
  createInpection: "/vehicle/inspection/request",
  complateInspectionPayment: "/vehicle/inspection/complete-payment",
  getInspectionSnapShot:
    "/consultation/dashboard/inspection/performance-snapshot",
  getVehiclesRequiringAttention:
    "/consultation/dashboard/inspection/vehicles-requiring-attention",
  getRequestedFromBuyers:
    "/consultation/dashboard/inspection/requested-from-buyers",
  getScoreBreakdown: "/consultation/dashboard/inspection/score-breakdown",
  getReportHistory: "/consultation/dashboard/inspection/report-history",
};

export const getInspectionByVehicleId = async (vehicleId) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.getInspectionByVehicleId}/${vehicleId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const createInpection = async (vehicleId, data) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.createInpection}/${vehicleId}`,
      data,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const complateInspectionPayment = async (requestId) => {
  try {
    const res = await axiosInstance.patch(
      `${ENDPOINT.complateInspectionPayment}/${requestId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getInspectionSnapShot = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getInspectionSnapShot);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getVehiclesRequiringAttention = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getVehiclesRequiringAttention);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getRequestedFromBuyers = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getRequestedFromBuyers);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getScoreBreakdown = async (payload) => {
  try {
    const params = {};

    if (payload?.pageNo !== undefined) {
      params.pageNo = payload.pageNo;
    }
    if (payload?.pageSize !== undefined) {
      params.size = payload.pageSize;
    }

    const res = await axiosInstance.get(ENDPOINT.getScoreBreakdown, {
      params,
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getReportHistory = async (payload) => {
  try {
    const params = {};

    if (payload?.overallRiskLevel) {
      params.overallRiskLevel = payload.overallRiskLevel;
    }

    if (payload?.daysRange) {
      params.daysRange = payload.daysRange;
    }

    if (payload?.pageNo !== undefined) {
      params.pageNo = payload.pageNo;
    }
    if (payload?.pageSize !== undefined) {
      params.size = payload.pageSize;
    }

    const res = await axiosInstance.get(ENDPOINT.getReportHistory, {
      params,
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
