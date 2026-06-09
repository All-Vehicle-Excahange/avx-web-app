import { useAuthStore } from "@/stores/useAuthStore";

describe("useAuthStore State Manager & LocalStorage", () => {
  beforeEach(() => {
    // Clear localStorage and reset auth state before each test
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    useAuthStore.getState().logout();
  });

  test("initial state should be logged out", () => {
    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  test("login action should populate store state and localStorage correctly", () => {
    const mockUserData = {
      userMaster: {
        id: 123,
        phoneNumber: "9876543210",
        firstname: "Test",
        lastname: "User",
        userRole: "USER",
      },
      refreshToken: "mock-refresh-token",
    };
    const mockToken = "mock-access-token";

    // Trigger the login action
    useAuthStore.getState().login(mockUserData, mockToken);

    const state = useAuthStore.getState();

    // Verify Zustand state is updated
    expect(state.isLoggedIn).toBe(true);
    expect(state.token).toBe("mock-access-token");
    expect(state.user.phoneNumber).toBe("9876543210");
    expect(state.user.firstname).toBe("Test");
    expect(state.user.lastname).toBe("User");
    expect(state.user.refreshToken).toBe("mock-refresh-token");

    // Verify localStorage has been populated correctly
    expect(localStorage.getItem("token")).toBe("mock-access-token");
    
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    expect(storedUser.phoneNumber).toBe("9876543210");
    expect(storedUser.firstname).toBe("Test");
    expect(storedUser.lastname).toBe("User");
    expect(storedUser.refreshToken).toBe("mock-refresh-token");
  });

  test("logout action should clear store state and localStorage correctly", () => {
    const mockUserData = {
      userMaster: { id: 123 },
      refreshToken: "mock-refresh-token",
    };
    
    // Log in first
    useAuthStore.getState().login(mockUserData, "mock-token");
    expect(localStorage.getItem("token")).toBe("mock-token");

    // Trigger logout
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();

    // Verify Zustand state is cleared
    expect(state.isLoggedIn).toBe(false);
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();

    // Verify localStorage is cleared
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
