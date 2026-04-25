import { Request, Response, NextFunction } from "express";

// Admin authentication middleware
// In production, set ADMIN_PASSWORD as an environment variable
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

  // Check for admin token in header or query param
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
