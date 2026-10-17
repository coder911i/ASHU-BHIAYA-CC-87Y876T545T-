import { describe, it, expect } from "vitest";
import { signAdminToken, verifyAdminToken } from "../lib/auth/jwt";
import { hasPermission } from "../lib/auth/session";

describe("Security & Authentication - JWT & RBAC Tests", () => {
  it("generates and verifies valid admin JWT token correctly", async () => {
    const payload = {
      userId: "admin-123",
      email: "admin@vsrassociates.in",
      name: "Lead Admin",
      role: "super_admin" as const,
    };

    const token = await signAdminToken(payload, 3600);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);

    const verified = await verifyAdminToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe(payload.email);
    expect(verified?.role).toBe("super_admin");
  });

  it("fails verification for tampered token", async () => {
    const token = await signAdminToken(
      {
        userId: "admin-123",
        email: "admin@vsrassociates.in",
        name: "Lead Admin",
        role: "super_admin",
      },
      3600
    );

    const tampered = token.slice(0, -6) + "xxxxxx";
    const verified = await verifyAdminToken(tampered);
    expect(verified).toBeNull();
  });

  it("enforces RBAC hierarchy properly", () => {
    expect(hasPermission("super_admin", "admin")).toBe(true);
    expect(hasPermission("super_admin", "enquiry_manager")).toBe(true);

    expect(hasPermission("admin", "admin")).toBe(true);
    expect(hasPermission("admin", "enquiry_manager")).toBe(true);
    expect(hasPermission("admin", "super_admin")).toBe(false);

    expect(hasPermission("enquiry_manager", "enquiry_manager")).toBe(true);
    expect(hasPermission("enquiry_manager", "admin")).toBe(false);
  });
});
