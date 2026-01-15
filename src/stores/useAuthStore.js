"use client";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    // 🧩 State
    user: null,
    token: null,
    isLoggedIn: false,
    authInitialized: false, // Track if auth check is complete

    // 🧠 Actions
    login: (userData, token) => {
        // Save in Zustand
        set({
            user: userData,
            token: token,
            isLoggedIn: true,
            authInitialized: true,
        });

        // Persist to localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
        }
    },

    logout: () => {
        // Clear Zustand state
        set({
            user: null,
            token: null,
            isLoggedIn: false,
            authInitialized: true,
        });

        // Clear localStorage
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    },

    // 🔁 Initialize from localStorage (called on app start)
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
                // User is not logged in
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