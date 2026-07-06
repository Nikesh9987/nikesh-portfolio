"use client";
// app/admin/page.tsx
import { Shield, ExternalLink, ArrowRight } from "lucide-react";

const QUICK_ACTIONS = [
  {
    title:       "View Portfolio",
    description: "See how your portfolio looks to visitors",
    href:        "/",
    icon:        ExternalLink,
    color:       "#64ffda",
    external:    true,
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Shield size={14} className="text-cyber-cyan" />
          <span className="font-mono text-xs text-cyber-cyan tracking-widest">ADMIN DASHBOARD</span>
        </div>
        <h1
          className="text-white text-2xl font-black tracking-wide"
          style={{ fontFamily: "'Orbitron', monospace" }}
        >
          Welcome back, Nikesh
        </h1>
        <p className="text-cyber-dim text-sm font-body mt-1">
          Manage your portfolio content from here.
        </p>
      </div>

      {/* Quick actions */}
      <div>
        <p className="font-mono text-xs text-cyber-dim tracking-widest mb-4">// QUICK ACTIONS</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {QUICK_ACTIONS.map(({ title, description, href, icon: Icon, color, external }) => (
            <a
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-cyber-border transition-all duration-300"
              style={{ background: "rgba(10,22,40,0.6)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${color}40`;
                el.style.boxShadow   = `0 0 24px ${color}10`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "";
                el.style.boxShadow   = "";
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}12`, border: `1px solid ${color}30` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-bold text-white tracking-wide">{title}</h3>
                <p className="text-cyber-dim text-xs font-body mt-1 leading-relaxed">{description}</p>
              </div>
              <ArrowRight
                size={14}
                className="text-cyber-muted group-hover:text-cyber-cyan flex-shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-1"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Status card */}
      <div
        className="rounded-2xl border border-cyber-border p-5 flex items-center gap-4"
        style={{ background: "rgba(10,22,40,0.6)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}
        >
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
        </div>
        <div>
          <p className="text-white text-sm font-medium font-body">Admin session active</p>
          <p className="text-cyber-dim text-xs font-mono mt-0.5">
            Session expires in 24 hours · Secured with JWT + Firebase Auth
          </p>
        </div>
      </div>

    </div>
  );
}