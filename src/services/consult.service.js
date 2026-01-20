import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  basicDetials: "/consultation/owner",
  updateBasicDetials: "/consultation/owner",
  addAddress: "/consultation/owner/address",
  updateAddress: "/consultation/owner/address",
  getBaiscDetails: "/consultation/owner",
  getAddressDetails: "/consultation/owner/address",
  getKycDocs: "/consultation/owner/documents",
  postKycDetials: "/consultation/owner/documents",
  updateKycDetials: "/consultation/owner/documents",
  finalSubmit: "/consultation/owner/final-submit",
};

export const postbasicDetials = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.basicDetials, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updatebasicDetials = async (payload) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.updateBasicDetials, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getBaiscDetails = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getBaiscDetails);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const postAddressDetials = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.addAddress, payload);

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateAddressDetials = async (payload) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.updateAddress, payload);

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAddressDetails = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getAddressDetails);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getKycDocs = async () => {
  try {
    const res = await axiosInstance.get(ENDPOINT.getKycDocs);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const postKycDetials = async (payload) => {
  try {
    const res = await axiosInstance.post(ENDPOINT.postKycDetials, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateKycDetials = async (payload) => {
  try {
    const res = await axiosInstance.put(ENDPOINT.updateKycDetials, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const finalSubmit = async () => {
  try {
    const res = await axiosInstance.patch(ENDPOINT.finalSubmit);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
