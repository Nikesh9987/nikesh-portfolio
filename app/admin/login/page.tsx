"use client";
// app/admin/login/page.tsx
import { useState, useEffect } from "react";
import { useRouter }           from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle, Loader2 } from "lucide-react";
import { adminLogin }          from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }
    setError("");
    setLoading(true);
    const result = await adminLogin(email.trim(), password);
    if (result.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(result.error ?? "Login failed");
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,180,216,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-md"
        style={{
          opacity:    mounted ? 1 : 0,
          transform:  mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div
          className="rounded-2xl border border-cyber-border p-8"
          style={{
            background:     "rgba(10,22,40,0.80)",
            backdropFilter: "blur(20px)",
            boxShadow:      "0 0 60px rgba(0,229,255,0.08), 0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(0,229,255,0.1)",
                border:     "1px solid rgba(0,229,255,0.3)",
                boxShadow:  "0 0 24px rgba(0,229,255,0.15)",
              }}
            >
              <Shield size={28} className="text-cyber-cyan" />
            </div>
            <div className="text-center">
              <h1
                className="text-white font-black tracking-[0.2em] text-xl"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                ADMIN ACCESS
              </h1>
              <p className="text-cyber-dim text-xs font-mono tracking-widest mt-1">
                nikesh.dev / restricted
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block font-mono text-xs text-cyber-dim tracking-widest mb-1.5">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full pl-9 pr-4 py-3 rounded-lg text-sm text-cyber-text placeholder-cyber-muted font-body focus:outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: "rgba(8,13,26,0.8)",
                    border:     error ? "1px solid rgba(248,113,113,0.6)" : "1px solid rgba(14,32,64,1)",
                  }}
                  onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "rgba(0,229,255,0.5)"; }}
                  onBlur={(e)  => { if (!error) e.currentTarget.style.borderColor = "rgba(14,32,64,1)";   }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-xs text-cyber-dim tracking-widest mb-1.5">
                PASSWORD
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted pointer-events-none" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full pl-9 pr-10 py-3 rounded-lg text-sm text-cyber-text placeholder-cyber-muted font-body focus:outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: "rgba(8,13,26,0.8)",
                    border:     error ? "1px solid rgba(248,113,113,0.6)" : "1px solid rgba(14,32,64,1)",
                  }}
                  onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "rgba(0,229,255,0.5)"; }}
                  onBlur={(e)  => { if (!error) e.currentTarget.style.borderColor = "rgba(14,32,64,1)";   }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-cyber-cyan transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-mono"
                style={{
                  background: "rgba(248,113,113,0.08)",
                  border:     "1px solid rgba(248,113,113,0.25)",
                  color:      "#f87171",
                }}
              >
                <AlertCircle size={13} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-black text-xs tracking-widest transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Orbitron', monospace",
                background: loading ? "rgba(0,229,255,0.6)" : "#00e5ff",
                color:      "#020409",
                boxShadow:  loading ? "none" : "0 0 20px rgba(0,229,255,0.3)",
              }}
            >
              {loading ? (
                <><Loader2 size={14} className="animate-spin" />AUTHENTICATING...</>
              ) : (
                <><Lock size={14} />SIGN IN</>
              )}
            </button>
          </form>

          <p className="text-center text-cyber-muted text-xs font-mono mt-6">
            Restricted access — authorized personnel only
          </p>
        </div>

        <div className="text-center mt-4">
          <a href="/" className="text-cyber-dim text-xs font-mono hover:text-cyber-cyan transition-colors">
            ← Back to portfolio
          </a>
        </div>
      </div>
    </div>
  );
}