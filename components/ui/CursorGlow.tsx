"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -999, y: -999 });
  const rafRef  = useRef<number | null>(null);

  useEffect(() => {
    // Only on pointer devices with hover capability
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = glowRef.current;
    if (!el) return;
    el.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (el) {
          el.style.left = `${pos.current.x}px`;
          el.style.top  = `${pos.current.y}px`;
        }
        rafRef.current = null;
      });
    };

    const onLeave = () => { el.style.opacity = "0"; };
    const onEnter = () => { el.style.opacity = "1"; };

    window.addEventListener("mousemove",   onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove",   onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{ opacity: 0, transition: "opacity 0.4s ease" }}
      aria-hidden="true"
    />
  );
}