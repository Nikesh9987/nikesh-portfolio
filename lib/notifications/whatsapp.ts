// lib/notifications/whatsapp.ts
// Sends the "new project inquiry" notification via Twilio's WhatsApp API.
// Uses Twilio's plain REST endpoint (Basic Auth) — no SDK dependency —
// so swapping to Meta's Cloud API later only means editing this one file.

import type { ContactPayload } from "./email";

export async function sendWhatsAppNotification(payload: ContactPayload): Promise<{
  success: boolean;
  error?: string;
}> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken  = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM; // e.g. "whatsapp:+14155238886"
  const toNumber   = process.env.TWILIO_WHATSAPP_TO;   // e.g. "whatsapp:+917257918489"

  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    console.error("WhatsApp notification skipped — missing Twilio env vars");
    return { success: false, error: "WhatsApp service not configured" };
  }

  const { name, email, projectType, message } = payload;

  const body = new URLSearchParams({
    From: fromNumber,
    To:   toNumber,
    Body:
      `🔔 New Project Inquiry\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Type: ${projectType}\n\n` +
      `Message:\n${message}`,
  });

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Twilio API error:", errText);
      return { success: false, error: "Failed to send WhatsApp message" };
    }

    return { success: true };
  } catch (err) {
    console.error("WhatsApp sending failed:", err);
    return { success: false, error: "Failed to send WhatsApp message" };
  }
}
