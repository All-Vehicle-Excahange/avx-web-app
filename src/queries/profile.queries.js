import {
  getVerificationStatus,
  getDocumentStatus,
  getConsualtAdress,
  getConsualtProfile,
} from "@/services/profile.service";
import { getActiveBasicUpdate } from "@/services/consult.profile.service";
import { getUserProfileStrength } from "@/services/user.service";
import { queryOptions } from "@tanstack/react-query";

export const getVerificationStatusQuery = () => {
  return queryOptions({
    queryKey: ["profile-verification-status"],
    queryFn: async () => {
      const res = await getVerificationStatus();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getDocumentStatusQuery = () => {
  return queryOptions({
    queryKey: ["profile-document-status"],
    queryFn: async () => {
      const res = await getDocumentStatus();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getConsultantAddressQuery = () => {
  return queryOptions({
    queryKey: ["profile-consultant-address"],
    queryFn: async () => {
      const res = await getConsualtAdress();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getConsultantProfileQuery = () => {
  return queryOptions({
    queryKey: ["profile-consultant-profile"],
    queryFn: async () => {
      const res = await getConsualtProfile();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getActiveBasicUpdateQuery = () => {
  return queryOptions({
    queryKey: ["profile-active-basic-update"],
    queryFn: async () => {
      const res = await getActiveBasicUpdate();
      return res?.data;
    },
    staleTime: Infinity,
  });
};

export const getUserProfileStrengthQuery = () => {
  return queryOptions({
    queryKey: ["profile-user-profile-strength"],
    queryFn: async () => {
      const res = await getUserProfileStrength();
      return res?.data;
    },
    staleTime: Infinity,
  });
};
