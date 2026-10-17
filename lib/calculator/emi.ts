/**
 * VSR Associates - EMI Calculator Engine
 * Standard Reducing-Balance Formula:
 * EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * Where:
 * P = Principal loan amount
 * r = Monthly interest rate (Annual rate / 12 / 100)
 * n = Tenure in number of months
 */

export interface EmiCalculationInput {
  principal: number; // in INR
  annualRate: number; // in % (e.g. 8.5)
  tenureMonths: number; // total months
}

export interface AmortizationRow {
  month: number;
  year: number;
  openingBalance: number;
  emi: number;
  principalComponent: number;
  interestComponent: number;
  closingBalance: number;
}

export interface EmiCalculationResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  tenureMonths: number;
  annualRate: number;
  principalPercentage: number;
  interestPercentage: number;
  amortizationSchedule: AmortizationRow[];
  yearlySchedule: {
    year: number;
    principalPaid: number;
    interestPaid: number;
    totalPaid: number;
    remainingBalance: number;
  }[];
}

/**
 * Calculates reducing-balance monthly EMI, total interest, and amortisation breakdown.
 * Safely guards against 0 interest, 0 tenure, negative values, and NaN/Infinity.
 */
export function calculateEmi({
  principal,
  annualRate,
  tenureMonths,
}: EmiCalculationInput): EmiCalculationResult {
  // Sanitize inputs
  const P = Math.max(0, isNaN(principal) ? 0 : principal);
  const rate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const n = Math.max(1, Math.round(isNaN(tenureMonths) ? 1 : tenureMonths));

  if (P === 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayment: 0,
      principal: 0,
      tenureMonths: n,
      annualRate: rate,
      principalPercentage: 100,
      interestPercentage: 0,
      amortizationSchedule: [],
      yearlySchedule: [],
    };
  }

  let monthlyEmi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  // Zero-interest loan edge-case
  if (rate === 0) {
    monthlyEmi = Math.round(P / n);
    totalPayment = P;
    totalInterest = 0;
  } else {
    // r = monthly interest rate
    const r = rate / 12 / 100;
    const factor = Math.pow(1 + r, n);

    if (factor === 1 || isNaN(factor) || !isFinite(factor)) {
      monthlyEmi = Math.round(P / n);
      totalPayment = P;
      totalInterest = 0;
    } else {
      const emiPrecise = (P * r * factor) / (factor - 1);
      monthlyEmi = Math.round(emiPrecise);
      totalPayment = monthlyEmi * n;
      totalInterest = Math.max(0, totalPayment - P);
    }
  }

  // Generate monthly amortization schedule
  const amortizationSchedule: AmortizationRow[] = [];
  let currentBalance = P;
  const monthlyRate = rate / 12 / 100;

  for (let m = 1; m <= n; m++) {
    const interestComp = rate === 0 ? 0 : Math.round(currentBalance * monthlyRate);
    let principalComp = monthlyEmi - interestComp;

    // Adjust last month rounding differences
    if (m === n || principalComp > currentBalance) {
      principalComp = currentBalance;
    }

    const closing = Math.max(0, currentBalance - principalComp);
    const yr = Math.ceil(m / 12);

    amortizationSchedule.push({
      month: m,
      year: yr,
      openingBalance: currentBalance,
      emi: monthlyEmi,
      principalComponent: principalComp,
      interestComponent: interestComp,
      closingBalance: closing,
    });

    currentBalance = closing;
    if (currentBalance <= 0) break;
  }

  // Generate consolidated yearly schedule
  const yearlyMap = new Map<number, { principalPaid: number; interestPaid: number; totalPaid: number; remainingBalance: number }>();
  amortizationSchedule.forEach((row) => {
    const cur = yearlyMap.get(row.year) || { principalPaid: 0, interestPaid: 0, totalPaid: 0, remainingBalance: 0 };
    cur.principalPaid += row.principalComponent;
    cur.interestPaid += row.interestComponent;
    cur.totalPaid += row.emi;
    cur.remainingBalance = row.closingBalance;
    yearlyMap.set(row.year, cur);
  });

  const yearlySchedule = Array.from(yearlyMap.entries()).map(([year, val]) => ({
    year,
    ...val,
  }));

  const principalRatio = totalPayment > 0 ? (P / totalPayment) * 100 : 100;
  const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  return {
    monthlyEmi,
    totalInterest,
    totalPayment,
    principal: P,
    tenureMonths: n,
    annualRate: rate,
    principalPercentage: Number(principalRatio.toFixed(1)),
    interestPercentage: Number(interestRatio.toFixed(1)),
    amortizationSchedule,
    yearlySchedule,
  };
}

/**
 * Format numbers according to Indian Rupee numbering system (Lakhs, Crores)
 * e.g., ₹25,00,000
 */
export function formatINR(val: number, includeDecimals = false): string {
  if (isNaN(val) || val === null || val === undefined) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(val);
}

/**
 * Human-readable tenure conversion helper
 */
export function formatTenureDisplay(months: number): string {
  const yrs = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (yrs === 0) return `${months} Months`;
  if (remainingMonths === 0) return `${yrs} Year${yrs > 1 ? "s" : ""}`;
  return `${yrs} Year${yrs > 1 ? "s" : ""} ${remainingMonths} Mo`;
}
