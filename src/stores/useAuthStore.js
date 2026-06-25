"use client";

import { create } from "zustand";

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

  openLoginPopup: () =>
    set({
      isLoginPopupOpen: true,
      isSignupPopupOpen: false,
      isCompleteProfilePopupOpen: false,
    }),

  closeLoginPopup: () =>
    set({
      isLoginPopupOpen: false,
    }),

  openSignupPopup: () =>
    set({
      isSignupPopupOpen: true,
      isLoginPopupOpen: false,
      isCompleteProfilePopupOpen: false,
    }),

  closeSignupPopup: () =>
    set({
      isSignupPopupOpen: false,
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
