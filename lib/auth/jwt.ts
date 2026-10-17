import { SignJWT, jwtVerify } from "jose";

function getSecretKey(): Uint8Array {
  const configuredSecret = process.env.ADMIN_JWT_SECRET;
  if (process.env.NODE_ENV === "production" && (!configuredSecret || configuredSecret.length < 32)) {
    throw new Error("ADMIN_JWT_SECRET must be configured with at least 32 characters in production.");
  }

  // The fallback is development-only; it is never accepted in production.
  return new TextEncoder().encode(configuredSecret || "local-development-only-secret-change-before-deploy");
}

export interface AdminTokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "super_admin" | "admin" | "enquiry_manager";
}

export async function signAdminToken(payload: AdminTokenPayload, expiresInSeconds = 86400): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expiresInSeconds}s`)
    .sign(getSecretKey());
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}
