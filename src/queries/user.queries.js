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
  getAllReview,
  getConsualtInventory,
  getStoreFrontByUsername,
  getAboutUsStoreFrontByUserName,
  getWhyBuyHereStoreFrontByUserName,
  getFourWheelWithTag,
  getTopPicsFour,
  getAvxIsnpectedFourWheel,
  getHomeFeedConsult,
  getRecentlySold,
  getAndCheckEligbleForReview,
} from "@/services/user.service";
import {
  getFilteredVehicles,
  getFilterConsualt,
} from "@/services/filter";
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

export const getStoreFrontReviewsInfiniteQuery = (username, payload = {}) => {
  const size = payload.size || 10;
  return {
    queryKey: ["storefront-reviews-infinite", username, payload],
    queryFn: async ({ pageParam = 1 }) => {
      if (!username) return { data: { reviews: [], reviewSummary: null } };
      const res = await getAllReview(username, {
        ...payload,
        pageNo: pageParam,
        size,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const pageInfo = lastPage?.pagination || {};
      const totalPages = pageInfo.totalPages || 1;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 15 * 60 * 1000,
    retry: shouldRetry,
  };
};

export const getStoreFrontInventoryInfiniteQuery = (payload = {}) => {
  const size = payload.size || 4;
  return {
    queryKey: ["storefront-inventory-infinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getConsualtInventory({
        ...payload,
        pageNo: pageParam,
        size,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const pageInfo = lastPage?.pagination || {};
      const totalPages = pageInfo.totalPages || 1;
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 15 * 60 * 1000,
    retry: shouldRetry,
  };
};

export const getStoreFrontByUsernameQuery = (username) => {
  return queryOptions({
    queryKey: ["storefront-by-username", username],
    queryFn: async () => {
      if (!username) return null;
      const res = await getStoreFrontByUsername(username);
      return res?.data || null;
    },
    staleTime: 15 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getAboutUsStoreFrontByUserNameQuery = (username) => {
  return queryOptions({
    queryKey: ["about-us-storefront", username],
    queryFn: async () => {
      if (!username) return null;
      const res = await getAboutUsStoreFrontByUserName(username);
      return res?.data || null;
    },
    staleTime: 15 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getWhyBuyHereStoreFrontByUserNameQuery = (username) => {
  return queryOptions({
    queryKey: ["why-buy-here-storefront", username],
    queryFn: async () => {
      if (!username) return null;
      const res = await getWhyBuyHereStoreFrontByUserName(username);
      return res?.data || null;
    },
    staleTime: 15 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getVehiclesByTagQuery = (activeType, payload) => {
  return queryOptions({
    queryKey: ["vehicles-by-tag", activeType, payload],
    queryFn: async () => {
      if (!payload?.vehicleTag) return [];
      const vehicleType = activeType === "4-Wheeler" ? "FOUR_WHEELER" : "TWO_WHEELER";
      const res = await getFourWheelWithTag({
        ...payload,
        vehicleType,
      });
      return res?.data || [];
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getTopPicsQuery = (activeType, payload) => {
  return queryOptions({
    queryKey: ["top-pics", activeType, payload],
    queryFn: async () => {
      const vehicleType = activeType === "4-Wheeler" ? "FOUR_WHEELER" : "TWO_WHEELER";
      const res = await getTopPicsFour({
        ...payload,
        vehicleType,
      });
      return res?.data || [];
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getAvxInspectedQuery = (activeType, payload) => {
  return queryOptions({
    queryKey: ["avx-inspected", activeType, payload],
    queryFn: async () => {
      const vehicleType = activeType === "2-Wheeler" ? "TWO_WHEELER" : "FOUR_WHEELER";
      const res = await getAvxIsnpectedFourWheel({
        ...payload,
        vehicleType,
      });
      return res?.data || [];
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getHomeFeedConsultQuery = (payload) => {
  return queryOptions({
    queryKey: ["home-feed-consult", payload],
    queryFn: async () => {
      const res = await getHomeFeedConsult(payload);
      const fetchedData = res?.data || [];
      return fetchedData.map((item) => ({
        id: item.id,
        username: item.username,
        name: item.consultationName || "-",
        image: item.bannerUrl || "/cs.webp",
        logo: item.logoUrl || "/cs.webp",
        rating: item.averageRating ?? 0,
        reviews: item.totalReviews ?? 0,
        vehicleCount: item.availableVehicles ?? 0,
        services: item.services || [],
        vehicleTypes: item.vehicleTypes || [],
        location:
          item.address?.city && item.address?.country
            ? `${item.address.city}, ${item.address.country}`
            : "-",
        priceRange:
          item.minVehiclePrice && item.maxVehiclePrice
            ? `${(item.minVehiclePrice / 100000).toFixed(1)}L - ${(item.maxVehiclePrice / 100000).toFixed(1)}L`
            : "-",
        tierTitle: item.tierTitle,
        isSponsored: item.isActiveTier || false,
      }));
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getRecentlySoldQuery = (payload) => {
  return queryOptions({
    queryKey: ["recently-sold", payload],
    queryFn: async () => {
      const res = await getRecentlySold(payload);
      return res?.data || [];
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getFilteredVehiclesQuery = (body, params) => {
  return queryOptions({
    queryKey: ["filtered-vehicles", body, params],
    queryFn: async () => {
      const res = await getFilteredVehicles(body, params);
      return res?.data || {};
    },
    staleTime: 5 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getFilterConsualtQuery = (payload) => {
  return queryOptions({
    queryKey: ["filtered-consultants", payload],
    queryFn: async () => {
      const res = await getFilterConsualt(payload);
      return res?.data || [];
    },
    staleTime: 5 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getAndCheckEligbleForReviewQuery = (inquiryId, enabled = true) => {
  return queryOptions({
    queryKey: ["check-eligible-for-review", inquiryId],
    queryFn: async () => {
      if (!inquiryId) return null;
      const res = await getAndCheckEligbleForReview(inquiryId);
      return res?.data || null;
    },
    enabled: !!inquiryId && enabled,
    staleTime: 0,
    retry: shouldRetry,
  });
};