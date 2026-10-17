import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminSession, hasPermission } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get("activeOnly") === "true";
  const db = getDb();

  let query = "SELECT * FROM offers WHERE 1=1";
  if (activeOnly) {
    query += " AND published = 1 AND datetime(valid_until) >= datetime('now')";
  }
  query += " ORDER BY priority DESC, created_at DESC";

  const rows = db.prepare(query).all();
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session || !hasPermission(session.role, "admin")) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const db = getDb();
  const id = `offer-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO offers (
      id, title, description, service_category, provider_name, badge_text,
      valid_from, valid_until, terms, cta_text, cta_url, published, priority,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    body.title,
    body.description,
    body.service_category,
    body.provider_name || null,
    body.badge_text || "Special Offer",
    body.valid_from || now,
    body.valid_until,
    body.terms,
    body.cta_text || "Apply Now",
    body.cta_url || "/apply",
    body.published ? 1 : 0,
    body.priority || 0,
    now,
    now
  );

  return NextResponse.json({ success: true, id, message: "Offer created successfully." });
}

export async function PUT(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session || !hasPermission(session.role, "admin")) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  if (!body.id) {
    return NextResponse.json({ success: false, message: "Offer ID required" }, { status: 400 });
  }

  const db = getDb();
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE offers SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      service_category = COALESCE(?, service_category),
      provider_name = COALESCE(?, provider_name),
      badge_text = COALESCE(?, badge_text),
      valid_until = COALESCE(?, valid_until),
      terms = COALESCE(?, terms),
      published = COALESCE(?, published),
      priority = COALESCE(?, priority),
      updated_at = ?
    WHERE id = ?
  `).run(
    body.title || null,
    body.description || null,
    body.service_category || null,
    body.provider_name || null,
    body.badge_text || null,
    body.valid_until || null,
    body.terms || null,
    body.published !== undefined ? (body.published ? 1 : 0) : null,
    body.priority ?? null,
    now,
    body.id
  );

  return NextResponse.json({ success: true, message: "Offer updated successfully." });
}
