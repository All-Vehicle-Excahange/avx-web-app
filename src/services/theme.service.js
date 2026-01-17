import axiosInstance from "@/lib/axiosInstance";

const ENDPOINT = {
  getThemeListing: "/consultation/owner/store/themes",
  checkIsEligibleToCreate: "consultation/owner/store/themes/",
  getThemeImages: "/consultation/owner/store/templates",
  checkIsEligibleToUpload: "/consultation/owner/store/images/upload/eligible",
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
      `${ENDPOINT.checkIsEligibleToCreate}/${themeId}/eligible`
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
