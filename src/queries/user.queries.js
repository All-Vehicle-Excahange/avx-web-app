import {
  getWishList,
  getFollowedConsultant,
  getUserPreference,
  getSellerInventory,
  getuserProfile,
  checkIsMetaExist,
  getuserProfileMeta,
  getUserSellerSuspend,
  getBecameSeller,
  getState,
  getCities,
  getUserProfileStrength,
} from "@/services/user.service";
import { queryOptions } from "@tanstack/react-query";

const shouldRetry = (failureCount, error) => {
  if (error?.response?.status === 404 || error?.status === 404) {
    return false;
  }
  return failureCount < 3;
};

export const getUserProfileQuery = () => {
  return queryOptions({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await getuserProfile();
      return res;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const checkIsMetaExistQuery = () => {
  return queryOptions({
    queryKey: ["user-meta-exists"],
    queryFn: async () => {
      const res = await checkIsMetaExist();
      return res;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getUserProfileMetaQuery = () => {
  return queryOptions({
    queryKey: ["user-profile-meta"],
    queryFn: async () => {
      const res = await getuserProfileMeta();
      return res;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getUserSellerSuspendQuery = () => {
  return queryOptions({
    queryKey: ["user-seller-suspend"],
    queryFn: async () => {
      const res = await getUserSellerSuspend();
      return res;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getBecameSellerQuery = () => {
  return queryOptions({
    queryKey: ["user-became-seller"],
    queryFn: async () => {
      const res = await getBecameSeller();
      return res;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getStatesQuery = () => {
  return queryOptions({
    queryKey: ["states"],
    queryFn: async () => {
      const res = await getState();
      return res;
    },
    staleTime: Infinity,
    retry: shouldRetry,
  });
};

export const getCitiesQuery = (stateId) => {
  return queryOptions({
    queryKey: ["cities", stateId],
    queryFn: async () => {
      if (!stateId) return { data: [] };
      const res = await getCities(stateId);
      return res;
    },
    staleTime: Infinity,
    retry: shouldRetry,
  });
};

export const getSellerInventoryInfiniteQuery = (payload = {}) => {
  const size = payload.size || 4;
  return {
    queryKey: ["seller-inventory-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getSellerInventory({
        ...payload,
        pageNo: pageParam,
        size,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage?.pagination?.totalPages || 1;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    retry: shouldRetry,
  };
};

export const getUserWishlistInfiniteQuery = (payload = {}) => {
  const size = payload.size || 8;
  return {
    queryKey: ["user-wishlist-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getWishList({
        ...payload,
        pageNo: pageParam,
        size,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const dataLength = lastPage?.data?.length || 0;
      return dataLength === size ? allPages.length + 1 : undefined;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  };
};

export const getFollowedConsultantsInfiniteQuery = (payload = {}) => {
  const size = payload.size || 4;
  return {
    queryKey: ["user-followed-consultants-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getFollowedConsultant({
        ...payload,
        pageNo: pageParam,
        size,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const dataLength = lastPage?.data?.length || 0;
      return dataLength === size ? allPages.length + 1 : undefined;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  };
};

export const getUserPreferencesQuery = () => {
  return queryOptions({
    queryKey: ["user-preferences"],
    queryFn: async () => {
      const res = await getUserPreference();
      return res?.data || null;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getUserProfileStrengthQuery = () => {
  return queryOptions({
    queryKey: ["user-profile-strength"],
    queryFn: async () => {
      const res = await getUserProfileStrength();
      return res;
    },
    staleTime: 15 * 60 * 1000,
    retry: shouldRetry,
  });
};
