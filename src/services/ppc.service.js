import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  createCampion: "/ppc/boost/draft",
  finalSubmit: "/ppc/boost",
  getCampaignsDetails: "ppc/ad/campaign",
  getAllCampaigns: "/ppc/boosts",
  changeCampaignStatus: "/ppc/boost",
  updateCampaign: "/ppc/boost",
  getAddRecomandedVehicle: "/ppc/delivery/recommendations",
  addClickEvent: "/ppc/delivery",
  trackInquary: "/vehicle/inquiry",
};

export const getAllCampaigns = async (payload) => {
  const params = {};

  if (payload?.pageNo !== undefined) {
    params.pageNo = payload.pageNo;
  }
  if (payload?.size !== undefined || payload?.pageSize !== undefined) {
    params.size = payload.size || payload.pageSize;
  }

  try {
    const res = await axiosInstance.get(ENDPOINT.getAllCampaigns, { params });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const createCampion = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.createCampion, payload);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const finalSubmit = async (id, payload) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.finalSubmit}/${id}/submit`,
      payload,
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAllDraftCampions = async () => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.createCampion}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getCampaignsDetails = async (id) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.getCampaignsDetails}/${id}`,
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const changeCampaignStatus = async (id, status) => {
  try {
    const res = await axiosInstance.patch(
      `${ENDPOINT.changeCampaignStatus}/${id}/status`,
      {
        status,
      },
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateCampaign = async (id, payload) => {
  try {
    const res = await axiosInstance.put(
      `${ENDPOINT.updateCampaign}/${id}`,
      payload,
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAddRecomandedVehicle = async (params) => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getAddRecomandedVehicle, {
      params: params,
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const addClickEvent = async (id, placement) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.addClickEvent}/${id}/click`,
      {
        placement,
      },
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const trackInquary = async (vehicleId, body) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.trackInquary}/${vehicleId}/inquiry`,
      body,
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
