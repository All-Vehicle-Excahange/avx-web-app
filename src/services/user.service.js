import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getHomeFeed: "/homefeed/vehicles",
  getHomeFeedConsult: "/homefeed/consultations",
  getState: "/util/address/states/101",
  getCities: "util/address/cities",
  addWishList: "/vehicle/wishlist",
  getWishList: "/vehicle/wishlist",
  getuserProfile: "/users/profile",
  getuserProfileMeta: "/users/metadata",
  updateuserProfile: "/users/profile",
  updateuserProfileMeta: "/users/metadata",
  checkIsMetaExist: "/users/metadata/exists",
  createUserMeta: "/users/metadata",
  addUserPefrence: "/users/preference",
  followConsultant: "/consultation/follow",
  unFollowConsultant: "/consultation/follow",
  checkIsEligibleToCreateReview: "/consultation/review/eligible",
  getAllReview: "/consultation/review/all",
  addNewReview: "/consultation/review",
};

export const getUserHomeFeed = async (data) => {
  try {
    const { pageNo, size } = data;

    const res = await axiosInstance.get(ENDPOINT.getHomeFeed, {
      params: { pageNo, size },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getHomeFeedConsult = async (data) => {
  try {
    const { pageNo, size } = data;

    const res = await axiosInstance.get(ENDPOINT.getHomeFeedConsult, {
      params: { pageNo, size },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getComsultDetailsById = async (id) => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.getHomeFeedConsult}/${id}`);

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getState = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getState);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getCities = async (id) => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.getCities}/${id}`);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const addWishList = async (vehicleId) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.addWishList}/${vehicleId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const removeWishList = async (vehicleId) => {
  try {
    const res = await axiosInstance.delete(
      `${ENDPOINT.addWishList}/${vehicleId}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getWishList = async (data) => {
  try {
    const { pageNo, size } = data;

    const res = await axiosInstance.get(ENDPOINT.getWishList, {
      params: { pageNo, size },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getuserProfile = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getuserProfile);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getuserProfileMeta = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getuserProfileMeta);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const updateuserProfile = async (payload) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.updateuserProfile, payload);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
export const updateuserProfileMeta = async (payload) => {
  try {
    const res = await axiosInstance.put(
      ENDPOINT.updateuserProfileMeta,
      payload,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const checkIsMetaExist = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.checkIsMetaExist);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const createUserMeta = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.createUserMeta, payload);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const addUserPefrence = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.addUserPefrence, payload);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const followConsultant = async (id) => {
  try {
    const res = await axiosInstance.post(`${ENDPOINT.followConsultant}/${id}`);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const unFollowConsultant = async (id) => {
  try {
    const res = await axiosInstance.delete(
      `${ENDPOINT.unFollowConsultant}/${id}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const checkIsEligibleToCreateReview = async (id) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.checkIsEligibleToCreateReview}/${id}`,
    );
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getAllReview = async (id, data) => {
  try {
    const res = await axiosInstance.get(`${ENDPOINT.getAllReview}/${id}`, {
      params: { pageNo: data.pageNo, size: data.size },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const addNewReview = async (id, formData) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.addNewReview}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
