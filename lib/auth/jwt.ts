import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET_STRING = process.env.ADMIN_JWT_SECRET || "vsr_associates_default_jwt_secret_key_prod_2026";
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
