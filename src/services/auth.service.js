import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/useAuthStore";

const ENDPOINT = {
  getOtp: "/auth/get-otp",
  signup: "/auth/signup",
  login: "/auth/login",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
};

export const getOtp = async ({
  phoneNumber,
  countryCode,
  requestType,
  email,
}) => {
  const res = await axiosInstance.post(ENDPOINT.getOtp, {
    phoneNumber,
    countryCode,
    requestType,
    email,
  });
  return res.data;
};

export const signup = async ({
  firstname,
  lastname,
  email,
  phoneNumber,
  countryCode,
  isApplyForConsultation,
  otp,
}) => {
  const res = await axiosInstance.post(ENDPOINT.signup, {
    firstname,
    lastname,
    email,
    phoneNumber,
    countryCode,
    isApplyForConsultation,
    otp,
  });

  if (res.data?.data && res.data.data?.accessToken) {
    useAuthStore
      .getState()
      .login(
        { userMaster: user, refreshToken: user.refreshToken },
        res.data.data.accessToken,
      );
  }
  return res.data;
};

export const login = async ({ phoneNumber, countryCode, otp }) => {
  const res = await axiosInstance.post(ENDPOINT.login, {
    phoneNumber,
    countryCode,
    otp,
  });

  if (res.data?.data?.accessToken) {
    useAuthStore.getState().login(res.data.data, res.data.data.accessToken);
  }

  return res.data;
};

export const refreshToken = async () => {
  const res = await axiosInstance.post(ENDPOINT.refresh);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post(ENDPOINT.logout);
  return res.data;
};
