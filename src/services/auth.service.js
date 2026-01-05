import axiosInstance from "@/lib/axiosInstance";

const ENDPOINT = {
  getOtp: "/auth/get-otp",
  signup: "/auth/signup",
  login: "/auth/login",
};

// 🔹 STEP 1: SEND OTP
export const getOtp = async ({ phoneNumber, countryCode, requestType }) => {
  const res = await axiosInstance.post(ENDPOINT.getOtp, {
    phoneNumber,
    countryCode,
    requestType,
  });
  return res.data;
};

// 🔹 STEP 2: SIGNUP (OTP VERIFY + USER CREATE)
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
  return res.data;
};


export const login = async ({ phoneNumber, countryCode, otp }) => {
  const res = await axiosInstance.post("/auth/login", {
    phoneNumber,
    countryCode,
    otp,
  });
  return res.data;
};

