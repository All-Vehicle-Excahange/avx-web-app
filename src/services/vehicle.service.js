import axiosInstance, {
    handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
    getVehicleOverview: "/vehicle/detail-page",
    getVehicleSummary: "/consultation/detail-page/meta",
    sendInquary: "/vehicles/inquiry/create"
};

export const getVehicleOverview = async (id) => {
    try {
        const res = await axiosInstance.get(`${ENDPOINT.getVehicleOverview}/${id}`)
        return handleResponse(res);
    } catch (error) {
        throw error;
    }
}

export const getVehicleSummary = async (id) => {
    try {
        const res = await axiosInstance.get(`${ENDPOINT.getVehicleSummary}/${id}`)
        return handleResponse(res);
    } catch (error) {
        throw error;
    }
}

export const sendInquary = async (vehicleId, data) => {
    try {
        const res = await axiosInstance.post(`${ENDPOINT.sendInquary}/${vehicleId}`, data)
        return handleResponse(res);
    } catch (error) {
        throw error;
    }
}