import { queryOptions } from "@tanstack/react-query";
import {
  getInventoryOverview,
  getOverviewSummaryData,
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
