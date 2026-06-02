import { queryOptions } from "@tanstack/react-query";
import {
  getInspectionStatus,
  getInventoryOverview,
  getOverviewSummaryData,
  getRecentActivity,
} from "@/services/overview.service";

export const getInventoryOverviewQuery = () => {
  return queryOptions({
    queryKey: ["overview-inventory-overview"],
    queryFn: async () => {
      const res = await getInventoryOverview();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getOverviewSummaryDataQuery = () => {
  return queryOptions({
    queryKey: ["overview-summary-data"],
    queryFn: async () => {
      const res = await getOverviewSummaryData();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getInspectionStatusQuery = () => {
  return queryOptions({
    queryKey: ["overview-inspection-status"],
    queryFn: async () => {
      const res = await getInspectionStatus();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getRecentActivityQuery = () => {
  return queryOptions({
    queryKey: ["overview-recent-activity"],
    queryFn: async () => {
      const res = await getRecentActivity();
      return res?.data;
    },
    staleTime: Infinity,
  });
};
