import { z } from "zod";

export const phoneRegex = /^[6-9]\d{9}$/;

export const enquirySchema = z.object({
  serviceCategory: z.enum(["loan", "insurance", "investment"], {
    message: "Please select a valid service category.",
  }),
  serviceSubtype: z.string().min(1, "Service type is required."),
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters."),
  mobile: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian mobile number (e.g., 9876543210)."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .min(2, "City name must be at least 2 characters.")
    .max(60, "City name is too long."),
  contactMethod: z.enum(["phone", "whatsapp", "email"]).default("phone"),
  contactTime: z.enum(["morning", "afternoon", "evening", "anytime"]).default("anytime"),
  
  // Financial details
  amount: z.coerce.number().min(0).optional(),
  tenureMonths: z.coerce.number().min(0).optional(),
  employmentType: z.string().optional(),
  monthlyIncome: z.coerce.number().min(0).optional(),
  existingEmi: z.coerce.number().min(0).optional(),
  propertyIdentified: z.boolean().optional(),
  specificRequirements: z.string().max(500).optional(),

  // Mandatory consent
  consentGiven: z.literal(true, {
    message: "You must consent to being contacted regarding this enquiry.",
  }),
  marketingConsent: z.boolean().default(false),
  consentVersion: z.string().default("v1.0-2026"),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
