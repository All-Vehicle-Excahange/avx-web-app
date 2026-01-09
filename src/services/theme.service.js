import axiosInstance from "@/lib/axiosInstance";

const ENDPOINT = {
  getThemeListing: "/consultation/store/themes",
  checkIsEligibleToCreate: "consultation/store/eligible/theme",
  getThemeImages: "/consultation/store/templates",
  checkIsEligibleToUpload: "/consultation/store/eligible/image/upload",
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
      `${ENDPOINT.checkIsEligibleToCreate}/${themeId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getThemeImages = async (imageType) => {
  try {
    const res = await axiosInstance.get(
      `${ENDPOINT.getThemeImages}?imageType=${imageType}`
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
