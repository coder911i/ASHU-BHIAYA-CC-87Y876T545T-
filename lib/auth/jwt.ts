import { SignJWT, jwtVerify } from "jose";

const configuredSecret = process.env.ADMIN_JWT_SECRET;
if (process.env.NODE_ENV === "production" && (!configuredSecret || configuredSecret.length < 32)) {
  throw new Error("ADMIN_JWT_SECRET must be configured with at least 32 characters in production.");
}

// The fallback is intentionally development-only. Production fails closed above.
const JWT_SECRET_STRING = configuredSecret || "local-development-only-secret-change-before-deploy";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);

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
    .sign(SECRET_KEY);
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}
