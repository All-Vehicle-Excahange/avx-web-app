import axiosInstance, {
    handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
    getVehicleOverview: "/vehicle/detail-page",
    getVehicleSummary: "/consultation/detail-page/meta"
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