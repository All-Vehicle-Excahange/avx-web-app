import axiosInstance, {
    handleError,
    handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
    getInventoryVehicle: "/consultation/dashboard/inventory/vehicles",
    getTopPerformingVehicles: "/consultation/dashboard/inventory/top-performing-vehicles",
    getInventorySnapShotCount: "/consultation/dashboard/inventory/health-check-snapshot-count",
    getNeedAttenctionVehicles: "/consultation/dashboard/inventory/need-attention-vehicle"
};

export const getInventoryVehicle = async (listingStatus) => {
    try {
        const params = {};

        if (listingStatus) {
            params.listingStatus = listingStatus;
        }

        const res = await axiosInstance.get(ENDPOINT.getInventoryVehicle, {
            params,
        });

        return handleResponse(res);
    } catch (error) {
        handleError(error);
        throw error;
    }
}

export const getTopPerformingVehicles = async () => {
    try {
        const res = await axiosInstance.get(ENDPOINT.getTopPerformingVehicles);
        return handleResponse(res);
    } catch (error) {
        handleError(error);
        throw error;
    }
}

export const getInventorySnapShotCount = async () => {
    try {
        const res = await axiosInstance.get(ENDPOINT.getInventorySnapShotCount);
        return handleResponse(res);
    } catch (error) {
        handleError(error);
        throw error;
    }
}

export const getNeedAttenctionVehicles = async (payload) => {
    try {
        const res = await axiosInstance.get(ENDPOINT.getNeedAttenctionVehicles, {
            params: payload,
        });
        return handleResponse(res);
    } catch (error) {
        handleError(error);
        throw error;
    }
}