import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminSession, hasPermission } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const publishedOnly = searchParams.get("publishedOnly") === "true";

  const db = getDb();
  let query = "SELECT * FROM providers WHERE 1=1";
  const params: (string | number)[] = [];

  if (category && category !== "all") {
    query += " AND category = ?";
    params.push(category);
  }

  if (publishedOnly) {
    query += " AND published = 1";
  }

  query += " ORDER BY verified DESC, name ASC";
  const rows = db.prepare(query).all(...params);

  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session || !hasPermission(session.role, "admin")) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const db = getDb();
  const id = `prov-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO providers (
      id, name, category, subcategories_json, logo_url, published, verified,
      indicative_rate_min, indicative_rate_max, tenure_min_months, tenure_max_months,
      processing_fee_text, eligibility_highlights, source_reference, last_verified_at,
      disclaimer, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    body.name,
    body.category,
    JSON.stringify(body.subcategories || []),
    body.logo_url || "/providers/default.svg",
    body.published ? 1 : 0,
    body.verified ? 1 : 0,
    body.indicative_rate_min || null,
    body.indicative_rate_max || null,
    body.tenure_min_months || null,
    body.tenure_max_months || null,
    body.processing_fee_text || "As per lender terms",
    body.eligibility_highlights || "Standard credit checks apply",
    body.source_reference || "Official Schedule",
    now,
    body.disclaimer || "Indicative information subject to change.",
    now,
    now
  );

  return NextResponse.json({ success: true, id, message: "Provider registered successfully." });
}

export async function PUT(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session || !hasPermission(session.role, "admin")) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  if (!body.id) {
    return NextResponse.json({ success: false, message: "Provider ID required" }, { status: 400 });
  }

  const db = getDb();
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE providers SET
      name = COALESCE(?, name),
      category = COALESCE(?, category),
      subcategories_json = COALESCE(?, subcategories_json),
      logo_url = COALESCE(?, logo_url),
      published = COALESCE(?, published),
      verified = COALESCE(?, verified),
      indicative_rate_min = COALESCE(?, indicative_rate_min),
      indicative_rate_max = COALESCE(?, indicative_rate_max),
      processing_fee_text = COALESCE(?, processing_fee_text),
      eligibility_highlights = COALESCE(?, eligibility_highlights),
      source_reference = COALESCE(?, source_reference),
      last_verified_at = ?,
      disclaimer = COALESCE(?, disclaimer),
      updated_at = ?
    WHERE id = ?
  `).run(
    body.name || null,
    body.category || null,
    body.subcategories ? JSON.stringify(body.subcategories) : null,
    body.logo_url || null,
    body.published !== undefined ? (body.published ? 1 : 0) : null,
    body.verified !== undefined ? (body.verified ? 1 : 0) : null,
    body.indicative_rate_min ?? null,
    body.indicative_rate_max ?? null,
    body.processing_fee_text || null,
    body.eligibility_highlights || null,
    body.source_reference || null,
    now,
    body.disclaimer || null,
    now,
    body.id
  );

  return NextResponse.json({ success: true, message: "Provider updated successfully." });
}
