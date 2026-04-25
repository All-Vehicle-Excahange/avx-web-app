import axiosInstance, {
  handleError,
  handleResponse,
} from "@/lib/axiosInstance";

const ENDPOINT = {
  summary: "/consultation/dashboard/review/summary",
  all: "/consultation/dashboard/review/all",
  reply: "/consultation/dashboard/review/reply",
};

export const getConsultationReviewSummary = async (
  daysRange = "LAST_7_DAYS",
) => {
  try {
    const res = await axiosInstance.get(ENDPOINT.summary, {
      params: { daysRange },
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAllConsultationReviews = async (params = {}) => {
  try {
    const res = await axiosInstance.get(ENDPOINT.all, {
      params: {
        pageNo: params.pageNo || 0,
        size: params.size || 10,
        sortBy: params.sortBy || "createdAt",
        direction: params.direction || "desc",
        daysRange: params.daysRange,
      },
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const replyToReview = async (consultationReviewId, consultReply) => {
  try {
    const res = await axiosInstance.post(
      `${ENDPOINT.reply}/${consultationReviewId}`,
      { consultReply },
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateReviewReply = async (consultationReviewId, consultReply) => {
  try {
    const res = await axiosInstance.patch(
      `${ENDPOINT.reply}/${consultationReviewId}`,
      { consultReply },
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteReviewReply = async (consultationReviewId) => {
  try {
    const res = await axiosInstance.delete(
      `${ENDPOINT.reply}/${consultationReviewId}`,
    );
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    throw error;
  }
};
