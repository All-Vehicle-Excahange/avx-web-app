import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getThemeListing: "/consultation/owner/store/themes",
  checkIsEligibleToCreate: "consultation/owner/store/themes",
  getThemeImages: "/consultation/owner/store/templates",
  checkIsEligibleToUpload: "/consultation/owner/store/images/upload/eligible",
  getStoreFront: "/consultation/owner/store/get-draft",
  setConsualtTheme: "/consultation/owner/store/draft/theme",
};

export const getThemeListing = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getThemeListing);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const checkIsEligibleToCreate = async (themeId) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.checkIsEligibleToCreate}/${themeId}/eligible`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getThemeImages = async (imageType) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.getThemeImages}?imageType=${imageType}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const checkIsEligibleToUpload = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.checkIsEligibleToUpload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getStoreFront = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getStoreFront);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setConsualtTheme = async (themeId) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.setConsualtTheme, {
      themeId,
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};
