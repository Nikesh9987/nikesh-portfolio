// app/api/contact/route.ts
// Handles the "new_project_inquiry" form submission.
// Validates input server-side, then notifies via Email (Resend) + WhatsApp (Twilio).
// Both notifiers are independent — if one provider is swapped or removed later,
// nothing else in this route needs to change.

import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, type ContactPayload } from "@/lib/notifications/email";
import { sendWhatsAppNotification } from "@/lib/notifications/whatsapp";

// ── Very small in-memory rate limiter (per server instance) ─────────────────
// Prevents obvious spam-bot hammering. For serious abuse protection at scale,
// swap this for Upstash Redis / Vercel KV — the interface below stays the same.
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function validate(payload: Partial<ContactPayload>): string | null {
  if (!payload.name?.trim()) return "Name is required";
  if (!payload.email?.trim()) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(payload.email)) return "Invalid email address";
  if (!payload.projectType?.trim()) return "Project type is required";
  if (!payload.message?.trim() || payload.message.trim().length < 20)
    return "Message must be at least 20 characters";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const payload: ContactPayload = {
      name: body.name.trim(),
      email: body.email.trim(),
      projectType: body.projectType.trim(),
      message: body.message.trim(),
    };

    // Fire both notifications in parallel — one failing shouldn't block the other.
    const [emailResult, whatsappResult] = await Promise.all([
      sendContactEmail(payload),
      sendWhatsAppNotification(payload),
    ]);

    if (!emailResult.success && !whatsappResult.success) {
      console.error("Both notification channels failed", {
        emailResult,
        whatsappResult,
      });
      return NextResponse.json(
        { error: "Failed to deliver your message. Please email directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      channels: {
        email: emailResult.success,
        whatsapp: whatsappResult.success,
      },
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
