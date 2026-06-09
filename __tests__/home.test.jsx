import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  within,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/index";
import {
  getTopPicsFour,
  getTopPicsTwo,
  getAvxIsnpectedFourWheel,
  getAvxIsnpectedTwoWheel,
  getFourWheelWithTag,
  getTwoWheelWithTag,
} from "@/services/user.service";

// Mock the user services
jest.mock("@/services/user.service", () => ({
  getWishList: jest.fn().mockResolvedValue({ data: [] }),
  getFollowedConsultant: jest.fn().mockResolvedValue({ data: [] }),
  getUserPreference: jest.fn().mockResolvedValue({ data: {} }),
  getSellerInventory: jest.fn().mockResolvedValue({ data: [] }),
  getuserProfile: jest.fn().mockResolvedValue({ data: {} }),
  checkIsMetaExist: jest.fn().mockResolvedValue({ data: {} }),
  getuserProfileMeta: jest.fn().mockResolvedValue({ data: {} }),
  getUserSellerSuspend: jest.fn().mockResolvedValue({ data: {} }),
  getBecameSeller: jest.fn().mockResolvedValue({ data: {} }),
  getState: jest.fn().mockResolvedValue({ data: [] }),
  getCities: jest.fn().mockResolvedValue({ data: [] }),
  getUserProfileStrength: jest.fn().mockResolvedValue({ data: {} }),
  getAllReview: jest.fn().mockResolvedValue({ data: [] }),
  getConsualtInventory: jest.fn().mockResolvedValue({ data: [] }),
  getStoreFrontByUsername: jest.fn().mockResolvedValue({ data: {} }),
  getAboutUsStoreFrontByUserName: jest.fn().mockResolvedValue({ data: {} }),
  getWhyBuyHereStoreFrontByUserName: jest.fn().mockResolvedValue({ data: {} }),
  getFourWheelWithTag: jest.fn().mockResolvedValue({ data: [] }),
  getTwoWheelWithTag: jest.fn().mockResolvedValue({ data: [] }),
  getTopPicsFour: jest.fn().mockResolvedValue({ data: [] }),
  getTopPicsTwo: jest.fn().mockResolvedValue({ data: [] }),
  getAvxIsnpectedFourWheel: jest.fn().mockResolvedValue({ data: [] }),
  getAvxIsnpectedTwoWheel: jest.fn().mockResolvedValue({ data: [] }),
  getHomeFeedConsult: jest.fn().mockResolvedValue({ data: [] }),
  getRecentlySold: jest.fn().mockResolvedValue({ data: [] }),
}));

// Mock routing and other Next.js-specific modules
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    };
  },
}));

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }) => <>{children}</>,
  };
});

// Mock unrelated/static components to keep tests fast and isolated
jest.mock("@/components/features/home/HeroSection", () => () => (
  <div data-testid="mock-hero-section" />
));
jest.mock("@/components/features/home/ShowcaseSection", () => () => (
  <div data-testid="mock-showcase-section" />
));
jest.mock("@/components/features/home/ReecommSponcerSection", () => () => (
  <div data-testid="mock-sponsor-section" />
));
jest.mock("@/components/features/home/SellVehicleBanner", () => () => (
  <div data-testid="mock-sell-banner" />
));
jest.mock("@/components/features/home/AutoConsultPicsSection", () => () => (
  <div data-testid="mock-consult-section" />
));
jest.mock("@/components/features/home/BecameBanner", () => () => (
  <div data-testid="mock-became-banner" />
));
jest.mock("@/components/features/home/ConsultBanner", () => () => (
  <div data-testid="mock-consult-banner" />
));
jest.mock("@/components/features/home/RecentrlySold", () => () => (
  <div data-testid="mock-recently-sold" />
));
jest.mock("@/components/features/home/StorySection", () => () => (
  <div data-testid="mock-story-section" />
));
jest.mock("@/components/features/home/SayHello", () => () => (
  <div data-testid="mock-say-hello" />
));
jest.mock("@/components/features/home/AboutSection", () => () => (
  <div data-testid="mock-about-section" />
));
jest.mock("@/components/features/home/DownloadAppSection", () => () => (
  <div data-testid="mock-download-app-section" />
));
jest.mock("@/components/layout/FooterLink", () => () => (
  <div data-testid="mock-footer-link" />
));
jest.mock("@/components/layout/Footer", () => () => (
  <div data-testid="mock-footer" />
));
jest.mock("@/components/layout/Layout", () => {
  return ({ children }) => <div data-testid="mock-layout">{children}</div>;
});

