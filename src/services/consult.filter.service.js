import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getAllConsultService: "/consultation/filter/get-services",
};

export const getAllConsultService = async (data) => {
  try {
    const { pageNo, size } = data;

    const res = await axiosInstance.get(ENDPOINT.getAllConsultService, {
      params: { pageNo, size },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
