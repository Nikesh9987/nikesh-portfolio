"use client";
// app/admin/layout.tsx
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Code2, Menu, X, Shield } from "lucide-react";
import { adminLogout } from "@/lib/adminAuth";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const [checking,    setChecking]    = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut,  setLoggingOut]  = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") { setChecking(false); return; }
    fetch("/api/admin/session")
      .then((res) => { if (!res.ok) router.replace("/admin/login"); else setChecking(false); })
      .catch(() => router.replace("/admin/login"));
  }, [pathname, router]);

  const handleLogout = async () => { setLoggingOut(true); await adminLogout(); };

  if (pathname === "/admin/login") return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-cyber-cyan border-t-transparent animate-spin" />
          <p className="font-mono text-xs text-cyber-dim tracking-widest">VERIFYING SESSION...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(2,4,9,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 bottom-0 z-50 w-60 flex flex-col border-r border-cyber-border transition-transform duration-300 lg:translate-x-0"
        style={{
          background:     "rgba(8,13,26,0.95)",
          backdropFilter: "blur(20px)",
          transform:      sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-cyber-border">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)" }}
            >
              <Code2 size={13} className="text-cyber-cyan" />
            </div>
            <div>
              <p className="text-white text-xs font-black tracking-widest" style={{ fontFamily: "'Orbitron', monospace" }}>
                ADMIN
              </p>
              <p className="text-cyber-muted text-xs font-mono">nikesh.dev</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-cyber-dim hover:text-cyber-cyan transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-5 py-3 border-b border-cyber-border">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)" }}
          >
            <Shield size={12} className="text-cyber-cyan flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-cyber-cyan text-xs font-mono truncate">Nikesh Mandal</p>
              <p className="text-cyber-muted text-xs">Super Admin</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" aria-hidden="true" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <a
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                style={{
                  background:  active ? "rgba(0,229,255,0.12)" : "transparent",
                  border:      active ? "1px solid rgba(0,229,255,0.25)" : "1px solid transparent",
                  color:       active ? "#00e5ff" : "#8892a4",
                }}
                onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "#c8d6e5"; } }}
                onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#8892a4"; } }}
              >
                <Icon size={15} />
                <span className="font-body tracking-wide">{label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyber-cyan" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-cyber-border">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 disabled:opacity-50"
            style={{ color: "#8892a4" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f87171")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#8892a4")}
          >
            {loggingOut
              ? <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              : <LogOut size={15} />
            }
            <span className="font-body">{loggingOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-60 min-h-screen">
        {/* Mobile top bar */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-cyber-border sticky top-0 z-30"
          style={{ background: "rgba(8,13,26,0.95)", backdropFilter: "blur(20px)" }}
        >
          <button onClick={() => setSidebarOpen(true)} className="text-cyber-dim hover:text-cyber-cyan transition-colors" aria-label="Open sidebar">
            <Menu size={20} />
          </button>
          <p className="text-white text-xs font-black tracking-widest" style={{ fontFamily: "'Orbitron', monospace" }}>
            ADMIN PANEL
          </p>
          <div className="w-5" aria-hidden="true" />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}