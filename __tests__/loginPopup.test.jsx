import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPopup from "@/components/auth/LoginPopup";
import { getOtp, login } from "@/services/auth.service";

// Mock the auth service functions to prevent actual API calls during unit tests
jest.mock("@/services/auth.service", () => ({
  getOtp: jest.fn(),
  login: jest.fn(),
}));

describe("LoginPopup Component (Unit Tests)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("does not render when isOpen is false", () => {
    render(<LoginPopup isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText(/log in to/i)).not.toBeInTheDocument();
  });

  test("renders when isOpen is true", () => {
    render(<LoginPopup isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText(/log in to/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("9999999999")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get otp/i })).toBeInTheDocument();
  });

  test("displays validation error when submitting empty phone number", async () => {
    render(<LoginPopup isOpen={true} onClose={jest.fn()} />);

    const getOtpBtn = screen.getByRole("button", { name: /get otp/i });
    fireEvent.click(getOtpBtn);

    // Wait for validation error to appear in the DOM
    const errorMessage = await screen.findByText(/mobile number is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("calls getOtp API with correct number when submitting valid phone number", async () => {
    getOtp.mockResolvedValue({ success: true });

    render(<LoginPopup isOpen={true} onClose={jest.fn()} />);

    const phoneInput = screen.getByPlaceholderText("9999999999");
    const getOtpBtn = screen.getByRole("button", { name: /get otp/i });

    // Enter a valid 10 digit number
    fireEvent.change(phoneInput, { target: { value: "9876543210" } });
    fireEvent.click(getOtpBtn);

    // Verify getOtp API service is triggered with correct arguments
    await waitFor(() => {
      expect(getOtp).toHaveBeenCalledWith({
        phoneNumber: "9876543210",
        countryCode: "+91",
        requestType: "LOGIN",
      });
    });
  });

  test("clears otpBlockUntil from localStorage on successful login validation", async () => {
    getOtp.mockResolvedValue({ success: true });
    login.mockResolvedValue({ success: true });

    const { container } = render(
      <LoginPopup isOpen={true} onClose={jest.fn()} onSuccess={jest.fn()} />
    );

    // Enter valid phone number and click GET OTP
    fireEvent.change(screen.getByPlaceholderText("9999999999"), {
      target: { value: "9876543210" },
    });
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

    // Verify Validate OTP button is visible and click it
    const validateBtn = screen.getByRole("button", { name: /validate otp/i });
    fireEvent.click(validateBtn);

    // Verify that login was called and local storage was cleared
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        phoneNumber: "9876543210",
        countryCode: "+91",
        otp: "123456",
      });
      expect(localStorage.getItem("otpBlockUntil")).toBeNull();
    });
  });

  test("clears countdown and otpBlockUntil from localStorage when the popup is closed", async () => {
    getOtp.mockResolvedValue({ success: true });

    const { container } = render(
      <LoginPopup isOpen={true} onClose={jest.fn()} />
    );

    // Enter valid phone number and click GET OTP
    fireEvent.change(screen.getByPlaceholderText("9999999999"), {
      target: { value: "9876543210" },
    });
    fireEvent.click(screen.getByRole("button", { name: /get otp/i }));

    // Wait for the OTP block to be set in localStorage
    await waitFor(() => {
      expect(localStorage.getItem("otpBlockUntil")).not.toBeNull();
    });

    // Find the close button (the absolute button with the close icon)
    const closeBtn = container.querySelector("button.absolute");
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);

    // Verify that the OTP block is cleared from localStorage after close delay
    await waitFor(() => {
      expect(localStorage.getItem("otpBlockUntil")).toBeNull();
    });
  });
});

