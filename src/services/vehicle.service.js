import axiosInstance, {
    handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
    getVehicleOverview: "/vehicle/detail-page"
};

export const getVehicleOverview = async (id) => {
    try {
        const res = await axiosInstance.get(`${ENDPOINT.getVehicleOverview}/${id}`)
        return handleResponse(res);
    } catch (error) {
        throw error;
    }
}