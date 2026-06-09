import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPopup from "@/components/auth/SignupPopup";
import { getOtp, signup } from "@/services/auth.service";

// Mock the auth service functions
jest.mock("@/services/auth.service", () => ({
  getOtp: jest.fn(),
  signup: jest.fn(),
}));

// Mock next/navigation useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("SignupPopup Component (Unit Tests)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("does not render when isOpen is false", () => {
    render(<SignupPopup isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText(/create your/i)).not.toBeInTheDocument();
  });

  test("renders when isOpen is true", () => {
    render(<SignupPopup isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText(/create your/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("9999999999")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /terms and conditions/i })).toBeInTheDocument();
  });

  test("toggles account type tabs when clicked", () => {
    render(<SignupPopup isOpen={true} onClose={jest.fn()} />);

    const personalTab = screen.getByRole("button", { name: /personal/i });
    const consultantTab = screen.getByRole("button", { name: /consultant/i });

    // Initial selected state should be personal
    expect(personalTab).toHaveClass("text-primary font-bold");

    // Click on the consultant tab
    fireEvent.click(consultantTab);
    expect(consultantTab).toHaveClass("text-primary font-bold");
    expect(personalTab).not.toHaveClass("text-primary font-bold");
  });

  test("disables GET OTP button until terms checkbox is checked", () => {
    render(<SignupPopup isOpen={true} onClose={jest.fn()} />);

    const termsCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const getOtpBtn = screen.getByRole("button", { name: /get otp/i });

    // Terms should be unchecked and the button disabled/locked initially
    expect(termsCheckbox.checked).toBe(false);
    expect(getOtpBtn).toHaveClass("opacity-50 cursor-not-allowed");

    // Check the box
    fireEvent.click(termsCheckbox);
    expect(termsCheckbox.checked).toBe(true);
    expect(getOtpBtn).not.toHaveClass("opacity-50 cursor-not-allowed");
  });

  test("shows form validation errors when submitting blank fields", async () => {
    render(<SignupPopup isOpen={true} onClose={jest.fn()} />);

    // Check terms checkbox so the submit button gets enabled
    const termsCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    fireEvent.click(termsCheckbox);

    const getOtpBtn = screen.getByRole("button", { name: /get otp/i });
    fireEvent.click(getOtpBtn);

    // Verify error messages for blank fields are displayed
    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/phone is required/i)).toBeInTheDocument();
  });

  test("calls getOtp API with correct params when valid signup details are submitted", async () => {
    getOtp.mockResolvedValue({ success: true });

    render(<SignupPopup isOpen={true} onClose={jest.fn()} />);

    // Fill out registration details
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email address"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("9999999999"), { target: { value: "9876543210" } });

    // Accept terms
    fireEvent.click(screen.getByRole("checkbox", { name: /terms and conditions/i }));

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /get otp/i }));

    // Assert that the getOtp service is triggered with the form values
    await waitFor(() => {
      expect(getOtp).toHaveBeenCalledWith({
        phoneNumber: "9876543210",
        email: "john.doe@example.com",
        countryCode: "+91",
        requestType: "SIGNUP",
      });
    });
  });

  test("clears otpBlockUntil from localStorage on successful signup validation", async () => {
    getOtp.mockResolvedValue({ success: true });
    signup.mockResolvedValue({ success: true });

    const { container } = render(
      <SignupPopup isOpen={true} onClose={jest.fn()} onSuccess={jest.fn()} />
    );

    // Fill out registration details
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email address"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("9999999999"), { target: { value: "9876543210" } });

    // Accept terms
    fireEvent.click(screen.getByRole("checkbox", { name: /terms and conditions/i }));

    // Submit form to send OTP
    fireEvent.click(screen.getByRole("button", { name: /get otp/i }));

    // Wait for the OTP input fields to render
    await waitFor(() => {
      expect(document.querySelectorAll('input[maxlength="1"]').length).toBe(6);
    });

    const otpInputs = document.querySelectorAll('input[maxlength="1"]');
    const otpDigits = ["1", "2", "3", "4", "5", "6"];
    otpInputs.forEach((input, idx) => {
      fireEvent.change(input, { target: { value: otpDigits[idx] } });
    });

    // Verify VALIDATE OTP button is visible and click it
    const validateBtn = screen.getByRole("button", { name: /validate otp/i });
    fireEvent.click(validateBtn);

    // Verify that signup was called and local storage was cleared
    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "9876543210",
        countryCode: "+91",
        isApplyForConsultation: false,
        otp: "123456",
      });
      expect(localStorage.getItem("otpBlockUntil")).toBeNull();
    });
  });
});
