// lib/adminAuth.ts
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function adminLogin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/api/admin/session", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const data = await response.json();
      await firebaseSignOut(auth);
      return { success: false, error: data.error ?? "Authentication failed" };
    }

    return { success: true };
  } catch (err: unknown) {
    const error = err as { code?: string };
    const messages: Record<string, string> = {
      "auth/user-not-found":       "No account found with this email",
      "auth/wrong-password":       "Incorrect password",
      "auth/invalid-email":        "Invalid email address",
      "auth/too-many-requests":    "Too many attempts. Try again later",
      "auth/invalid-credential":   "Invalid email or password",
      "auth/network-request-failed": "Network error. Check your connection",
    };
    return {
      success: false,
      error: messages[error.code ?? ""] ?? "Login failed. Please try again",
    };
  }
}

export async function adminLogout(): Promise<void> {
  try {
    await firebaseSignOut(auth);
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.href = "/admin/login";
  } catch {
    window.location.href = "/admin/login";
  }
}