"use client";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  authInitialized: false,

  login: (userData, token) => {
    // ✅ Store userMaster + refreshToken together
    const userWithRefresh = {
      ...userData.userMaster,
      refreshToken: userData.refreshToken,
    };

    set({
      user: userWithRefresh,
      token,
      isLoggedIn: true,
      authInitialized: true,
    });

    // ✅ Persist correct full user object
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userWithRefresh)); // ✅ FIXED
      localStorage.setItem("token", token);
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      authInitialized: true,
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  },

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
