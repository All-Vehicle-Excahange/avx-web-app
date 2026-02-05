"use client";

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // ✅ AUTH DATA
  user: null,
  token: null,
  isLoggedIn: false,
  authInitialized: false,

  // ✅ LOGIN POPUP CONTROL
  isLoginPopupOpen: false,

  openLoginPopup: () =>
    set({
      isLoginPopupOpen: true,
    }),

  closeLoginPopup: () =>
    set({
      isLoginPopupOpen: false,
    }),

  // ✅ LOGIN FUNCTION
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

      // ✅ Close popup automatically after login
      isLoginPopupOpen: false,
    });

    // ✅ Persist in LocalStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userWithRefresh));
      localStorage.setItem("token", token);
    }
  },

  // ✅ LOGOUT FUNCTION
  logout: () => {
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      authInitialized: true,

      // ✅ Open popup after logout (optional)
      isLoginPopupOpen: true,
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  },

  // ✅ INITIALIZE AUTH ON APP LOAD
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
