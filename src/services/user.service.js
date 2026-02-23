import axiosInstance, {handleResponse} from "@/lib/axiosInstance";

const ENDPOINT = {
    getHomeFeed: "/homefeed/vehicles",
    getWhereYouLeftOff: "/homefeed/vehicles/history",
    getRecentlySold: "/homefeed/vehicles/recently-sold",
    getHomeFeedConsult: "/homefeed/consultations",
    getAvxIsnpectedTwoWheel: "/homefeed/vehicles/avx-inspected/two-wheeler",
    getAvxIsnpectedFourWheel: "/homefeed/vehicles/avx-inspected/four-wheeler",
    getTopPicsFour: "/homefeed/vehicles/four-wheeler",
    getTopPicsTwo: "/homefeed/vehicles/two-wheeler",
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
    getFollowedConsultant: "/consultation/follow",
    getStoreFrontByUsername: "/consultation/detail-page/by-username",
    checkIsEligibleToCreateReview: "/consultation/review/eligible",
    getAllReview: "/consultation/review/all",
    addNewReview: "/consultation/review",
    getSimularVehicles: "/vehicle/detail-page",
    getConsualtInventory: "/consultation/detail-page/inventory",
    getFourWheelWithTag: "/homefeed/vehicles/four-wheeler/with-tag",
    getTwoWheelWithTag: "/homefeed/vehicles/two-wheeler/with-tag",
    getSellerInventory: "/vehicle/seller/my-vehicles",
    postBecameSeller: "/users/seller"

};

export const getUserHomeFeed = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getHomeFeed, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};

export const getWhereYouLeftOff = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getWhereYouLeftOff, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};
export const getRecentlySold = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getRecentlySold, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};

export const getAvxIsnpectedTwoWheel = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getAvxIsnpectedTwoWheel, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};

export const getAvxIsnpectedFourWheel = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getAvxIsnpectedFourWheel, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};

export const getTopPicsFour = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getTopPicsFour, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};

export const getTopPicsTwo = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getTopPicsTwo, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};


export const getSimularVehicles = async (data) => {
    try {
        const {pageNo, size, id} = data;

        const res = await axiosInstance.get(`${ENDPOINT.getSimularVehicles}/${id}/similar`, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};

export const getHomeFeedConsult = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getHomeFeedConsult, {
            params: {pageNo, size},
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
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getWishList, {
            params: {pageNo, size},
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
            params: {pageNo: data.pageNo, size: data.size},
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


export const getStoreFrontByUsername = async (username) => {
    try {
        const res = await axiosInstance.get(`${ENDPOINT.getStoreFrontByUsername}/${username}`)
        return handleResponse(res);
    } catch (error) {
        throw error;
    }
}


export const getConsualtInventory = async (data) => {
    try {
        const {pageNo, size, sortBy, direction, id} = data;

        const res = await axiosInstance.get(`${ENDPOINT.getConsualtInventory}/${id}`, {
            params: {pageNo, size, sortBy, direction},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};


export const getFollowedConsultant = async (data) => {
    try {
        const {pageNo, size} = data;

        const res = await axiosInstance.get(ENDPOINT.getFollowedConsultant, {
            params: {pageNo, size},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};


export const getFourWheelWithTag = async (data) => {
    try {
        const {pageNo, size, vehicleTag} = data;

        const res = await axiosInstance.get(ENDPOINT.getFourWheelWithTag, {
            params: {pageNo, size, vehicleTag},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};

export const getTwoWheelWithTag = async (data) => {
    try {
        const {pageNo, size, vehicleTag} = data;

        const res = await axiosInstance.get(ENDPOINT.getTwoWheelWithTag, {
            params: {pageNo, size, vehicleTag},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};


export const getSellerInventory = async (data) => {
    try {
        const {pageNo, size, listingStatus} = data;

        const res = await axiosInstance.get(ENDPOINT.getSellerInventory, {
            params: {pageNo, size, listingStatus},
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
};

export const postBecameSeller = async (payload) => {
    try {
        const res = await axiosInstance.post(ENDPOINT.postBecameSeller, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return handleResponse(res);
    } catch (error) {
        throw error;
    }
}