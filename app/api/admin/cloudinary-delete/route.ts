// app/api/admin/cloudinary-delete/route.ts
// Server-side Cloudinary delete — API secret never exposed to client
// Protected: checks admin session cookie before deleting

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify }                  from "jose";

const SECRET      = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET ?? ""
);
const COOKIE_NAME = "admin_session";

export async function POST(req: NextRequest) {
  // ── 1. Verify admin session ──────────────────────────────────────────────
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  // ── 2. Get publicId from request body ────────────────────────────────────
  const { publicId } = await req.json();

  if (!publicId) {
    return NextResponse.json({ error: "publicId is required" }, { status: 400 });
  }

  // ── 3. Call Cloudinary Delete API with server-side secret ────────────────
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const apiKey    = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  // Cloudinary requires a SHA-1 signed timestamp for delete
  const timestamp = Math.floor(Date.now() / 1000).toString();

  // Build the string to sign
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

  // Generate SHA-1 signature using Web Crypto API (available in Edge runtime)
  const encoder    = new TextEncoder();
  const data       = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray  = Array.from(new Uint8Array(hashBuffer));
  const signature  = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // Call Cloudinary API
  const formData = new FormData();
  formData.append("public_id",    publicId);
  formData.append("timestamp",    timestamp);
  formData.append("api_key",      apiKey);
  formData.append("signature",    signature);
  formData.append("resource_type","video");

  const cloudinaryRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/video/destroy`,
    { method: "POST", body: formData }
  );

  const result = await cloudinaryRes.json();

  if (result.result === "ok" || result.result === "not found") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: result.result ?? "Cloudinary delete failed" },
    { status: 500 }
  );
}