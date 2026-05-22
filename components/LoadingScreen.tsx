"use client";
import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";

const BOOT_LINES = [
  "Initializing runtime...",
  "Loading components...",
  "Compiling skill matrix...",
  "Connecting to portfolio...",
  "Ready.",
];

export default function LoadingScreen() {
  const [progress,    setProgress]    = useState(0);
  const [lineIndex,   setLineIndex]   = useState(0);
  const [visible,     setVisible]     = useState(true);
  const [fadeOut,     setFadeOut]     = useState(false);

  useEffect(() => {
    // Prevent scroll during load
    document.body.style.overflow = "hidden";

    // Progress bar
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(progressTimer); return 100; }
        // Accelerate near end
        const step = p < 70 ? 2.5 : p < 90 ? 1.5 : 0.8;
        return Math.min(p + step, 100);
      });
    }, 30);

    // Boot lines
    const lineTimer = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, BOOT_LINES.length - 1));
    }, 320);

    // Start fade-out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    // Remove from DOM
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2350);

    return () => {
      clearInterval(progressTimer);
      clearInterval(lineTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading portfolio"
      aria-live="polite"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cyber-black"
      style={{
        opacity:    fadeOut ? 0 : 1,
        transition: "opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px animate-scan-line pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs px-8">
        {/* Logo mark */}
        <div className="relative">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border border-cyber-cyan/20 animate-spin"
            style={{
              width: "76px", height: "76px",
              top: "-6px", left: "-6px",
              animationDuration: "4s",
            }}
            aria-hidden="true"
          />
          {/* Inner ring */}
          <div
            className="absolute inset-0 rounded-full border border-cyber-accent/15 animate-spin"
            style={{
              width: "88px", height: "88px",
              top: "-12px", left: "-12px",
              animationDuration: "7s",
              animationDirection: "reverse",
            }}
            aria-hidden="true"
          />

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.05))",
              border: "1px solid rgba(0,229,255,0.35)",
              boxShadow: "0 0 30px rgba(0,229,255,0.2)",
            }}
          >
            <Code2 size={28} className="text-cyber-cyan" />
          </div>
        </div>

        {/* Name */}
        <div className="text-center">
          <p className="font-display text-xl font-black tracking-[0.25em] text-white">
            NIKESH<span className="text-gradient">.</span>DEV
          </p>
          <p className="font-mono text-xs text-cyber-dim tracking-[0.2em] mt-1">
            PORTFOLIO v2.0
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="h-px w-full bg-cyber-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #00e5ff, #64ffda)",
                boxShadow: "0 0 8px rgba(0,229,255,0.6)",
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-cyber-dim">
              {BOOT_LINES[lineIndex]}
            </span>
            <span className="font-mono text-xs text-cyber-cyan font-bold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}