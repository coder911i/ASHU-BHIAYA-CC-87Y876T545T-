import { cookies } from "next/headers";
import { verifyAdminToken, AdminTokenPayload } from "./jwt";

export const ADMIN_COOKIE_NAME = "vsr_admin_session";

export async function getCurrentAdminSession(): Promise<AdminTokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}

export function hasPermission(
  userRole: string,
  requiredRole: "super_admin" | "admin" | "enquiry_manager"
): boolean {
  if (userRole === "super_admin") return true;
  if (userRole === "admin") {
    return requiredRole === "admin" || requiredRole === "enquiry_manager";
  }
  if (userRole === "enquiry_manager") {
    return requiredRole === "enquiry_manager";
  }
  return false;
}
