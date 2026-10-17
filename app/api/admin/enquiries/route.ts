import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const isExport = searchParams.get("export") === "csv";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "15", 10)));
  const offset = (page - 1) * limit;

  const db = getDb();

  let queryBase = "FROM enquiries WHERE 1=1";
  const params: (string | number)[] = [];

  if (status && status !== "all") {
    queryBase += " AND status = ?";
    params.push(status);
  }

  if (category && category !== "all") {
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
      .prepare(`SELECT reference_id, name, mobile, email, city, service_category, service_subtype, amount, status, created_at ${queryBase} ORDER BY created_at DESC`)
      .all(...params) as Record<string, string | number>[];

    const header = "Reference ID,Name,Mobile,Email,City,Category,Subtype,Amount,Status,Created At\n";
    const csvContent = rows
      .map((r) =>
        [
          r.reference_id,
          `"${String(r.name || "").replace(/"/g, '""')}"`,
          r.mobile,
          r.email || "",
          `"${String(r.city || "").replace(/"/g, '""')}"`,
          r.service_category,
          r.service_subtype,
          r.amount || 0,
          r.status,
          r.created_at,
        ].join(",")
      )
      .join("\n");

    return new Response(header + csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vsr_enquiries_${new Date().toISOString().slice(0, 10)}.csv"`,
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
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id, status, assigned_to, internal_notes } = await req.json();

  if (!id) {
    return NextResponse.json({ success: false, message: "Enquiry ID is required" }, { status: 400 });
  }

  const db = getDb();
  const existing = db.prepare("SELECT * FROM enquiries WHERE id = ?").get(id);
  if (!existing) {
    return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  db.prepare(`
    UPDATE enquiries 
    SET status = COALESCE(?, status),
        assigned_to = COALESCE(?, assigned_to),
        internal_notes = COALESCE(?, internal_notes),
        updated_at = ?
    WHERE id = ?
  `).run(status || null, assigned_to || null, internal_notes || null, now, id);

  // Record audit log
  db.prepare(`
    INSERT INTO audit_logs (id, admin_email, action, entity_type, entity_id, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    `audit-${Date.now()}`,
    session.email,
    "UPDATE_ENQUIRY",
    "enquiries",
    String(id),
    JSON.stringify({ status, assigned_to, internal_notes }),
    now
  );

  return NextResponse.json({ success: true, message: "Enquiry updated successfully." });
}