// Helper to create a fresh QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

describe("Home Page Tabs API Calls", () => {
  let queryClient;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    queryClient = createTestQueryClient();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test("verifies TopPicsSection switches active tab and calls getTopPicsTwo", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Initial render triggers getTopPicsFour
    await waitFor(() => {
      expect(getTopPicsFour).toHaveBeenCalled();
    });

    const topPicsHeader = screen.getByRole("heading", {
      name: /Top picks Vehicle For You/i,
    });
    const topPicsHeaderWrapper =
      topPicsHeader.closest(".shrink-0") ||
      topPicsHeader.parentElement.parentElement;
    const topPics2WBtn = within(topPicsHeaderWrapper).getByRole("button", {
      name: /2-Wheeler/i,
    });

    // Click 2-Wheeler button
    fireEvent.click(topPics2WBtn);

    // Advance fake timers by 400ms for debounce
    act(() => {
      jest.advanceTimersByTime(400);
    });

    // Verify getTopPicsTwo gets called
    await waitFor(() => {
      expect(getTopPicsTwo).toHaveBeenCalled();
    });
  });

  test("verifies AvxInspected switches active tab and calls getAvxIsnpectedTwoWheel", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Initial render triggers getAvxIsnpectedFourWheel
    await waitFor(() => {
      expect(getAvxIsnpectedFourWheel).toHaveBeenCalled();
    });

    const inspectedHeader = screen.getByRole("heading", {
      name: /Reecomm Inspected Vehicles/i,
    });
    const inspectedHeaderWrapper =
      inspectedHeader.closest(".shrink-0") ||
      inspectedHeader.parentElement.parentElement;
    const inspected2WBtn = within(inspectedHeaderWrapper).getByRole("button", {
      name: /2-Wheeler/i,
    });

    // Click 2-Wheeler button
    fireEvent.click(inspected2WBtn);

    // Advance fake timers by 400ms for debounce
    act(() => {
      jest.advanceTimersByTime(400);
    });

    // Verify getAvxIsnpectedTwoWheel gets called
    await waitFor(() => {
      expect(getAvxIsnpectedTwoWheel).toHaveBeenCalled();
    });
  });

  test("verifies CategoriesSections switches active tab and calls getTwoWheelWithTag", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Initial render triggers getFourWheelWithTag (default urban-rides maps to URBAN_RIDE)
    await waitFor(() => {
      expect(getFourWheelWithTag).toHaveBeenCalledWith(
        expect.objectContaining({ vehicleTag: "URBAN_RIDE" }),
      );
    });

    const categoriesHeader = screen.getByRole("heading", {
      name: /Not sure what to buy\?/i,
    });
    const categoriesSection =
      categoriesHeader.closest("section") ||
      categoriesHeader.parentElement.parentElement;
    const categories2WBtn = within(categoriesSection).getByRole("button", {
      name: /2-Wheeler/i,
    });

    // Click 2-Wheeler button
    fireEvent.click(categories2WBtn);

    // Advance fake timers by 400ms for debounce
    act(() => {
      jest.advanceTimersByTime(400);
    });

    // Verify getTwoWheelWithTag gets called (default tab on 2-Wheeler is scooters mapping to SCOOTER)
    await waitFor(() => {
      expect(getTwoWheelWithTag).toHaveBeenCalledWith(
        expect.objectContaining({ vehicleTag: "SCOOTER" }),
      );
    });
  });
});
