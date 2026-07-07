import axiosInstance, {
  handleResponse,
  handleError,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  MARK_READ: (id) => `/notifications/${id}/read`,
  MARK_ALL_READ: "/notifications/read-all",
  getAllNotifications: "/notifications",
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await axiosInstance.put(ENDPOINT.MARK_READ(id));
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axiosInstance.put(ENDPOINT.MARK_ALL_READ);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.getAllNotifications);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
