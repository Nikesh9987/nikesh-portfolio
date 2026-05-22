"use client";
import { useEffect, useRef, useCallback } from "react";
import { X, Download, ExternalLink } from "lucide-react";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  size?: string;
  duration?: string;
  uploadedAt: string;
  tag: string;
}

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!video) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  // Autoplay when opened
  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [video]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) onClose();
    },
    [onClose]
  );

  if (!video) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: "rgba(2,4,9,0.92)",
        backdropFilter: "blur(12px)",
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${video.title}`}
    >
      {/* Modal container */}
      <div
        className="relative w-full max-w-4xl glass-card rounded-2xl border border-cyber-border overflow-hidden"
        style={{
          animation: "modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
          boxShadow:
            "0 0 80px rgba(0,229,255,0.1), 0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyber-border">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs text-cyber-dim tracking-widest hidden sm:block">
              // project_demo.mp4
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Tag */}
            <span className="hidden sm:block px-2.5 py-1 rounded border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono bg-cyber-cyan/5">
              {video.tag}
            </span>
            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded border border-cyber-border flex items-center justify-center text-cyber-dim hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all duration-300"
              aria-label="Close video"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Video player */}
        <div className="relative bg-black" style={{ aspectRatio: "16/9" }}>
          <video
            ref={videoRef}
            src={video.url}
            controls
            playsInline
            className="w-full h-full"
            style={{ display: "block" }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Info footer */}
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm font-bold text-white tracking-wide truncate">
              {video.title}
            </h3>
            <p className="text-cyber-dim text-xs font-body mt-1 line-clamp-2">
              {video.description}
            </p>
            <div className="flex items-center gap-3 mt-2">
              {video.size && (
                <span className="text-cyber-muted text-xs font-mono">
                  {video.size}
                </span>
              )}
              {video.duration && (
                <span className="text-cyber-muted text-xs font-mono">
                  {video.duration}
                </span>
              )}
              <span className="text-cyber-muted text-xs font-mono">
                {video.uploadedAt}
              </span>
            </div>
          </div>

          {/* ── Action buttons ───────────────────────────────────────── */}
          <div className="flex gap-2 flex-shrink-0">
            {/* SAVE button */}
            <a
              href={video.url}
              download={`${video.title}.mp4`}
              className="flex items-center gap-2 px-3 py-2 rounded border border-cyber-border text-cyber-dim text-xs font-display tracking-widest hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all duration-300"
            >
              <Download size={12} />
              SAVE
            </a>

            {/* OPEN button */}
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded border border-cyber-cyan/40 text-cyber-cyan text-xs font-display tracking-widest bg-cyber-cyan/5 hover:bg-cyber-cyan/15 transition-all duration-300"
            >
              <ExternalLink size={12} />
              OPEN
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0px);  }
        }
      `}</style>
    </div>
  );
}