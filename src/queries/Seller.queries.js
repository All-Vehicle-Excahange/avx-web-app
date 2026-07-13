import { queryOptions } from "@tanstack/react-query";
import {
  getInventoryVehicle,
  getSusPendedVehicles,
  getTopPerformingVehicles,
  getInventorySnapShotCount,
  getNeedAttenctionVehicles,
  getSellerTier,
  getInquiryKpis,
  getListingCreditPrice,
  getLisitingLimits,
} from "@/services/Seller.service";

export const getInventoryVehicleQuery = (listingStatus) => {
  return queryOptions({
    queryKey: ["seller-inventory-vehicles", listingStatus],
    queryFn: async () => {
      const res = await getInventoryVehicle({ listingStatus });
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getInventoryVehicleInfiniteQuery = (payload) => {
  return {
    queryKey: ["seller-inventory-vehicles-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const { pageSize, size, ...rest } = payload || {};
      const res = await getInventoryVehicle({
        ...rest,
        pageNo: pageParam,
        size: pageSize || size || 9,
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
    staleTime: 10 * 60 * 1000,
  };
};

export const getSusPendedVehiclesQuery = (payload) => {
  return queryOptions({
    queryKey: ["seller-suspended-vehicles", payload],
    queryFn: async () => {
      const res = await getSusPendedVehicles(payload);
      return res;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getTopPerformingVehiclesQuery = (payload) => {
  return queryOptions({
    queryKey: ["seller-top-performing-vehicles", payload],
    queryFn: async () => {
      const res = await getTopPerformingVehicles(payload);
      return res;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getInventorySnapShotCountQuery = () => {
  return queryOptions({
    queryKey: ["seller-inventory-snapshot-count"],
    queryFn: async () => {
      const res = await getInventorySnapShotCount();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getNeedAttenctionVehiclesQuery = (payload) => {
  return queryOptions({
    queryKey: ["seller-need-attention-vehicles", payload],
    queryFn: async () => {
      const res = await getNeedAttenctionVehicles(payload);
      return res;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getSellerTierQuery = () => {
  return queryOptions({
    queryKey: ["seller-tier"],
    queryFn: async () => {
      const res = await getSellerTier();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getInquiryKpisQuery = () => {
  return queryOptions({
    queryKey: ["seller-inquiry-kpis"],
    queryFn: async () => {
      const res = await getInquiryKpis();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getNeedAttenctionVehiclesInfiniteQuery = (payload) => {
  return {
    queryKey: ["seller-need-attention-vehicles-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const { pageSize, size, ...rest } = payload || {};
      const res = await getNeedAttenctionVehicles({
        ...rest,
        pageNo: pageParam,
        size: pageSize || size || 6,
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
    staleTime: 10 * 60 * 1000,
  };
};

export const getSusPendedVehiclesInfiniteQuery = (payload) => {
  return {
    queryKey: ["seller-suspended-vehicles-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const { pageSize, size, ...rest } = payload || {};
      const res = await getSusPendedVehicles({
        ...rest,
        pageNo: pageParam,
        size: pageSize || size || 9,
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
    staleTime: 10 * 60 * 1000,
  };
};

export const getListingCreditPriceQuery = () => {
  return queryOptions({
    queryKey: ["listing-credit-price"],
    queryFn: async () => {
      const res = await getListingCreditPrice();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const getListingLimitsQuery = () => {
  return queryOptions({
    queryKey: ["listing-limits"],
    queryFn: async () => {
      const res = await getLisitingLimits();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};
