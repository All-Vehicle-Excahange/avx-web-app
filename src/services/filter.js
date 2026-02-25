import axiosInstance, {
  axiosNodeInstance,
  handleNodeResponse,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getMakersByFuelOrBodyType: "/search/fuelTypesandbodyTypesmakers",
  getFilteredVehicles: "/vehicle/filter/four-wheeler",
  getAndSearchMakers: "/search/makers",
  getAndSearchModel: "/search/models",
  getFuelTypeByModelId: "/search/fuel-types",
  getTransmissionTypeByModelId: "/search/transmission-types",
  getAndSearchVariant: "/search/variants",
};

export const getMakersByFuelOrBodyType = async (data) => {
  try {
    const { fuelType, bodyType, page, limit } = data;

    const res = await axiosNodeInstance.get(
      ENDPOINT.getMakersByFuelOrBodyType,
      {
        params: { fuelType, bodyType, page, limit },
      },
    );
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getFilteredVehicles = async (data) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.getFilteredVehicles, data);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getAndSearchMakers = async (data) => {
  try {
    const { searchTerm, page, limit } = data;

    const res = await axiosNodeInstance.get(ENDPOINT.getAndSearchMakers, {
      params: {
        search: searchTerm,
        page,
        limit,
        sortDir: "asc",
        sortBy: "make_id",
      },
    });
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getAndSearchModel = async (data) => {
  try {
    const { searchTerm, page, limit, maker_id } = data;

    const res = await axiosNodeInstance.get(ENDPOINT.getAndSearchModel, {
      params: {
        search: searchTerm,
        page,
        limit,
        makerId: maker_id,
      },
    });
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getFuelTypeByModelId = async (model_id) => {
  try {
    const res = await axiosNodeInstance.get(ENDPOINT.getFuelTypeByModelId, {
      params: {
        modelId: model_id,
      },
    });
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};
export const getTransmissionTypeByModelId = async (model_id) => {
  try {
    const res = await axiosNodeInstance.get(
      ENDPOINT.getTransmissionTypeByModelId,
      {
        params: {
          modelId: model_id,
        },
      },
    );
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};



export const getAndSearchVariant = async (data) => {
  try {
    const { searchTerm, page, limit, modelId, fuelType } = data;

    const res = await axiosNodeInstance.get(ENDPOINT.getAndSearchVariant, {
      params: {
        search: searchTerm,
        page,
        limit,
        modelId: modelId,
        fuelType: fuelType,
      },
    });
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};
