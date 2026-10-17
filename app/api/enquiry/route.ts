import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation/enquiry";
import { getDb } from "@/lib/db";
import { dispatchEnquiryNotifications } from "@/lib/notifications/delivery";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = enquirySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parseResult.error.flatten().fieldErrors,
          message: "Please complete all required fields accurately.",
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const db = getDb();

    // Spam / Duplicate check (prevent identical mobile number submission within last 60 seconds)
    const recentCheck = db
      .prepare(`
        SELECT id FROM enquiries 
        WHERE mobile = ? AND service_subtype = ? AND datetime(created_at) > datetime('now', '-60 seconds')
      `)
      .get(data.mobile, data.serviceSubtype);

    if (recentCheck) {
      return NextResponse.json(
        {
          success: false,
          message: "A recent enquiry with these details was already recorded. Our team will contact you shortly.",
        },
        { status: 429 }
      );
    }

    // Generate readable reference ID: VSR-2026-XXXXXX
    const currentYear = new Date().getFullYear();
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const referenceId = `VSR-${currentYear}-${randomCode}`;
    const now = new Date().toISOString();

    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

    // Prepare JSON payload for custom attributes
    const detailsJson = JSON.stringify({
      employmentType: data.employmentType || null,
      monthlyIncome: data.monthlyIncome || null,
      existingEmi: data.existingEmi || null,
      propertyIdentified: data.propertyIdentified ?? null,
      specificRequirements: data.specificRequirements || null,
    });

    const insertResult = db.prepare(`
      INSERT INTO enquiries (
        reference_id, name, mobile, email, city, service_category, service_subtype,
        amount, tenure_months, details_json, contact_method, contact_time,
        consent_given, consent_version, consent_timestamp, marketing_consent,
        status, ip_address, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      referenceId,
      data.name,
      data.mobile,
      data.email || null,
      data.city,
      data.serviceCategory,
      data.serviceSubtype,
      data.amount || null,
      data.tenureMonths || null,
      detailsJson,
      data.contactMethod,
      data.contactTime,
      data.consentGiven ? 1 : 0,
      data.consentVersion,
      now,
      data.marketingConsent ? 1 : 0,
      "new",
      clientIp,
      now,
      now
    );

    const enquiryId = Number(insertResult.lastInsertRowid);

    // Trigger notification delivery
    const deliveryResults = await dispatchEnquiryNotifications({
      enquiryId,
      referenceId,
      name: data.name,
      mobile: data.mobile,
      email: data.email || undefined,
      serviceCategory: data.serviceCategory,
      serviceSubtype: data.serviceSubtype,
      amount: data.amount,
      city: data.city,
    });

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Enquiry submitted successfully. A specialist will review your request.",
      deliveryResults,
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
