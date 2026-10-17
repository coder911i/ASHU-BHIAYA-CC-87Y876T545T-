import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signAdminToken } from "@/lib/auth/jwt";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const db = getDb();
    const user = db
      .prepare("SELECT * FROM admin_users WHERE email = ?")
      .get(email.trim().toLowerCase()) as
      | {
          id: string;
          email: string;
          password_hash: string;
          name: string;
          role: "super_admin" | "admin" | "enquiry_manager";
        }
      | undefined;

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const passwordValid = bcrypt.compareSync(password, user.password_hash);
    if (!passwordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = await signAdminToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Record audit log
    db.prepare(`
      INSERT INTO audit_logs (id, admin_email, action, entity_type, entity_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      `audit-login-${Date.now()}`,
      user.email,
      "LOGIN_SUCCESS",
      "admin_users",
      user.id,
      JSON.stringify({ ip: req.headers.get("x-forwarded-for") || "127.0.0.1" }),
      new Date().toISOString()
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, message: "Authentication service error." },
      { status: 500 }
    );
  }
}
