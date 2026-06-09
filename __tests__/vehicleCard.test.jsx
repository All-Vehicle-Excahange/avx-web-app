import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { addWishList, removeWishList } from "@/services/user.service";

// Mock router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock user services
jest.mock("@/services/user.service", () => ({
  addWishList: jest.fn(),
  removeWishList: jest.fn(),
}));

// Mock Zustand stores
jest.mock("@/stores/useAuthStore", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock("@/stores/useCompareStore", () => ({
  useCompareStore: jest.fn(),
}));

// Mock sub-popups
jest.mock("@/components/auth/LoginPopup", () => {
  return ({ isOpen, onClose }) =>
    isOpen ? (
      <div data-testid="mock-login-popup">
        <button onClick={onClose}>Close Login</button>
      </div>
    ) : null;
});

jest.mock("@/components/auth/SignupPopup", () => {
  return ({ isOpen, onClose }) =>
    isOpen ? (
      <div data-testid="mock-signup-popup">
        <button onClick={onClose}>Close Signup</button>
      </div>
    ) : null;
});

// Mock lucide-react icons to simplify DOM
jest.mock("lucide-react", () => ({
  Fuel: () => <span data-testid="icon-fuel" />,
  Heart: ({ className }) => <span data-testid="icon-heart" className={className} />,
  MapPinned: () => <span data-testid="icon-mappinned" />,
  Settings2: () => <span data-testid="icon-settings" />,
  Star: () => <span data-testid="icon-star" />,
  User: () => <span data-testid="icon-user" />,
  Users: () => <span data-testid="icon-users" />,
  ArrowLeftRight: ({ className }) => <span data-testid="icon-compare" className={className} />,
}));

const mockVehicleData = {
  id: "vehicle-123",
  makerName: "Hyundai",
  modelName: "i20",
  variantName: "Asta",
  thumbnailUrl: "/hyundai-i20.webp",
  yearOfMfg: 2021,
  transmissionType: "MANUAL",
  fuelType: "PETROL",
  ownership: "First",
  avxInspectionRating: 4.5,
  vehicleOwner: {
    firstname: "Nihal",
    lastname: "Chaudhary",
  },
  address: {
    city: "Chhapi",
    country: "India",
  },
  price: 650000,
  sponsored: false,
  isWishlisted: false,
};

describe("VehicleCard Component Tests", () => {
  let mockIsLoggedIn = false;
  let mockCompareVehicles = [];
  const mockAddToCompare = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Reset default mock states
    mockIsLoggedIn = false;
    mockCompareVehicles = [];

    useAuthStore.mockImplementation((selector) => {
      return selector({ isLoggedIn: mockIsLoggedIn });
    });

    useCompareStore.mockImplementation(() => ({
      compareVehicles: mockCompareVehicles,
      addToCompare: mockAddToCompare,
    }));

    addWishList.mockResolvedValue({ success: true });
    removeWishList.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test("renders vehicle details correctly", () => {
    render(<VehicleCard data={mockVehicleData} />);

    // Verify title
    expect(screen.getByText("Hyundai i20 Asta")).toBeInTheDocument();
    // Verify owner
    expect(screen.getByText("Nihal Chaudhary")).toBeInTheDocument();
    // Verify location
    expect(screen.getByText("Chhapi, India")).toBeInTheDocument();
    // Verify transmission, fuel, ownership, rating
    expect(screen.getByText("Manual")).toBeInTheDocument();
    expect(screen.getByText("Petrol")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    // Verify price
    expect(screen.getByText("₹ 6,50,000")).toBeInTheDocument();
  });

  test("triggers router push with correct slug on card click", () => {
    render(<VehicleCard data={mockVehicleData} source="search" />);

    // Click the card body
    const cardBody = screen.getByText("Hyundai i20 Asta").closest(".group\\/card");
    fireEvent.click(cardBody);

    // Slug: buy-used-hyundai-i20-2021-cars-chhapi
    expect(mockPush).toHaveBeenCalledWith(
      "/vehicle/details/buy-used-hyundai-i20-2021-cars-chhapi/vehicle-123?source=search"
    );
  });

  test("wishlist click as guest opens login popup", () => {
    mockIsLoggedIn = false;
    render(<VehicleCard data={mockVehicleData} />);

    const heartBtn = screen.getByTestId("icon-heart").parentElement;
    fireEvent.click(heartBtn);

    // Verify login popup shows up
    expect(screen.getByTestId("mock-login-popup")).toBeInTheDocument();
    expect(addWishList).not.toHaveBeenCalled();
  });

  test("wishlist click as logged-in user triggers toggle API after 1s debounce", async () => {
    mockIsLoggedIn = true;
    render(<VehicleCard data={mockVehicleData} />);

    const heartIcon = screen.getByTestId("icon-heart");
    const heartBtn = heartIcon.parentElement;

    // Verify initial heart style (not filled)
    expect(heartIcon.className).toContain("text-white");

    // Click wishlist button
    fireEvent.click(heartBtn);

    // Verify local heart changes style immediately (optimistic UI)
    expect(heartIcon.className).toContain("fill-red-500");

    // API should not be called yet due to 1s debounce
    expect(addWishList).not.toHaveBeenCalled();

    // Advance timers by 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Verify API is triggered with vehicle ID
    await waitFor(() => {
      expect(addWishList).toHaveBeenCalledWith("vehicle-123");
    });
  });

  test("compare click as guest with 0 compared vehicles adds to compare", () => {
    mockIsLoggedIn = false;
    mockCompareVehicles = [];
    render(<VehicleCard data={mockVehicleData} />);

    const compareBtn = screen.getByTestId("icon-compare").parentElement;
    fireEvent.click(compareBtn);

    expect(mockAddToCompare).toHaveBeenCalledWith(mockVehicleData);
    expect(screen.queryByTestId("mock-login-popup")).not.toBeInTheDocument();
  });

  test("compare click as guest with >= 1 compared vehicles opens login popup", () => {
    mockIsLoggedIn = false;
    mockCompareVehicles = [{ id: "vehicle-other" }];
    render(<VehicleCard data={mockVehicleData} />);

    const compareBtn = screen.getByTestId("icon-compare").parentElement;
    fireEvent.click(compareBtn);

    expect(mockAddToCompare).not.toHaveBeenCalled();
    expect(screen.getByTestId("mock-login-popup")).toBeInTheDocument();
  });

  test("compare click as logged-in user adds to comparison directly", () => {
    mockIsLoggedIn = true;
    mockCompareVehicles = [{ id: "vehicle-other" }];
    render(<VehicleCard data={mockVehicleData} />);

    const compareBtn = screen.getByTestId("icon-compare").parentElement;
    fireEvent.click(compareBtn);

    expect(mockAddToCompare).toHaveBeenCalledWith(mockVehicleData);
    expect(screen.queryByTestId("mock-login-popup")).not.toBeInTheDocument();
  });
});
