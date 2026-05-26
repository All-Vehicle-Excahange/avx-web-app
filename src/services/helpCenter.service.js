import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  helpCenter: "/help-center",
  markResolved: (id) => `/help-center/mark-resolved/${id}`,
  kpi: "/help-center/kpi",
};

export const createHelpTicket = async (formData) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.helpCenter, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAllHelpTickets = async (params) => {
  try {
    const res = await axiosInstance.get(ENDPOINT.helpCenter, {
      params,
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const markHelpTicketResolved = async (helpTicketId) => {
  try {
    const res = await axiosInstance.patch(ENDPOINT.markResolved(helpTicketId));
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getHelpTicketKpi = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.kpi);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
