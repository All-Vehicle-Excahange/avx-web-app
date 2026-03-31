import axiosInstance, { handleResponse } from "@/lib/axiosInstance";

const ENDPOINT = {
  getThemeListing: "/consultation/owner/store/themes",
  checkIsEligibleToCreate: "consultation/owner/store/themes",
  getThemeImages: "/consultation/owner/store/templates",
  checkIsEligibleToUpload: "/consultation/owner/store/images/upload/eligible",
  getStoreFront: "/consultation/owner/store/get-draft",
  setConsualtTheme: "/consultation/owner/store/draft/theme",
  setAboutHero: "/consultation/owner/store/draft/hero",
  setAboutMission: "/consultation/owner/store/draft/mission",
  setAboutVision: "/consultation/owner/store/draft/vision",
  setState: "/consultation/owner/store/draft/who-we-are",
  setAboutServices: "/consultation/owner/store/draft/services",
  setWhyBuyHero: "/consultation/owner/store/draft/why-buy-hero",
  setWhyBuyStory: "/consultation/owner/store/draft/story",
  setWhyBuyVehicleSelection: "/consultation/owner/store/draft/vehicle-selection",
  setWhyBuyProcess: "/consultation/owner/store/draft/process",
  setWhyBuyInspection: "/consultation/owner/store/draft/inspection",
  setWhyBuyCustomerCommitment: "/consultation/owner/store/draft/customer-commitment",
  setWhyBuyTestimonials: "/consultation/owner/store/draft/testimonial",
  getConsualtDraft: "/consultation/owner/store/get-draft",
  setFeaturedReviews: "/consultation/owner/store/draft/featured-reviews",
  makeAsFinalSubmit: "/consultation/owner/store/submit-draft"
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
    const formData = new FormData();
    formData.append("themeId", themeId);

    const res = await axiosInstance.put(ENDPOINT.setConsualtTheme, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setAboutHero = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setAboutHero, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setAboutMission = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setAboutMission, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setAboutVision = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setAboutVision, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};


export const setState = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setState, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setAboutServices = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setAboutServices, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};



export const setWhyBuyHero = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setWhyBuyHero, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setWhyBuyStory = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setWhyBuyStory, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setWhyBuyVehicleSelection = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setWhyBuyVehicleSelection, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setWhyBuyProcess = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setWhyBuyProcess, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setWhyBuyInspection = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setWhyBuyInspection, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setWhyBuyCustomerCommitment = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setWhyBuyCustomerCommitment, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const setWhyBuyTestimonials = async (data) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setWhyBuyTestimonials, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const getConsualtDraft = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getConsualtDraft);
    return handleResponse(res);
  } catch (error) {
    throw error
  }
}

export const setFeaturedReviews = async (reviewIds) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.setFeaturedReviews, {
      reviewIds,
    });
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};

export const makeAsFinalSubmit = async () => {
  try {
    const res = await axiosInstance.patch(ENDPOINT.makeAsFinalSubmit);
    return handleResponse(res);
  } catch (error) {
    throw error;
  }
};