import {
  getInspectionSnapShot,
  getReportHistory,
  getRequestedFromBuyers,
  getScoreBreakdown,
  getVehiclesRequiringAttention,
} from "@/services/inspection.service";
import { queryOptions } from "@tanstack/react-query";

export const getInspectionSnapShotQuery = () => {
  return queryOptions({
    queryKey: ["inspection-snapshot"],
    queryFn: async () => {
      const res = await getInspectionSnapShot();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getVehiclesRequiringAttentionQuery = () => {
  return queryOptions({
    queryKey: ["vehicles-requiring-attention"],
    queryFn: async () => {
      const res = await getVehiclesRequiringAttention();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getRequestedFromBuyersQuary = () => {
  return queryOptions({
    queryKey: ["requested-from-buyers"],
    queryFn: async () => {
      const res = await getRequestedFromBuyers();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getScoreBreakdownInfiniteQuery = (payload) => {
  return {
    queryKey: ["score-breakdown-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getScoreBreakdown({ ...payload, pageNo: pageParam });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages =
        lastPage.pagination?.totalPages ||
        lastPage.pageResponse?.totalPages ||
        1;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: Infinity,
  };
};

export const getReportHistoryInfiniteQuery = (payload) => {
  return {
    queryKey: ["report-history-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getReportHistory({ ...payload, pageNo: pageParam });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages =
        lastPage.pagination?.totalPages ||
        lastPage.pageResponse?.totalPages ||
        1;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: Infinity,
  };
};
