import React from "react";
import { render, screen } from "@testing-library/react";
import ConsultantCard from "@/components/ui/const/ConsultCard";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, quality, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || "mock image"} data-fill={fill ? "true" : undefined} />;
  },
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Bike: () => <span data-testid="icon-bike" />,
  Car: () => <span data-testid="icon-car" />,
  Star: () => <span data-testid="icon-star" />,
  BadgeCheck: () => <span data-testid="icon-badgecheck" />,
}));

const mockConsultantData = {
  id: "consult-123",
  username: "royal-motors",
  name: "Royal Motors Consultant",
  logo: "/royal-logo.png",
  image: "/royal-banner.png",
  rating: 4.7,
  reviews: 85,
  vehicleCount: 15,
  services: ["INSPECTION_SERVICE", "VEHICLE_VALUATION", "RTO_REGISTRATION"],
  vehicleTypes: ["TWO_WHEELER", "FOUR_WHEELER"],
  location: "Chhapi, Gujarat",
  priceRange: "1.2L - 5.5L",
};

describe("ConsultantCard Component Tests", () => {
  beforeAll(() => {
    // Mock offsetWidth on HTMLElement to test layout list items in JSDOM
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      get: function () {
        if (this.tagName === "SPAN") {
          return 50; // Mock service tags width
        }
        return 300; // Mock parent container width
      },
    });
  });

  test("renders consultant details correctly", () => {
    render(<ConsultantCard data={mockConsultantData} />);

    // Verify name
    expect(screen.getByText("Royal Motors Consultant")).toBeInTheDocument();
    // Verify location
    expect(screen.getByText("Chhapi, Gujarat")).toBeInTheDocument();
    // Verify rating & reviews text
    expect(screen.getByText("4.7 • 85 Reviews")).toBeInTheDocument();
    // Verify price range
    expect(screen.getByText("1.2L - 5.5L")).toBeInTheDocument();
    // Verify available vehicle count
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  test("renders correct category icons based on vehicleTypes", () => {
    const { rerender } = render(<ConsultantCard data={mockConsultantData} />);

    // Both Bike and Car should render because both are in mock data
    expect(screen.getByTestId("icon-bike")).toBeInTheDocument();
    expect(screen.getByTestId("icon-car")).toBeInTheDocument();

    // Rerender with only FOUR_WHEELER
    const onlyFourWheelerData = {
      ...mockConsultantData,
      vehicleTypes: ["FOUR_WHEELER"],
    };
    rerender(<ConsultantCard data={onlyFourWheelerData} />);
    expect(screen.queryByTestId("icon-bike")).not.toBeInTheDocument();
    expect(screen.getByTestId("icon-car")).toBeInTheDocument();

    // Rerender with empty vehicleTypes
    const emptyTypesData = {
      ...mockConsultantData,
      vehicleTypes: [],
    };
    rerender(<ConsultantCard data={emptyTypesData} />);
    expect(screen.queryByTestId("icon-bike")).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-car")).not.toBeInTheDocument();
  });

  test("formats and displays services list correctly using width math", () => {
    render(<ConsultantCard data={mockConsultantData} />);

    // Services: ["INSPECTION_SERVICE", "VEHICLE_VALUATION", "RTO_REGISTRATION"]
    // Formatted texts should be: "Inspection Service", "Vehicle Valuation", "Rto Registration"
    expect(screen.getByText("Inspection Service")).toBeInTheDocument();
    expect(screen.getByText("Vehicle Valuation")).toBeInTheDocument();
    expect(screen.getByText("Rto Registration")).toBeInTheDocument();
  });

  test("contains view storefront button with correct link target", () => {
    render(<ConsultantCard data={mockConsultantData} />);

    const link = screen.getByRole("link", { name: /view storefront/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/auto-consultant/royal-motors");
  });
});
