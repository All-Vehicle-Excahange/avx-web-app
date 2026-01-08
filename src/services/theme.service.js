import axiosInstance from "@/lib/axiosInstance";



const ENDPOINT = {
  getThemeListing: "/consultation/store/themes",
  checkIsEligibleToCreate: "consultation/store/eligible/theme",
};

export const getThemeListing = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getThemeListing);
    return res.data;
  } catch (error) {
    throw error;
  }
};
