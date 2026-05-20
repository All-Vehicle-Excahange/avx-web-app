import { queryOptions } from "@tanstack/react-query";
import {
  getAnalyticsKips,
  getTrafficConversion,
  getWeeklyAnalytics,
  getSubTypeDemandBreakdown,
  getCityDemandBreakdown,
  getKeyInsights,
} from "@/services/analytics.service";

export const getAnalyticsKipsQuery = (days) => {
  return queryOptions({
    queryKey: ["analytics-kips", days],
    queryFn: async () => {
      const res = await getAnalyticsKips(days);
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getTrafficConversionQuery = (days) => {
  return queryOptions({
    queryKey: ["analytics-traffic-conversion", days],
    queryFn: async () => {
      const res = await getTrafficConversion(days);
      return res?.data;
    },
     staleTime: Infinity,
  });
};

export const getWeeklyAnalyticsQuery = (days) => {
  return queryOptions({
    queryKey: ["analytics-weekly-performance", days],
    queryFn: async () => {
      const res = await getWeeklyAnalytics(days);
      return res?.data;
    },
     staleTime: Infinity,
  });
};

export const getSubTypeDemandBreakdownQuery = (days) => {
  return queryOptions({
    queryKey: ["analytics-subtype-demand-breakdown", days],
    queryFn: async () => {
      const res = await getSubTypeDemandBreakdown(days);
      return res?.data;
    },
     staleTime: Infinity,
  });
};

export const getCityDemandBreakdownQuery = (days) => {
  return queryOptions({
    queryKey: ["analytics-city-demand-breakdown", days],
    queryFn: async () => {
      const res = await getCityDemandBreakdown(days);
      return res?.data;
    },
     staleTime: Infinity,
  });
};

export const getKeyInsightsQuery = (days) => {
  return queryOptions({
    queryKey: ["analytics-key-insights", days],
    queryFn: async () => {
      const res = await getKeyInsights(days);
      return res?.data;
    },
     staleTime: Infinity,
  });
};
