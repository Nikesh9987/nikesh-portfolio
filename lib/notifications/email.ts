// lib/notifications/email.ts
// Sends the "new project inquiry" notification email via Resend's REST API.
// No SDK dependency — just fetch — so swapping providers later (SendGrid,
// Postmark, etc.) only means editing this one file.

export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export async function sendContactEmail(payload: ContactPayload): Promise<{
  success: boolean;
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  const to     = process.env.CONTACT_EMAIL_TO;
  const from   = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error("Email notification skipped — missing RESEND_API_KEY / CONTACT_EMAIL_TO / CONTACT_EMAIL_FROM");
    return { success: false, error: "Email service not configured" };
  }

  const { name, email, projectType, message } = payload;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New Project Inquiry — ${name} (${projectType})`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
            <h2 style="color:#0a1628;">New Project Inquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background:#f5f5f5; padding:12px; border-radius:8px;">${escapeHtml(message)}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend API error:", errText);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true };
  } catch (err) {
    console.error("Email sending failed:", err);
    return { success: false, error: "Failed to send email" };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
