"use client";

import { create } from "zustand";
import { queryClient } from "@/lib/queryClient";
import { sendDeviceInfo } from "@/lib/device.util";
import { identifyUser, resetUser } from "@/lib/amplitude";

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
  /** Funnel props for Amplitude auth events until login/signup completes */
  authFunnelContext: null,

  setAuthFunnelContext: (ctx) =>
    set({
      authFunnelContext: ctx
        ? {
            entry_context: ctx.entry_context || "direct",
            trigger_action: ctx.trigger_action || "login_click",
            user_role_intent: ctx.user_role_intent || "buyer",
          }
        : null,
    }),

  clearAuthFunnelContext: () => set({ authFunnelContext: null }),

  /**
   * Open login popup. Backward compatible:
   * - openLoginPopup() / openLoginPopup("personal"|"consultant")
   * - openLoginPopup({ defaultTab, entry_context, trigger_action, user_role_intent })
   */
  openLoginPopup: (arg) => {
    const isLinkExpiredPage =
      typeof window !== "undefined" &&
      window.location.pathname === "/link-expired";

    const hasTokenInUrl =
      typeof window !== "undefined" &&
      !isLinkExpiredPage &&
      (window.location.search?.includes("magicToken=") ||
        window.location.search?.includes("token=") ||
        new URLSearchParams(window.location.search).has("magicToken") ||
        new URLSearchParams(window.location.search).has("token"));

    if (hasTokenInUrl) {
      return;
    }

    let defaultTab = "personal";
    let funnel = {
      entry_context: "direct",
      trigger_action: "login_click",
      user_role_intent: "buyer",
    };

    if (typeof arg === "string") {
      defaultTab = arg || "personal";
      if (defaultTab === "consultant") {
        funnel = {
          entry_context: "become_consultant",
          trigger_action: "consultant_signup",
          user_role_intent: "consultant",
        };
      }
    } else if (arg && typeof arg === "object") {
      defaultTab = arg.defaultTab || "personal";
      funnel = {
        entry_context: arg.entry_context || "direct",
        trigger_action: arg.trigger_action || "login_click",
        user_role_intent:
          arg.user_role_intent ||
          (defaultTab === "consultant" ? "consultant" : "buyer"),
      };
    }

    set({
      isLoginPopupOpen: true,
      isSignupPopupOpen: false,
      isCompleteProfilePopupOpen: false,
      authPopupDefaultTab: defaultTab,
      authFunnelContext: funnel,
    });
  },

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

    identifyUser(userMaster);

    // Force sending device info on login
    sendDeviceInfo(true);
  },

  //  LOGOUT FUNCTION
  logout: () => {
    try {
      queryClient.clear();
      queryClient.invalidateQueries();
    } catch (e) {
      console.error("Error clearing query cache on logout:", e);
    }
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      authInitialized: true,

      //  Open popup after logout (optional)
      isLoginPopupOpen: true,
      isSignupPopupOpen: false,
      authFunnelContext: {
        entry_context: "direct",
        trigger_action: "login_click",
        user_role_intent: "buyer",
      },
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("sellerTierData");
      localStorage.removeItem("sellerTier");
    }

    resetUser();
  },

  //  INITIALIZE AUTH ON APP LOAD
  initializeAuth: async (force = false) => {
    if (typeof window !== "undefined") {
      const hasTokenInUrl =
        !force &&
        (window.location.search?.includes("token=") ||
          window.location.search?.includes("magicToken=") ||
          new URLSearchParams(window.location.search).has("token") ||
          new URLSearchParams(window.location.search).has("magicToken"));

      if (hasTokenInUrl) {
        set({ authInitialized: true });
        return;
      }

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
            identifyUser(userMaster);
          }
        } else {
          throw new Error("No access token in response");
        }
      } catch (error) {
        // Refresh failed (cookie expired, missing, etc.)
        const hasTokenInUrl =
          typeof window !== "undefined" &&
          (window.location.search?.includes("token=") ||
            window.location.search?.includes("magicToken=") ||
            new URLSearchParams(window.location.search).has("token") ||
            new URLSearchParams(window.location.search).has("magicToken"));

        set({
          user: null,
          token: null,
          isLoggedIn: false,
          authInitialized: true,
          isLoginPopupOpen: false,
        });
        localStorage.removeItem("user");
      }
    }
  },
}));