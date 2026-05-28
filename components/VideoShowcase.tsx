"use client";
// components/VideoShowcase.tsx
// PUBLIC VIEW ONLY — no upload, delete, or edit functionality
// Admin can manage videos at /admin/videos

import { useEffect, useRef, useState, useMemo } from "react";
import { Play, Film, Clock, HardDrive, Tag, FolderOpen } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import VideoModal, { type VideoItem } from "@/components/ui/VideoModal";

// ─── Constants ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "nikesh_portfolio_videos"; // legacy localStorage read

const DEMO_TAGS = [
  "All", "Full Stack", "API Demo", "AI / ML", "Security", "Automation",
];

const TAG_COLORS: Record<string, string> = {
  "Full Stack": "#00e5ff",
  "API Demo":   "#4ade80",
  "AI / ML":    "#a78bfa",
  "Security":   "#f87171",
  "Automation": "#f89820",
};

// ─── useInView hook ────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── VideoCard — public read-only ──────────────────────────────────────────
interface VideoCardProps {
  video:  VideoItem;
  index:  number;
  inView: boolean;
  onPlay: (v: VideoItem) => void;
}

function VideoCard({ video, index, inView, onPlay }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const tagColor = TAG_COLORS[video.tag] ?? "#64ffda";

  return (
    <article
      className="group relative cursor-default"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease ${index * 70}ms, transform 0.5s ease ${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="glass-card rounded-2xl border overflow-hidden flex flex-col transition-all duration-300"
        style={{
          borderColor: hovered ? `${tagColor}45` : "rgba(14,32,64,1)",
          boxShadow:   hovered ? `0 0 32px ${tagColor}10, 0 16px 48px rgba(0,0,0,0.4)` : "none",
          transform:   hovered ? "translateY(-3px)" : "translateY(0)",
        }}
      >
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{ aspectRatio: "16/9" }}
        >
          {video.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${tagColor}15 0%, rgba(0,0,0,0.6) 100%)`,
              }}
            >
              <Film size={32} className="text-cyber-dim opacity-40" />
            </div>
          )}

          {/* Play overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(2,4,9,0.45)",
              opacity:    hovered ? 1 : 0,
            }}
          >
            <button
              onClick={() => onPlay(video)}
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor:     tagColor,
                backgroundColor: `${tagColor}25`,
                transform:       hovered ? "scale(1)" : "scale(0.6)",
                boxShadow:       `0 0 24px ${tagColor}50`,
              }}
              aria-label={`Play ${video.title}`}
            >
              <Play size={20} style={{ color: tagColor }} fill={tagColor} />
            </button>
          </div>

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
            style={{
              background: `linear-gradient(90deg, ${tagColor}, transparent)`,
              opacity:    hovered ? 1 : 0.3,
            }}
          />

          {/* Tag badge */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono border backdrop-blur-sm"
              style={{
                color:           tagColor,
                borderColor:     `${tagColor}40`,
                backgroundColor: `${tagColor}18`,
              }}
            >
              <Tag size={9} />
              {video.tag}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-display text-xs font-bold text-white tracking-wide leading-snug line-clamp-2">
            {video.title}
          </h3>

          <p className="text-cyber-dim text-xs font-body leading-relaxed line-clamp-2 flex-1">
            {video.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-auto pt-2 border-t border-cyber-border/50">
            {video.size && (
              <span className="flex items-center gap-1 text-cyber-muted text-xs font-mono">
                <HardDrive size={9} /> {video.size}
              </span>
            )}
            {video.duration && (
              <span className="flex items-center gap-1 text-cyber-muted text-xs font-mono">
                <Clock size={9} /> {video.duration}
              </span>
            )}
            <span className="ml-auto text-cyber-muted text-xs font-mono">
              {video.uploadedAt}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────
export default function VideoShowcase() {
  const { ref, inView } = useInView();

  const [videos,      setVideos]      = useState<VideoItem[]>([]);
  const [activeModal, setActiveModal] = useState<VideoItem | null>(null);
  const [activeTag,   setActiveTag]   = useState("All");

  // ── Load from localStorage (legacy — will be replaced with Firestore in Phase 3)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: VideoItem[] = JSON.parse(raw);
        // Only load videos that have a valid URL
        setVideos(parsed.filter((v) => v.url && v.url.trim() !== ""));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // ── Filter by tag ──────────────────────────────────────────────────────
  const filtered = useMemo(
    () => activeTag === "All" ? videos : videos.filter((v) => v.tag === activeTag),
    [videos, activeTag]
  );

  return (
    <section
      id="videos"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute left-0 bottom-1/4 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(100,255,218,0.4) 0%, transparent 70%)",
          filter:     "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader
            eyebrow="DEMO REELS"
            title="Project"
            highlight="Videos"
            description="Watch live demos of my work — full stack apps, APIs, AI tools, and automation systems in action."
          />
        </div>

        {/* Tag filter — only shown if videos exist */}
        {videos.length > 0 && (
          <div
            className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {DEMO_TAGS.map((tag) => {
              const count =
                tag === "All"
                  ? videos.length
                  : videos.filter((v) => v.tag === tag).length;
              if (count === 0 && tag !== "All") return null;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-display tracking-widest transition-all duration-300"
                  style={
                    activeTag === tag
                      ? {
                          backgroundColor: "rgba(0,229,255,0.12)",
                          border:          "1px solid rgba(0,229,255,0.45)",
                          color:           "#00e5ff",
                        }
                      : {
                          backgroundColor: "transparent",
                          border:          "1px solid rgba(14,32,64,1)",
                          color:           "#4a5568",
                        }
                  }
                >
                  {tag}
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs font-mono"
                    style={
                      activeTag === tag
                        ? { backgroundColor: "rgba(0,229,255,0.2)", color: "#00e5ff" }
                        : { backgroundColor: "rgba(14,32,64,1)",    color: "#4a5568" }
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Video grid */}
        {filtered.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((video, i) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={i}
                  inView={inView}
                  onPlay={setActiveModal}
                />
              ))}
            </div>

            {/* Stats bar — read only */}
            <div
              className={`mt-10 glass-card rounded-2xl p-5 border border-cyber-border flex flex-wrap items-center gap-6 transition-all duration-700 delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center gap-2">
                <Film size={14} className="text-cyber-cyan" />
                <span className="font-mono text-xs text-cyber-dim">
                  <span className="text-cyber-cyan font-bold">{videos.length}</span>{" "}
                  video{videos.length !== 1 ? "s" : ""} available
                </span>
              </div>
              {activeTag !== "All" && (
                <>
                  <div className="h-4 w-px bg-cyber-border hidden sm:block" />
                  <span className="font-mono text-xs text-cyber-dim">
                    Showing{" "}
                    <span className="text-cyber-text">{filtered.length}</span> in{" "}
                    <span className="text-cyber-cyan">{activeTag}</span>
                  </span>
                </>
              )}
            </div>
          </>
        ) : (
          /* Empty state — clean, no upload prompt */
          <div
            className={`flex flex-col items-center justify-center py-20 gap-5 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl glass-card border border-cyber-border flex items-center justify-center"
              style={{
                background: "rgba(10,22,40,0.6)",
                boxShadow:  "0 0 40px rgba(0,229,255,0.05)",
              }}
            >
              <FolderOpen size={32} className="text-cyber-dim opacity-40" />
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <p
                className="text-cyber-text font-display text-sm tracking-widest"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                NO VIDEOS YET
              </p>
              <p className="text-cyber-dim font-body text-xs max-w-xs leading-relaxed">
                Project demo videos are coming soon. Check back later to watch live demos of my work.
              </p>
            </div>

            {/* Decorative line */}
            <div
              className="w-24 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)",
              }}
              aria-hidden="true"
            />
          </div>
        )}

      </div>

      {/* Video modal */}
      <VideoModal video={activeModal} onClose={() => setActiveModal(null)} />
    </section>
  );
}