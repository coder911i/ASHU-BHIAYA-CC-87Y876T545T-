"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/calculator/emi";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  IndianRupee,
  FileCheck,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

interface FormProps {
  initialServiceCategory?: "loan" | "insurance" | "investment";
  initialServiceSubtype?: string;
  initialAmount?: number;
  initialTenure?: number;
}

export function UniversalEnquiryForm({
  initialServiceCategory = "loan",
  initialServiceSubtype = "home-loan",
  initialAmount,
  initialTenure,
}: FormProps) {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    serviceCategory: initialServiceCategory,
    serviceSubtype: initialServiceSubtype,
    name: "",
    mobile: "",
    email: "",
    city: "",
    contactMethod: "phone" as "phone" | "whatsapp" | "email",
    contactTime: "anytime" as "morning" | "afternoon" | "evening" | "anytime",
    amount: initialAmount || 3000000,
    tenureMonths: initialTenure || 240,
    employmentType: "salaried",
    monthlyIncome: 65000,
    existingEmi: 0,
    propertyIdentified: true,
    specificRequirements: "",
    consentGiven: false,
    marketingConsent: false,
  });

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    setErrorMsg(null);
    const errors: Record<string, string[]> = {};

    if (currentStep === 1) {
      if (!formData.serviceSubtype) {
        errors.serviceSubtype = ["Please select a service type."];
      }
    } else if (currentStep === 2) {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        errors.name = ["Full name must be at least 2 characters."];
      }
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.mobile.trim())) {
        errors.mobile = ["Enter a valid 10-digit Indian mobile number."];
      }
      if (!formData.city.trim() || formData.city.trim().length < 2) {
        errors.city = ["Please enter your city."];
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = ["Please enter a valid email address."];
      }
    } else if (currentStep === 3) {
      if (formData.serviceCategory === "loan") {
        if (!formData.amount || formData.amount < 50000) {
          errors.amount = ["Amount must be at least ₹50,000."];
        }
      }
    } else if (currentStep === 4) {
      if (!formData.consentGiven) {
        errors.consentGiven = ["You must consent to being contacted regarding this enquiry."];
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(4, prev + 1));
    }
  };

  const prevStep = () => {
    setErrorMsg(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setErrorMsg(data.message || "Failed to submit enquiry. Please check the fields.");
        setSubmitting(false);
        return;
      }

      setSubmittedRefId(data.referenceId);
      setStep(5);
    } catch (err) {
      console.error(err);
      setErrorMsg("A network communication error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyRefId = () => {
    if (submittedRefId) {
      navigator.clipboard.writeText(submittedRefId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Step 5: Success Screen
  if (step === 5 && submittedRefId) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 text-center border border-blue-200 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Enquiry Registered Successfully
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Thank you, {formData.name}
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
          Your requirement for <strong className="text-slate-900">{formData.serviceSubtype.replace(/-/g, " ").toUpperCase()}</strong> has been securely logged with our advisory desk.
        </p>

        {/* Reference ID Badge */}
        <div className="my-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 inline-flex flex-col items-center">
          <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">
            Public Reference Number
          </span>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-2xl sm:text-3xl font-mono font-black text-blue-600 tracking-wider">
              {submittedRefId}
            </span>
            <button
              onClick={copyRefId}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shadow-xs"
              title="Copy Reference ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-xs text-slate-500 mt-1">Please quote this ID for all future follow-ups</span>
        </div>

        {/* Next Steps Guidance */}
        <div className="text-left bg-blue-50/50 p-5 rounded-2xl border border-blue-100 space-y-2 text-xs text-slate-700">
          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Next Steps in the Process:</span>
          </div>
          <p>
            1. An authorised VSR Associates coordinator will review your profile criteria against current lender guidelines.
          </p>
          <p>
            2. We will contact you via your preferred channel (<strong>{formData.contactMethod.toUpperCase()}</strong>) to discuss indicative options and documentation readiness.
          </p>
          <p className="text-slate-500 text-[11px] pt-1">
            * Note: Submission of this enquiry does not guarantee credit sanction or insurance policy issuance. Decisions remain subject to the respective institution&apos;s underwriting criteria.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
          >
            Return to Homepage
          </Link>
          <button
            onClick={() => {
              setStep(1);
              setSubmittedRefId(null);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
      {/* Progress Stepper */}
      <div className="mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
          <span>Step {step} of 4</span>
          <span className="text-blue-600 font-bold">
            {step === 1 && "Select Financial Service"}
            {step === 2 && "Personal & Contact Details"}
            {step === 3 && "Financial Requirements"}
            {step === 4 && "Review & Consent"}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">What assistance do you require today?</h3>
              <p className="text-xs text-slate-500 mt-1">Choose the broad financial vertical and specific portfolio.</p>
            </div>

            {/* Category Toggle */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "loan", label: "Loan Portfolios", icon: Building2 },
                { id: "insurance", label: "Insurance Cover", icon: ShieldCheck },
                { id: "investment", label: "Investments", icon: FileCheck },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    updateField("serviceCategory", cat.id);
                    if (cat.id === "loan") updateField("serviceSubtype", "home-loan");
                    if (cat.id === "insurance") updateField("serviceSubtype", "health");
                    if (cat.id === "investment") updateField("serviceSubtype", "mutual-funds");
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                    formData.serviceCategory === cat.id
                      ? "bg-blue-50 border-blue-600 text-blue-900 shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <cat.icon className={`w-5 h-5 ${formData.serviceCategory === cat.id ? "text-blue-600" : "text-slate-400"}`} />
                  <span className="text-xs sm:text-sm font-bold">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Specific Subtypes */}
            <div className="space-y-2">
              <label htmlFor="service-subtype-select" className="text-xs font-bold text-slate-700">
                Select Specific Product Subtype
              </label>
              <select
                id="service-subtype-select"
                value={formData.serviceSubtype}
                onChange={(e) => updateField("serviceSubtype", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {formData.serviceCategory === "loan" && (
                  <>
                    <option value="home-loan">Home Loan (Ready / Resale / Construction)</option>
                    <option value="plot-loan">Plot Purchase Loan</option>
                    <option value="construction-loan">Self-Construction Loan</option>
                    <option value="personal-loan">Personal Loan (Unsecured)</option>
                    <option value="business-loan">Business / MSME Loan</option>
                    <option value="vehicle-loan">Vehicle Loan</option>
                    <option value="education-loan">Education Loan (India &amp; Abroad)</option>
                    <option value="balance-transfer">Home Loan Balance Transfer</option>
                    <option value="top-up">Top-Up Loan</option>
                    <option value="loan-against-property">Loan Against Property (LAP)</option>
                  </>
                )}
                {formData.serviceCategory === "insurance" && (
                  <>
                    <option value="health">Comprehensive Health Insurance</option>
                    <option value="term">Term Life Insurance</option>
                    <option value="motor">Motor / Car Insurance</option>
                    <option value="child">Child Future Milestone Plan</option>
                    <option value="retirement">Retirement &amp; Annuity Plan</option>
                    <option value="life">Traditional Life Insurance</option>
                  </>
                )}
                {formData.serviceCategory === "investment" && (
                  <>
                    <option value="mutual-funds">Mutual Fund Portfolios</option>
                    <option value="sip">Systematic Investment Plan (SIP)</option>
                    <option value="fixed-deposits">Fixed Deposits (Bank &amp; Corporate)</option>
                    <option value="wealth-guidance">Consultative Wealth Guidance</option>
                  </>
                )}
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: Contact Details */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Applicant Contact Details</h3>
              <p className="text-xs text-slate-500 mt-1">We collect only necessary information to initiate your requirement review.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="applicant-name" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full Legal Name *</span>
                </label>
                <input
                  id="applicant-name"
                  type="text"
                  placeholder="e.g., Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    fieldErrors.name ? "border-rose-500" : "border-slate-300"
                  }`}
                />
                {fieldErrors.name && <p className="text-[11px] text-rose-600">{fieldErrors.name[0]}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="applicant-mobile" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Mobile Number (10 Digits) *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">+91</span>
                  <input
                    id="applicant-mobile"
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={(e) => updateField("mobile", e.target.value.replace(/\D/g, ""))}
                    className={`w-full pl-12 pr-4 py-2.5 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      fieldErrors.mobile ? "border-rose-500" : "border-slate-300"
                    }`}
                  />
                </div>
                {fieldErrors.mobile && <p className="text-[11px] text-rose-600">{fieldErrors.mobile[0]}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="applicant-email" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email Address (Optional)</span>
                </label>
                <input
                  id="applicant-email"
                  type="email"
                  placeholder="rajesh@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    fieldErrors.email ? "border-rose-500" : "border-slate-300"
                  }`}
                />
                {fieldErrors.email && <p className="text-[11px] text-rose-600">{fieldErrors.email[0]}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="applicant-city" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>City / Location *</span>
                </label>
                <input
                  id="applicant-city"
                  type="text"
                  placeholder="e.g., Mathura / Agra / Delhi NCR"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    fieldErrors.city ? "border-rose-500" : "border-slate-300"
                  }`}
                />
                {fieldErrors.city && <p className="text-[11px] text-rose-600">{fieldErrors.city[0]}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-method-select" className="text-xs font-bold text-slate-700">Preferred Contact Method</label>
                <select
                  id="contact-method-select"
                  value={formData.contactMethod}
                  onChange={(e) => updateField("contactMethod", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="phone">Direct Phone Call</option>
                  <option value="whatsapp">WhatsApp Message</option>
                  <option value="email">Email Communication</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-time-select" className="text-xs font-bold text-slate-700">Preferred Calling Window</label>
                <select
                  id="contact-time-select"
                  value={formData.contactTime}
                  onChange={(e) => updateField("contactTime", e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="anytime">Anytime during business hours</option>
                  <option value="morning">Morning (9:30 AM – 1:00 PM)</option>
                  <option value="afternoon">Afternoon (1:00 PM – 4:00 PM)</option>
                  <option value="evening">Evening (4:00 PM – 6:30 PM)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Financial Details */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Specific Requirement Parameters</h3>
              <p className="text-xs text-slate-500 mt-1">These details help us evaluate preliminary lender fitment.</p>
            </div>

            {formData.serviceCategory === "loan" ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="loan-amount-req" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                      <span>Required Loan Amount (₹) *</span>
                    </label>
                    <input
                      id="loan-amount-req"
                      type="number"
                      step="50000"
                      value={formData.amount}
                      onChange={(e) => updateField("amount", Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                    />
                    <span className="text-xs text-blue-600 font-bold">{formatINR(formData.amount)}</span>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="employment-type-select" className="text-xs font-bold text-slate-700">Employment / Profession Type</label>
                    <select
                      id="employment-type-select"
                      value={formData.employmentType}
                      onChange={(e) => updateField("employmentType", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="salaried">Salaried (Private / MNC / Govt)</option>
                      <option value="self_employed_business">Self-Employed (Business / Trader / MSME)</option>
                      <option value="self_employed_professional">Self-Employed Professional (Doctor, CA, Lawyer)</option>
                      <option value="nri">Non-Resident Indian (NRI)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="monthly-income-input" className="text-xs font-bold text-slate-700">Approx. Net Monthly Income (₹)</label>
                    <input
                      id="monthly-income-input"
                      type="number"
                      step="5000"
                      value={formData.monthlyIncome}
                      onChange={(e) => updateField("monthlyIncome", Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="existing-emi-input" className="text-xs font-bold text-slate-700">Existing Monthly EMIs (if any)</label>
                    <input
                      id="existing-emi-input"
                      type="number"
                      step="1000"
                      value={formData.existingEmi}
                      onChange={(e) => updateField("existingEmi", Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="custom-notes" className="text-xs font-bold text-slate-700">Brief Overview of Your Coverage / Investment Goals</label>
                  <textarea
                    id="custom-notes"
                    rows={3}
                    placeholder="e.g., Looking for family floater covering 2 adults + 2 children, or exploring long-term monthly SIPs."
                    value={formData.specificRequirements}
                    onChange={(e) => updateField("specificRequirements", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Consent & Review */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Review Summary &amp; Consent</h3>
              <p className="text-xs text-slate-500 mt-1">Please confirm your details before submitting your assistance enquiry.</p>
            </div>

            {/* Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Selected Product:</span>
                <span className="font-bold text-slate-900">{formData.serviceSubtype.replace(/-/g, " ").toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-semibold text-slate-900">{formData.name} ({formData.mobile})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-900">{formData.city}</span>
              </div>
              {formData.serviceCategory === "loan" && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Requested Amount:</span>
                  <span className="font-bold text-blue-600">{formatINR(formData.amount)}</span>
                </div>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentGiven}
                  onChange={(e) => updateField("consentGiven", e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 shrink-0"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  I explicitly authorize <strong>Vrinda Shree Radha Associates (VSR Associates)</strong> and its representatives to contact me via Call, SMS, WhatsApp, or Email regarding this enquiry. I acknowledge that VSR Associates is a discovery and documentation assistance facilitator, not a direct lender or insurer.{" "}
                  <Link href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline font-semibold">
                    View Privacy Policy
                  </Link>.
                </span>
              </label>
              {fieldErrors.consentGiven && (
                <p className="text-[11px] text-rose-600 font-semibold">{fieldErrors.consentGiven[0]}</p>
              )}

              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(e) => updateField("marketingConsent", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 shrink-0"
                />
                <span className="text-xs text-slate-500 leading-relaxed">
                  (Optional) Receive occasional updates regarding interest rate changes and special festive lender offers.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-md shadow-blue-500/20"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50"
            >
              {submitting ? (
                <span>Registering Enquiry...</span>
              ) : (
                <>
                  <span>Submit Requirement</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
