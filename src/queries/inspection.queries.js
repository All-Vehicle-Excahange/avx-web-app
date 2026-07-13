import {
  getAllInsprectionRequest,
  getAllRequestedInspection,
  getInspectionSnapShot,
  getReportHistory,
  getRequestedFromBuyers,
  getScoreBreakdown,
  getVehiclesRequiringAttention,
  getInspectionPriceAndCount,
  getInspectionPricForBuyer,
  getInspectionRefundStatus,
} from "@/services/inspection.service";
import { queryOptions } from "@tanstack/react-query";

export const getInspectionSnapShotQuery = () => {
  return queryOptions({
    queryKey: ["inspection-snapshot"],
    queryFn: async () => {
      const res = await getInspectionSnapShot();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getVehiclesRequiringAttentionQuery = () => {
  return queryOptions({
    queryKey: ["vehicles-requiring-attention"],
    queryFn: async () => {
      const res = await getVehiclesRequiringAttention();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getRequestedFromBuyersQuary = () => {
  return queryOptions({
    queryKey: ["requested-from-buyers"],
    queryFn: async () => {
      const res = await getRequestedFromBuyers();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
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
    staleTime: 10 * 60 * 1000,
  };
};

export const getReportHistoryQuery = (payload) => {
  return queryOptions({
    queryKey: ["report-history", payload],
    queryFn: async () => {
      const res = await getReportHistory(payload);
      return res;
    },
  });
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
    staleTime: 10 * 60 * 1000,
  };
};

export const getAllRequestedInspectionInfiniteQuery = (payload) => {
  return {
    queryKey: ["all-requested-inspection-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getAllRequestedInspection({
        ...payload,
        pageNo: pageParam,
      });
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
    staleTime: 1000 * 10 * 60, // 10 minits
  };
};

export const getAllInsprectionRequestInfiniteQuery = (payload) => {
  return {
    queryKey: ["all-inspection-request-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getAllInsprectionRequest({
        ...payload,
        pageNo: pageParam,
      });
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
    staleTime: 1000 * 10 * 60, // 10 minits
  };
};

export const getInspectionPriceAndCountQuery = (vehicleId) => {
  return queryOptions({
    queryKey: ["inspection-price-count", vehicleId],
    queryFn: async () => {
      const res = await getInspectionPriceAndCount(vehicleId);
      return res?.data;
    },
  });
};

export const getInspectionPricForBuyerQuery = (vehicleId) => {
  return queryOptions({
    queryKey: ["inspection-price-count-for-buyer", vehicleId],
    queryFn: async () => {
      const res = await getInspectionPricForBuyer(vehicleId);
      return res?.data;
    },
  });
};

export const getInspectionRefundStatusQuery = (requestId) => {
  return queryOptions({
    queryKey: ["inspection-refund-status", requestId],
    queryFn: async () => {
      const res = await getInspectionRefundStatus(requestId);
      return res;
    },
  });
};
