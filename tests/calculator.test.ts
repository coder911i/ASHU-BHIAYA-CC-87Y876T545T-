import { describe, it, expect } from "vitest";
import { calculateEmi, formatINR, formatTenureDisplay } from "../lib/calculator/emi";

describe("EMI Calculator - Mathematical Precision & Boundary Tests", () => {
  it("calculates standard home loan EMI accurately (₹50 Lakhs @ 8.5% for 20 years)", () => {
    // ₹50,00,000 for 240 months at 8.5% p.a.
    // Standard banking reference EMI: ~₹43,391
    const result = calculateEmi({
      principal: 5000000,
      annualRate: 8.5,
      tenureMonths: 240,
    });

    expect(result.monthlyEmi).toBe(43391);
    expect(result.principal).toBe(5000000);
    expect(result.tenureMonths).toBe(240);
    expect(result.totalPayment).toBe(43391 * 240);
    expect(result.totalInterest).toBe(result.totalPayment - 5000000);
    expect(result.amortizationSchedule.length).toBe(240);
    // Closing balance at end of tenure should be 0
    const lastRow = result.amortizationSchedule[result.amortizationSchedule.length - 1];
    expect(lastRow.closingBalance).toBe(0);
  });

  it("handles zero-interest edge cases without division-by-zero or NaN (₹12 Lakhs @ 0% for 12 months)", () => {
    const result = calculateEmi({
      principal: 1200000,
      annualRate: 0,
      tenureMonths: 12,
    });

    expect(result.monthlyEmi).toBe(100000);
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayment).toBe(1200000);
    expect(result.principalPercentage).toBe(100);
    expect(result.interestPercentage).toBe(0);
  });

  it("handles personal loan tenure and rate (₹5 Lakhs @ 11.5% for 3 years)", () => {
    // ₹5,00,000 for 36 months at 11.5% p.a.
    // Banking formula: ~₹16,490
    const result = calculateEmi({
      principal: 500000,
      annualRate: 11.5,
      tenureMonths: 36,
    });

    expect(result.monthlyEmi).toBe(16488);
    expect(result.yearlySchedule.length).toBe(3);
  });

  it("handles 0 principal safely", () => {
    const result = calculateEmi({
      principal: 0,
      annualRate: 9,
      tenureMonths: 60,
    });

    expect(result.monthlyEmi).toBe(0);
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayment).toBe(0);
  });

  it("safely handles negative or invalid inputs", () => {
    const result = calculateEmi({
      principal: -100000,
      annualRate: -5,
      tenureMonths: -12,
    });

    expect(result.monthlyEmi).toBe(0);
    expect(result.totalPayment).toBe(0);
    expect(Number.isNaN(result.monthlyEmi)).toBe(false);
    expect(Number.isFinite(result.monthlyEmi)).toBe(true);
  });

  it("formats Indian Rupee currency correctly with lakhs and crores grouping", () => {
    expect(formatINR(5000000)).toMatch(/₹\s?50,00,000/);
    expect(formatINR(12500000)).toMatch(/₹\s?1,25,00,000/);
    expect(formatINR(0)).toMatch(/₹\s?0/);
  });

  it("formats tenure correctly into years and months", () => {
    expect(formatTenureDisplay(24)).toBe("2 Years");
    expect(formatTenureDisplay(12)).toBe("1 Year");
    expect(formatTenureDisplay(30)).toBe("2 Years 6 Mo");
    expect(formatTenureDisplay(6)).toBe("6 Months");
  });
});
