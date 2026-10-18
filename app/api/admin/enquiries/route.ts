import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import crypto from "crypto";

const ENQUIRY_STATUSES = new Set(["new", "contacted", "in_review", "closed"]);

// Prevent spreadsheet formula execution when customer-controlled values are exported to CSV.
function csvCell(value: unknown): string {
  const raw = String(value ?? "");
  const safe = /^[\t\r ]*[=+@-]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.slice(0, 120);
  const isExport = searchParams.get("export") === "csv";
  const parsedPage = Number.parseInt(searchParams.get("page") || "1", 10);
  const parsedLimit = Number.parseInt(searchParams.get("limit") || "15", 10);
  const page = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;
  const limit = Number.isFinite(parsedLimit) ? Math.min(100, Math.max(1, parsedLimit)) : 15;
  const offset = (page - 1) * limit;

  const db = getDb();
  let queryBase = "FROM enquiries WHERE 1=1";
  const params: (string | number)[] = [];

  if (status && status !== "all") {
    if (!ENQUIRY_STATUSES.has(status)) {
      return NextResponse.json({ success: false, message: "Invalid enquiry status." }, { status: 400 });
    }
    queryBase += " AND status = ?";
    params.push(status);
  }

  if (category && category !== "all") {
    if (!["loan", "insurance", "investment"].includes(category)) {
      return NextResponse.json({ success: false, message: "Invalid service category." }, { status: 400 });
    }
    queryBase += " AND service_category = ?";
    params.push(category);
  }

  if (search) {
    queryBase += " AND (name LIKE ? OR mobile LIKE ? OR reference_id LIKE ? OR city LIKE ?)";
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  if (isExport) {
    const rows = db
      .prepare(`SELECT reference_id, name, mobile, email, city, service_category, service_subtype, amount, status, created_at ${queryBase} ORDER BY created_at DESC LIMIT 5000`)
      .all(...params) as Record<string, string | number | null>[];

    const header = ["Reference ID", "Name", "Mobile", "Email", "City", "Category", "Subtype", "Amount", "Status", "Created At"].map(csvCell).join(",");
    const csvContent = rows
      .map((row) => [
        row.reference_id, row.name, row.mobile, row.email, row.city,
        row.service_category, row.service_subtype, row.amount ?? 0, row.status, row.created_at,
      ].map(csvCell).join(","))
      .join("\r\n");

    return new Response(`\uFEFF${header}\r\n${csvContent}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vsr_enquiries_${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  const countRow = db.prepare(`SELECT COUNT(*) as total ${queryBase}`).get(...params) as { total: number };
  const total = countRow.total;
  const items = db
    .prepare(`SELECT * ${queryBase} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
    .all(...params, limit, offset);

  return NextResponse.json({
    success: true,
    data: items,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) || 1 },
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ success: false, message: "A JSON object is required." }, { status: 400 });
  }

  const { id, status, assigned_to, internal_notes } = body as {
    id?: unknown;
    status?: unknown;
    assigned_to?: unknown;
    internal_notes?: unknown;
  };

  if (!(typeof id === "number" || (typeof id === "string" && /^\d+$/.test(id))) || Number(id) < 1) {
    return NextResponse.json({ success: false, message: "A valid enquiry ID is required." }, { status: 400 });
  }
  if (status !== undefined && (typeof status !== "string" || !ENQUIRY_STATUSES.has(status))) {
    return NextResponse.json({ success: false, message: "Invalid enquiry status." }, { status: 400 });
  }
  if (assigned_to !== undefined && assigned_to !== null && (typeof assigned_to !== "string" || assigned_to.length > 120)) {
    return NextResponse.json({ success: false, message: "Assignee must be a string of at most 120 characters." }, { status: 400 });
  }
  if (internal_notes !== undefined && internal_notes !== null && (typeof internal_notes !== "string" || internal_notes.length > 5000)) {
    return NextResponse.json({ success: false, message: "Internal notes must be at most 5000 characters." }, { status: 400 });
  }

  const db = getDb();
  const enquiryId = Number(id);
  const existing = db.prepare("SELECT id FROM enquiries WHERE id = ?").get(enquiryId);
  if (!existing) {
    return NextResponse.json({ success: false, message: "Enquiry not found." }, { status: 404 });
  }

  const now = new Date().toISOString();
  db.prepare(`
    UPDATE enquiries
    SET status = COALESCE(?, status),
        assigned_to = COALESCE(?, assigned_to),
        internal_notes = COALESCE(?, internal_notes),
        updated_at = ?
    WHERE id = ?
  `).run(status ?? null, assigned_to ?? null, internal_notes ?? null, now, enquiryId);

  db.prepare(`
    INSERT INTO audit_logs (id, admin_email, action, entity_type, entity_id, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    `audit-${crypto.randomUUID()}`,
    session.email,
    "UPDATE_ENQUIRY",
    "enquiries",
    String(enquiryId),
    JSON.stringify({ status, assigned_to, internal_notes }),
    now
  );

  return NextResponse.json({ success: true, message: "Enquiry updated successfully." });
}
