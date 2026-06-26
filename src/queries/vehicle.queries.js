import { queryOptions } from "@tanstack/react-query";
import {
  getVehicleOverview,
  getVehicleSummary,
  checkIsUserEligbleToSendInquary,
  getActiveInspectionByVehicleId,
  getVehicleInspectionDetails,
  getVehicleSpecification,
} from "@/services/vehicle.service";
import {
  getSimularVehicles,
  getHomeFeedConsult,
} from "@/services/user.service";
import { getFilterConsualt } from "@/services/filter";
import { getInspectionByVehicleId } from "@/services/inspection.service";

const shouldRetry = (failureCount, error) => {
  if (error?.response?.status === 404 || error?.status === 404) {
    return false;
  }
  return failureCount < 3;
};

export const getVehicleOverviewQuery = (id) => {
  return queryOptions({
    queryKey: ["vehicle-overview", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getVehicleOverview(id);
      return res?.data || null;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getVehicleSummaryQuery = (id) => {
  return queryOptions({
    queryKey: ["vehicle-summary", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getVehicleSummary(id);
      return res?.data || null;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getSimularVehiclesQuery = (id) => {
  return queryOptions({
    queryKey: ["similar-vehicles", id],
    queryFn: async () => {
      if (!id) return [];
      const res = await getSimularVehicles({ pageNo: 1, size: 8, id });
      return res?.data || [];
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getRelatedConsultantsQuery = (payload, limit) => {
  return queryOptions({
    queryKey: ["related-consultants", payload, limit],
    queryFn: async () => {
      const hasPayload = Object.keys(payload || {}).length > 0;
      const res = hasPayload
         ? await getFilterConsualt(payload)
        : await getHomeFeedConsult({ pageNo: 1, size: limit });
      return res?.data || [];
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getInquiryEligibilityQuery = (vehicleId) => {
  return queryOptions({
    queryKey: ["inquiry-eligibility", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;
      const res = await checkIsUserEligbleToSendInquary(vehicleId);
      return res?.data ?? null;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getInspectionByVehicleIdQuery = (vehicleId) => {
  return queryOptions({
    queryKey: ["inspection-by-vehicle", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;
      const res = await getInspectionByVehicleId(vehicleId);
      return res?.data ?? null;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getVehicleSpecificationQuery = (variantId) => {
  return queryOptions({
    queryKey: ["vehicle-specification", variantId],
    queryFn: async () => {
      if (!variantId) return null;
      const res = await getVehicleSpecification(variantId);
      return res?.data || null;
    },
    staleTime: 15 * 60 * 1000, // 15 mins cache
    retry: shouldRetry,
  });
};

export const getActiveInspectionQuery = (vehicleId) => {
  return queryOptions({
    queryKey: ["active-inspection", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;
      const res = await getActiveInspectionByVehicleId(vehicleId);
      return res?.data ?? null;
    },
    retry: shouldRetry,
  });
};

export const getVehicleInspectionDetailsQuery = (vehicleId) => {
  return queryOptions({
    queryKey: ["vehicle-inspection-details", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;
      const res = await getVehicleInspectionDetails(vehicleId);
      return res?.data ?? null;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};
