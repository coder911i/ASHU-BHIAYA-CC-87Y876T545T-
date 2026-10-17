import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();

  // Status counts
  const totalRow = db.prepare("SELECT COUNT(*) as count FROM enquiries").get() as { count: number };
  const newRow = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'new'").get() as { count: number };
  const contactedRow = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'contacted'").get() as { count: number };
  const inReviewRow = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'in_review'").get() as { count: number };
  const closedRow = db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'closed'").get() as { count: number };

  // Category breakdown
  const categoryCounts = db.prepare(`
    SELECT service_category, COUNT(*) as count 
    FROM enquiries 
    GROUP BY service_category
  `).all() as { service_category: string; count: number }[];

  // Recent enquiries (last 5)
  const recentEnquiries = db.prepare(`
    SELECT id, reference_id, name, mobile, city, service_category, service_subtype, amount, status, created_at 
    FROM enquiries 
    ORDER BY created_at DESC 
    LIMIT 6
  `).all();

  // Provider and offer totals
  const providerCount = db.prepare("SELECT COUNT(*) as count FROM providers WHERE published = 1").get() as { count: number };
  const offerCount = db.prepare("SELECT COUNT(*) as count FROM offers WHERE published = 1").get() as { count: number };

  // Notification delivery status counts
  const notifLogs = db.prepare(`
    SELECT channel, status, COUNT(*) as count 
    FROM notification_logs 
    GROUP BY channel, status
  `).all();

  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        total: totalRow.count,
        new: newRow.count,
        contacted: contactedRow.count,
        inReview: inReviewRow.count,
        closed: closedRow.count,
        activeProviders: providerCount.count,
        activeOffers: offerCount.count,
      },
      categoryCounts,
      recentEnquiries,
      notificationLogsSummary: notifLogs,
    },
  });
}
