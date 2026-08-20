import axiosInstance, {
  axiosNodeInstance,
  handleNodeResponse,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  getMakersByFuelOrBodyType: "/search/makers",
  getFilteredVehicles: "/vehicle/filter/sections",
  getAndSearchMakers: "/search/makers",
  getAndSearchModel: "/search/models",
  getFuelTypeByModelId: "/search/fuel-types",
  getTransmissionTypeByModelId: "/search/transmission-types",
  getAndSearchVariant: "/search/variants",
  getYearByModelId: "/search/model-years",
  getPopularCityAndState: "/util/address/popular-cities-states",
  SearchCityAndState: "/util/address/search-cities-states",
  getFilterConsualt: "/consultation/filter/based-on-vehicles-filter"
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

export const getFilteredVehicles = async (data, params = {}) => {
  try {
    let vehicleTypeVal = "FOUR_WHEELER";
    if (params.vehicleType) {
      const vt = String(params.vehicleType).toLowerCase();
      if (vt.includes("2") || vt.includes("two")) {
        vehicleTypeVal = "TWO_WHEELER";
      }
    }
    const { bodyType, ...cleanParams } = params;
    let cleanData = data;
    if (data && typeof data === "object") {
      const { bodyType: _, ...restData } = data;
      cleanData = restData;
    }
    const res = await axiosInstance.post(ENDPOINT.getFilteredVehicles, cleanData, {
      params: {
        pageNo: cleanParams.pageNo ?? 1,
        size: cleanParams.size ?? 6,
        sortBy: cleanParams.sortBy,
        direction: cleanParams.direction,
        ...cleanParams,
        vehicleType: vehicleTypeVal,
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getAndSearchMakers = async (data) => {
  try {
    const { searchTerm, page, limit, bodyType } = data;

    const res = await axiosNodeInstance.get(ENDPOINT.getAndSearchMakers, {
      params: {
        search: searchTerm,
        page,
        limit,
        sortDir: "asc",
        sortBy: "make_id",
        bodyType,
      },
    });
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getAndSearchModel = async (data) => {
  try {
    const { searchTerm, page, limit, maker_id, bodyType } = data;

    const res = await axiosNodeInstance.get(ENDPOINT.getAndSearchModel, {
      params: {
        search: searchTerm,
        page,
        limit,
        makerId: maker_id,
        bodyType,
      },
    });
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getFuelTypeByModelId = async (model_id, bodyType) => {
  try {
    let mId = model_id;
    let bType = bodyType;
    if (model_id && typeof model_id === "object") {
      mId = model_id.modelId;
      bType = model_id.bodyType;
    }
    const res = await axiosNodeInstance.get(ENDPOINT.getFuelTypeByModelId, {
      params: {
        modelId: mId,
        bodyType: bType,
      },
    });
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};
export const getTransmissionTypeByModelId = async (model_id, bodyType) => {
  try {
    let mId = model_id;
    let bType = bodyType;
    if (model_id && typeof model_id === "object") {
      mId = model_id.modelId;
      bType = model_id.bodyType;
    }
    const res = await axiosNodeInstance.get(
      ENDPOINT.getTransmissionTypeByModelId,
      {
        params: {
          modelId: mId,
          bodyType: bType,
        },
      },
    );
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getYearByModelId = async (model_id, bodyType) => {
  try {
    let mId = model_id;
    let bType = bodyType;
    if (model_id && typeof model_id === "object") {
      mId = model_id.modelId;
      bType = model_id.bodyType;
    }
    const res = await axiosNodeInstance.get(
      ENDPOINT.getYearByModelId,
      {
        params: {
          modelId: mId,
          bodyType: bType,
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
    const { searchTerm, page, limit, modelId, fuelType, year, bodyType } = data;

    const res = await axiosNodeInstance.get(ENDPOINT.getAndSearchVariant, {
      params: {
        search: searchTerm,
        page,
        limit,
        modelId: modelId,
        fuelType: fuelType,
        year: year,
        bodyType,
      },
    });
    return handleNodeResponse(res);
  } catch (error) {
    throw error;
  }
};


export const getPopularCityAndState = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getPopularCityAndState);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const SearchCityAndState = async (data) => {
  try {
    const { searchTerm } = data;
    const res = await axiosInstance.get(ENDPOINT.SearchCityAndState, {
      params: {
        searchText: searchTerm,
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getFilterConsualt = async (data) => {
  try {
    let cleanData = data;
    if (data && typeof data === "object") {
      const { bodyType, ...restData } = data;
      cleanData = restData;
    }
    const res = await axiosInstance.post(ENDPOINT.getFilterConsualt, cleanData);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};