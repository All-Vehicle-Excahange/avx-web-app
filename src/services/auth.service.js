import axiosInstance, { handleResponse } from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/useAuthStore";

const ENDPOINT = {
  getOtp: "/auth/get-otp",
  signup: "/auth/signup",
  login: "/auth/login",
  refresh: "/auth/refresh",
  logout: "/users/profile/logout",
  googleVerify: "/auth/google/verify",
  googleSignupVerify: "/auth/google/signup/verify",
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

  const normalizedResponse = handleResponse(res);

  if (normalizedResponse.success && normalizedResponse.data?.accessToken) {
    const user = normalizedResponse.data.userMaster || normalizedResponse.data;
    useAuthStore.getState().login(
      user,
      normalizedResponse.data.accessToken,
    );
  }

  return normalizedResponse;
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
  // Use plain axios to avoid triggering the interceptor if this fails (e.g. invalid cookie)
  const axios = require("axios").default;
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${ENDPOINT.refresh}`, {}, { withCredentials: true });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post(ENDPOINT.logout);
  return res.data;
};

export const googleVerify = async ({ googleIdToken }) => {
  const res = await axiosInstance.post(ENDPOINT.googleVerify, {
    googleIdToken,
  });

  const normalizedResponse = handleResponse(res);
  if (normalizedResponse.success && normalizedResponse.data?.authResponse?.accessToken) {
    const authData = normalizedResponse.data.authResponse;
    const user = authData.userMaster || authData;
    useAuthStore.getState().login(
      user,
      authData.accessToken,
    );
  }

  return normalizedResponse;
};

export const googleSignupVerify = async ({
  googleIdToken,
  phoneNumber,
  countryCode,
  otp,
  isApplyForConsultation,
}) => {
  const res = await axiosInstance.post(ENDPOINT.googleSignupVerify, {
    googleIdToken,
    phoneNumber,
    countryCode,
    otp,
    isApplyForConsultation,
  });

  const normalizedResponse = handleResponse(res);
  if (normalizedResponse.success && normalizedResponse.data?.accessToken) {
    const user = normalizedResponse.data.userMaster || normalizedResponse.data;
    useAuthStore.getState().login(
      user,
      normalizedResponse.data.accessToken,
    );
  }

  return normalizedResponse;
};