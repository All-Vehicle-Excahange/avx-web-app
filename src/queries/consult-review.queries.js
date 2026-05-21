import {
  getConsultationReviewSummary,
  getAllConsultationReviews,
} from "@/services/consult-review.service";
import { queryOptions } from "@tanstack/react-query";

export const getConsultationReviewSummaryQuery = (daysRange) => {
  return queryOptions({
    queryKey: ["consultation-review-summary", daysRange],
    queryFn: async () => {
      const res = await getConsultationReviewSummary(daysRange);
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getConsultationReviewsInfiniteQuery = (payload) => {
  return {
    queryKey: ["consultation-reviews-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getAllConsultationReviews({
        ...payload,
        pageNo: pageParam,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const pageInfo = lastPage?.pageResponse || {};
      const totalPages = pageInfo.totalPages || 1;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: Infinity,
  };
};
