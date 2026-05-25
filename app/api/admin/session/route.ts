// app/api/admin/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify }        from "jose";

const SECRET      = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET ?? "fallback-secret-change-this"
);
const COOKIE_NAME    = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

// POST — create session after Firebase login
export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Verify Firebase ID token
    const verifyUrl =
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=` +
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    const firebaseRes = await fetch(verifyUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ idToken }),
    });

    if (!firebaseRes.ok) {
      return NextResponse.json({ error: "Invalid Firebase token" }, { status: 401 });
    }

    const firebaseData = await firebaseRes.json();
    const user         = firebaseData.users?.[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Enforce single admin by email
    const allowedEmail = process.env.ADMIN_EMAIL;
    if (allowedEmail && user.email !== allowedEmail) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Create signed JWT session token
    const sessionToken = await new SignJWT({
      uid:   user.localId,
      email: user.email,
      role:  "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(SECRET);

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:   COOKIE_MAX_AGE,
      path:     "/",
    });

    return response;
  } catch (err) {
    console.error("Session error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — logout, clear cookie
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   0,
    path:     "/",
  });
  return response;
}

// GET — verify session (used by admin layout)
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return NextResponse.json({ valid: true, user: payload });
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}