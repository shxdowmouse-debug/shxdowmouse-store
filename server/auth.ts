import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

// Admin authentication middleware
// For 2FA, we use the old simple token-based auth for backwards compatibility
// New 2FA flow: password + 2FA code verification
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.warn(
    "[WARNING] ADMIN_PASSWORD not set in environment. Admin dashboard will be disabled."
  );
}

export function verifyAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({
      message: "Admin authentication not configured",
    });
  }

  // Check for admin token in header or query param (simple auth)
  const token =
    req.headers.authorization?.replace("Bearer ", "") ||
    req.query.admin_token;

  if (!token || token !== ADMIN_PASSWORD) {
    return res.status(401).json({
      message: "Unauthorized. Invalid admin token.",
    });
  }

  next();
}

export function generateAdminToken(password: string): string {
  // In a production app, you'd use proper JWT tokens
  // For now, return the password as a simple token
  return password;
}

// 2FA functions
export function generateTwoFASecret(username: string): { secret: string; backupCodes: string[] } {
  const secret = speakeasy.generateSecret({
    name: `shxdowmouse (${username})`,
    issuer: "shxdowmouse",
    length: 32,
  });

  // Generate backup codes
  const backupCodes = Array.from({ length: 10 }, () =>
    crypto.randomBytes(4).toString("hex")
  );

  return {
    secret: secret.base32 || "",
    backupCodes,
  };
}

export function verifyTwoFAToken(secret: string, token: string): boolean {
  try {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
      window: 2, // Allow ±2 time windows for clock skew
    });
  } catch (error) {
    console.error("[2FA] Token verification error:", error);
    return false;
  }
}

export async function generateQRCode(secret: string): Promise<string> {
  try {
    return await QRCode.toDataURL(secret);
  } catch (error) {
    console.error("[2FA] QR code generation error:", error);
    throw error;
  }
}
