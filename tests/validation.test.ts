import { describe, it, expect } from "vitest";
import { enquirySchema } from "../lib/validation/enquiry";

describe("Enquiry Validation Schema - Integrity Tests", () => {
  it("validates valid loan enquiry payload correctly", () => {
    const validData = {
      serviceCategory: "loan",
      serviceSubtype: "home-loan",
      name: "Amit Patel",
      mobile: "9876543210",
      email: "amit.patel@example.com",
      city: "Mathura",
      amount: 4500000,
      tenureMonths: 240,
      consentGiven: true,
      marketingConsent: false,
      consentVersion: "v1.0-2026",
    };

    const result = enquirySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails if mandatory consent is false or unchecked", () => {
    const invalidData = {
      serviceCategory: "loan",
      serviceSubtype: "home-loan",
      name: "Amit Patel",
      mobile: "9876543210",
      city: "Mathura",
      consentGiven: false,
    };

    const result = enquirySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("fails if mobile number is not a valid 10-digit Indian mobile number", () => {
    const invalidMobile = {
      serviceCategory: "loan",
      serviceSubtype: "home-loan",
      name: "Amit Patel",
      mobile: "12345", // invalid
      city: "Mathura",
      consentGiven: true,
    };

    const result = enquirySchema.safeParse(invalidMobile);
    expect(result.success).toBe(false);
  });

  it("allows optional email to be empty string or valid email", () => {
    const withEmptyEmail = {
      serviceCategory: "insurance",
      serviceSubtype: "health",
      name: "Suman Sharma",
      mobile: "9123456789",
      email: "",
      city: "Agra",
      consentGiven: true,
    };

    const result = enquirySchema.safeParse(withEmptyEmail);
    expect(result.success).toBe(true);
  });
});
