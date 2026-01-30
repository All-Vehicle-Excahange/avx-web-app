import { axiosNodeInstance } from "@/lib/axiosInstance";

const ENDPOINT = {
  getMakers: "/makers",
  getModelByMakerId: "/makers",
};

export const getMakers = async (data) => {
  try {
    const { page, limit } = data;
    const res = await axiosNodeInstance.get(ENDPOINT.getMakers, {
      params: { page, limit, sortBy: "makeName", sortDir: "asc" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getModelByMakerId = async (data) => {
  try {
    const { page, limit, makerId } = data;
    const res = await axiosNodeInstance.get(
      `${ENDPOINT.getModelByMakerId}/${makerId}/models`,
      {
        params: { page, limit, sortBy: "makeName", sortDir: "asc" },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
