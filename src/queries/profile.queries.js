import {
  getVerificationStatus,
  getDocumentStatus,
  getConsualtAdress,
  getConsualtProfile,
} from "@/services/profile.service";
import { getActiveBasicUpdate } from "@/services/consult.profile.service";
import { getUserProfileStrength } from "@/services/user.service";
import { queryOptions } from "@tanstack/react-query";

// Skip retries for status codes that are definitive (no-profile / token invalid).
// 494 = custom "profile not found / not eligible", 404 = not found.
const shouldRetry = (failureCount, error) => {
  const status = error?.response?.status ?? error?.status;
  if (status === 494 || status === 404 || status === 403) return false;
  return failureCount < 2; // allow at most 1 retry for transient errors
};

export const getVerificationStatusQuery = () => {
  return queryOptions({
    queryKey: ["profile-verification-status"],
    queryFn: async () => {
      const res = await getVerificationStatus();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getDocumentStatusQuery = () => {
  return queryOptions({
    queryKey: ["profile-document-status"],
    queryFn: async () => {
      const res = await getDocumentStatus();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getConsultantAddressQuery = () => {
  return queryOptions({
    queryKey: ["profile-consultant-address"],
    queryFn: async () => {
      const res = await getConsualtAdress();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getConsultantProfileQuery = () => {
  return queryOptions({
    queryKey: ["profile-consultant-profile"],
    queryFn: async () => {
      const res = await getConsualtProfile();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getActiveBasicUpdateQuery = () => {
  return queryOptions({
    queryKey: ["profile-active-basic-update"],
    queryFn: async () => {
      const res = await getActiveBasicUpdate();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};

export const getUserProfileStrengthQuery = () => {
  return queryOptions({
    queryKey: ["profile-user-profile-strength"],
    queryFn: async () => {
      const res = await getUserProfileStrength();
      return res?.data;
    },
    staleTime: 10 * 60 * 1000,
    retry: shouldRetry,
  });
};
