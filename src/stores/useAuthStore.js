"use client";

import { create } from "zustand";
import { queryClient } from "@/lib/queryClient";

export const useAuthStore = create((set) => ({
  //  AUTH DATA
  user: null,
  token: null,
  isLoggedIn: false,
  authInitialized: false,

  //  LOGIN & SIGNUP & PROFILE POPUP CONTROL
  isLoginPopupOpen: false,
  isSignupPopupOpen: false,
  isCompleteProfilePopupOpen: false,
  prefilledPhoneNumber: "",
  authPopupDefaultTab: "personal",

  openLoginPopup: (defaultTab = "personal") =>
    set({
      isLoginPopupOpen: true,
      isSignupPopupOpen: false,
      isCompleteProfilePopupOpen: false,
      authPopupDefaultTab: defaultTab,
    }),

  closeLoginPopup: () =>
    set({
      isLoginPopupOpen: false,
    }),

  openSignupPopup: (phoneNumber = "") =>
    set({
      isSignupPopupOpen: true,
      isLoginPopupOpen: false,
      isCompleteProfilePopupOpen: false,
      prefilledPhoneNumber: phoneNumber,
    }),

  closeSignupPopup: () =>
    set({
      isSignupPopupOpen: false,
      prefilledPhoneNumber: "",
    }),

  openCompleteProfilePopup: () =>
    set({
      isCompleteProfilePopupOpen: true,
      isLoginPopupOpen: false,
      isSignupPopupOpen: false,
    }),

  closeCompleteProfilePopup: () =>
    set({
      isCompleteProfilePopupOpen: false,
    }),

  //  LOGIN FUNCTION
  login: (userData, token) => {
    // Only use the user master data, never store the refresh token
    const userMaster = userData.userMaster || userData;

    set({
      user: userMaster,
      token,
      isLoggedIn: true,
      authInitialized: true,

      //  Close popup automatically after login
      isLoginPopupOpen: false,
      isSignupPopupOpen: false,
    });

    //  Persist in LocalStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userMaster));
    }
  },

  //  LOGOUT FUNCTION
  logout: () => {
    queryClient.clear();
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      authInitialized: true,

      //  Open popup after logout (optional)
      isLoginPopupOpen: true,
      isSignupPopupOpen: false,
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("sellerTierData");
      localStorage.removeItem("sellerTier");
    }
  },

  //  INITIALIZE AUTH ON APP LOAD
  initializeAuth: async () => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");

      // Pre-fill user to prevent UI flicker for returning users
      if (savedUser) {
        set({ user: JSON.parse(savedUser) });
      }

      try {
        // We import axios dynamically or use standard fetch to avoid circular deps
        const axios = require("axios").default;
        
        // Attempt to refresh token using the HttpOnly cookie
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (res.data?.data?.accessToken) {
          const userMaster = res.data.data.userMaster || (savedUser ? JSON.parse(savedUser) : null);
          set({
            user: userMaster,
            token: res.data.data.accessToken,
            isLoggedIn: true,
            authInitialized: true,
          });
          if (userMaster) {
            localStorage.setItem("user", JSON.stringify(userMaster));
          }
        } else {
          throw new Error("No access token in response");
        }
      } catch (error) {
        // Refresh failed (cookie expired, missing, etc.)
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          authInitialized: true,
          isLoginPopupOpen: true, // Always open popup when refresh fails (e.g. 401)
        });
        localStorage.removeItem("user");
      }
    }
  },
}));
