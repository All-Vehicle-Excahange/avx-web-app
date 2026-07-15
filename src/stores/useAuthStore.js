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
    const userWithRefresh = {
      ...userData.userMaster,
      refreshToken: userData.refreshToken,
    };

    set({
      user: userWithRefresh,
      token,
      isLoggedIn: true,
      authInitialized: true,

      //  Close popup automatically after login
      isLoginPopupOpen: false,
      isSignupPopupOpen: false,
    });

    //  Persist in LocalStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userWithRefresh));
      localStorage.setItem("token", token);
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
      localStorage.removeItem("token");
      localStorage.removeItem("sellerTierData");
      localStorage.removeItem("sellerTier");
    }
  },

  //  INITIALIZE AUTH ON APP LOAD
  initializeAuth: () => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        set({
          user: JSON.parse(savedUser),
          token: savedToken,
          isLoggedIn: true,
          authInitialized: true,
        });
      } else {
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          authInitialized: true,
        });
      }
    }
  },
}));
