import { queryOptions } from "@tanstack/react-query";
import {
  getInspectionStatus,
  getInventoryOverview,
  getOverviewSummaryData,
  getRecentActivity,
  getLowDemandVehicles,
} from "@/services/overview.service";

export const getInventoryOverviewQuery = () => {
  return queryOptions({
    queryKey: ["overview-inventory-overview"],
    queryFn: async () => {
      const res = await getInventoryOverview();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getOverviewSummaryDataQuery = () => {
  return queryOptions({
    queryKey: ["overview-summary-data"],
    queryFn: async () => {
      const res = await getOverviewSummaryData();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getInspectionStatusQuery = () => {
  return queryOptions({
    queryKey: ["overview-inspection-status"],
    queryFn: async () => {
      const res = await getInspectionStatus();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getLowDemandVehiclesQuery = (params) => {
  return queryOptions({
    queryKey: ["overview-low-demand-vehicles", params],
    queryFn: async () => {
      const res = await getLowDemandVehicles(params);
      return res;
    },
    staleTime: 10 * 60 * 1000,
  });
};
