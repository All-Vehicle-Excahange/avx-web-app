import { queryOptions } from "@tanstack/react-query";
import {
  getInventoryVehicle,
  getSusPendedVehicles,
  getTopPerformingVehicles,
  getInventorySnapShotCount,
  getNeedAttenctionVehicles,
  getSellerTier,
  getInquiryKpis,
} from "@/services/Seller.service";

export const getInventoryVehicleQuery = (listingStatus) => {
  return queryOptions({
    queryKey: ["seller-inventory-vehicles", listingStatus],
    queryFn: async () => {
      const res = await getInventoryVehicle(listingStatus);
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getSusPendedVehiclesQuery = (payload) => {
  return queryOptions({
    queryKey: ["seller-suspended-vehicles", payload],
    queryFn: async () => {
      const res = await getSusPendedVehicles(payload);
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getTopPerformingVehiclesQuery = () => {
  return queryOptions({
    queryKey: ["seller-top-performing-vehicles"],
    queryFn: async () => {
      const res = await getTopPerformingVehicles();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getInventorySnapShotCountQuery = () => {
  return queryOptions({
    queryKey: ["seller-inventory-snapshot-count"],
    queryFn: async () => {
      const res = await getInventorySnapShotCount();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getNeedAttenctionVehiclesQuery = (payload) => {
  return queryOptions({
    queryKey: ["seller-need-attention-vehicles", payload],
    queryFn: async () => {
      const res = await getNeedAttenctionVehicles(payload);
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getSellerTierQuery = () => {
  return queryOptions({
    queryKey: ["seller-tier"],
    queryFn: async () => {
      const res = await getSellerTier();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getInquiryKpisQuery = () => {
  return queryOptions({
    queryKey: ["seller-inquiry-kpis"],
    queryFn: async () => {
      const res = await getInquiryKpis();
      return res?.data;
    },
    staleTime: Infinity,
  });
};
