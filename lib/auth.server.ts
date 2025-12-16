// lib/auth.server.ts
import { createHash } from "crypto";

export function verifyApiKey(apiKey: string): boolean {
  if (!process.env.INTERNAL_API_KEY) {
    console.warn("INTERNAL_API_KEY is not set, authentication is disabled");
    return true;
  }

  const hashedKey = createHash("sha256").update(apiKey).digest("hex");
  return hashedKey === process.env.INTERNAL_API_KEY;
}

export function validateCronRequest(request: Request): boolean {
  if (!process.env.CRON_SECRET_TOKEN) {
    console.warn("CRON_SECRET_TOKEN is not set, cron authentication is disabled");
    return true;
  }

  const authHeader = request.headers.get("authorization");
  const expectedToken = `Bearer ${process.env.CRON_SECRET_TOKEN}`;

  return !!authHeader && authHeader === expectedToken;
}
