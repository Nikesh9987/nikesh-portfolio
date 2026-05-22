"use client";
import {
  useEffect, useRef, useState, useCallback, useMemo,
} from "react";
import {
  Upload, Play, Trash2, Film, Clock, HardDrive,
  FolderOpen, Tag, Pencil, Check, X as XIcon,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import VideoModal, { type VideoItem } from "@/components/ui/VideoModal";

// ─── Constants ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "nikesh_portfolio_videos";
const MAX_FILE_MB  = 200;
const ACCEPTED     = ["video/mp4", "video/webm", "video/ogg", "video/mov"];

const DEMO_TAGS = [
  "All", "Full Stack", "API Demo", "AI / ML", "Security", "Automation",
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function useInView(threshold = 0.08) {
  const ref  = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Thumbnail generator ───────────────────────────────────────────────────
function generateThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const video  = document.createElement("video");
    const canvas = document.createElement("canvas");
    const url    = URL.createObjectURL(file);

    video.src = url;
    video.muted = true;
    video.playsInline = true;

    video.onloadeddata = () => {
      video.currentTime = Math.min(1, video.duration * 0.1);
    };

    video.onseeked = () => {
      canvas.width  = 480;
      canvas.height = 270;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, 480, 270);
      const thumb = canvas.toDataURL("image/jpeg", 0.7);
      URL.revokeObjectURL(url);
      resolve(thumb);
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(""); // fallback to gradient
    };
  });
}

// ─── VideoCard sub-component ───────────────────────────────────────────────
interface VideoCardProps {
  video: VideoItem;
  index: number;
  inView: boolean;
  onPlay: (v: VideoItem) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
}

function VideoCard({ video, index, inView, onPlay, onDelete, onRename }: VideoCardProps) {
  const [hovered,  setHovered]  = useState(false);
  const [editing,  setEditing]  = useState(false);
  const [draft,    setDraft]    = useState(video.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const confirmRename = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== video.title) onRename(video.id, trimmed);
    setEditing(false);
  };

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const TAG_COLORS: Record<string, string> = {
    "Full Stack":  "#00e5ff",
    "API Demo":    "#4ade80",
    "AI / ML":     "#a78bfa",
    "Security":    "#f87171",
    "Automation":  "#f89820",
  };
  const tagColor = TAG_COLORS[video.tag] ?? "#64ffda";

  return (
    <article
      className="group relative cursor-default"
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease ${index * 70}ms, transform 0.5s ease ${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="glass-card rounded-2xl border overflow-hidden flex flex-col transition-all duration-400"
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

          {/* Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(2,4,9,0.5)",
              opacity: hovered ? 1 : 0,
            }}
          >
            <button
              onClick={() => onPlay(video)}
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor: tagColor,
                backgroundColor: `${tagColor}25`,
                transform: hovered ? "scale(1)" : "scale(0.6)",
                boxShadow: `0 0 24px ${tagColor}50`,
              }}
              aria-label={`Play ${video.title}`}
            >
              <Play size={20} style={{ color: tagColor }} fill={tagColor} />
            </button>
          </div>

          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
            style={{
              background: `linear-gradient(90deg, ${tagColor}, transparent)`,
              opacity: hovered ? 1 : 0.3,
            }}
          />

          {/* Tag badge */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono border backdrop-blur-sm"
              style={{
                color: tagColor,
                borderColor: `${tagColor}40`,
                backgroundColor: `${tagColor}18`,
              }}
            >
              <Tag size={9} />
              {video.tag}
            </span>
          </div>

          {/* Delete button */}
          <button
            onClick={() => onDelete(video.id)}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/25 transition-all duration-300"
            aria-label="Delete video"
          >
            <Trash2 size={11} />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          {/* Title row */}
          <div className="flex items-start gap-2">
            {editing ? (
              <div className="flex-1 flex items-center gap-1.5">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmRename();
                    if (e.key === "Escape") setEditing(false);
                  }}
                  className="flex-1 bg-transparent border border-cyber-cyan/40 rounded px-2 py-1 text-xs font-display text-white focus:outline-none focus:border-cyber-cyan"
                />
                <button onClick={confirmRename} className="text-cyber-accent hover:scale-110 transition-transform">
                  <Check size={13} />
                </button>
                <button onClick={() => setEditing(false)} className="text-cyber-muted hover:scale-110 transition-transform">
                  <XIcon size={13} />
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xs font-bold text-white tracking-wide leading-snug flex-1 line-clamp-2">
                  {video.title}
                </h3>
                <button
                  onClick={() => { setDraft(video.title); setEditing(true); }}
                  className="flex-shrink-0 text-cyber-muted hover:text-cyber-cyan transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Rename"
                >
                  <Pencil size={11} />
                </button>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-cyber-dim text-xs font-body leading-relaxed line-clamp-2">
            {video.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-auto pt-1 border-t border-cyber-border/50">
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
  const [dragging,    setDragging]    = useState(false);
  const [uploading,   setUploading]   = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showForm,    setShowForm]    = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [formData,    setFormData]    = useState({ title: "", description: "", tag: "Full Stack" });

  const dropRef  = useRef<HTMLDivElement>(null);
  const fileRef  = useRef<HTMLInputElement>(null);

  // ── Load from localStorage ─────────────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: VideoItem[] = JSON.parse(raw);
        setVideos(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // ── Persist to localStorage ────────────────────────────────────────────
  const persist = useCallback((items: VideoItem[]) => {
    setVideos(items);
    try {
      // Only persist metadata; not blob URLs (they're session-only)
      const safe = items.map((v) => ({
        ...v,
        url: v.url.startsWith("blob:") ? "" : v.url,
        thumbnail: v.thumbnail?.startsWith("data:") ? v.thumbnail : "",
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    } catch {
      // Storage quota exceeded — silent fail
    }
  }, []);

  // ── Process dropped/selected file ─────────────────────────────────────
  const processFile = useCallback(async (file: File) => {
    setUploadError("");

    if (!ACCEPTED.includes(file.type)) {
      setUploadError("Unsupported format. Please upload MP4, WebM, OGG, or MOV.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setUploadError(`File too large. Max size is ${MAX_FILE_MB} MB.`);
      return;
    }

    setPendingFile(file);
    setFormData((f) => ({ ...f, title: file.name.replace(/\.[^.]+$/, "") }));
    setShowForm(true);
  }, []);

  // ── Confirm upload ─────────────────────────────────────────────────────
  const confirmUpload = useCallback(async () => {
    if (!pendingFile) return;
    if (!formData.title.trim()) {
      setUploadError("Please enter a title.");
      return;
    }

    setUploading(true);
    setUploadError("");

    const objectUrl = URL.createObjectURL(pendingFile);
    const thumb     = await generateThumbnail(pendingFile);

    const newVideo: VideoItem = {
      id:          crypto.randomUUID(),
      title:       formData.title.trim(),
      description: formData.description.trim() || "Project demo video.",
      url:         objectUrl,
      thumbnail:   thumb,
      size:        formatBytes(pendingFile.size),
      uploadedAt:  formatDate(new Date().toISOString()),
      tag:         formData.tag,
    };

    const updated = [newVideo, ...videos];
    persist(updated);
    setPendingFile(null);
    setShowForm(false);
    setFormData({ title: "", description: "", tag: "Full Stack" });
    setUploading(false);
  }, [pendingFile, formData, videos, persist]);

  // ── Drag handlers ──────────────────────────────────────────────────────
  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };
  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  // ── Delete + rename ────────────────────────────────────────────────────
  const deleteVideo = useCallback((id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    persist(updated);
  }, [videos, persist]);

  const renameVideo = useCallback((id: string, newTitle: string) => {
    const updated = videos.map((v) => v.id === id ? { ...v, title: newTitle } : v);
    persist(updated);
  }, [videos, persist]);

  // ── Filter ─────────────────────────────────────────────────────────────
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
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionHeader
            eyebrow="DEMO REELS"
            title="Project"
            highlight="Videos"
            description="Watch live demos of my work. Upload your own project videos to showcase your builds."
          />
        </div>

        {/* Upload zone */}
        <div
          className={`transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            ref={dropRef}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => !showForm && fileRef.current?.click()}
            className="relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-400 overflow-hidden mb-10"
            style={{
              borderColor: dragging ? "rgba(0,229,255,0.7)" : "rgba(0,229,255,0.2)",
              backgroundColor: dragging ? "rgba(0,229,255,0.05)" : "rgba(10,22,40,0.4)",
              boxShadow: dragging ? "0 0 40px rgba(0,229,255,0.15), inset 0 0 40px rgba(0,229,255,0.05)" : "none",
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              className="hidden"
              onChange={onFileInput}
            />

            {!showForm ? (
              /* Drop prompt */
              <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center select-none">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: dragging ? "rgba(0,229,255,0.15)" : "rgba(0,229,255,0.08)",
                    border: `1px solid ${dragging ? "rgba(0,229,255,0.5)" : "rgba(0,229,255,0.2)"}`,
                    transform: dragging ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <Upload
                    size={28}
                    className="transition-all duration-300"
                    style={{ color: dragging ? "#00e5ff" : "rgba(0,229,255,0.5)" }}
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white tracking-wide">
                    {dragging ? "Drop to upload" : "Drag & drop your video"}
                  </p>
                  <p className="text-cyber-dim text-xs font-body mt-1">
                    or <span className="text-cyber-cyan">click to browse</span> — MP4, WebM, MOV · max {MAX_FILE_MB} MB
                  </p>
                </div>
                {uploadError && (
                  <p className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 rounded px-4 py-2">
                    {uploadError}
                  </p>
                )}
              </div>
            ) : (
              /* Upload form */
              <div
                className="p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Film size={16} className="text-cyber-cyan" />
                    <span className="font-display text-xs tracking-widest text-cyber-cyan">
                      ADD VIDEO DETAILS
                    </span>
                  </div>
                  <button
                    onClick={() => { setShowForm(false); setPendingFile(null); setUploadError(""); }}
                    className="text-cyber-muted hover:text-cyber-cyan transition-colors"
                  >
                    <XIcon size={14} />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">
                      TITLE *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
                      placeholder="My Awesome Project Demo"
                      className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-4 py-2.5 text-sm text-cyber-text placeholder-cyber-muted font-body focus:outline-none focus:border-cyber-cyan/50 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">
                      DESCRIPTION
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Brief description of what this demo shows..."
                      rows={2}
                      className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-4 py-2.5 text-sm text-cyber-text placeholder-cyber-muted font-body focus:outline-none focus:border-cyber-cyan/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Tag */}
                  <div>
                    <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">
                      CATEGORY
                    </label>
                    <select
                      value={formData.tag}
                      onChange={(e) => setFormData((f) => ({ ...f, tag: e.target.value }))}
                      className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-4 py-2.5 text-sm text-cyber-text font-body focus:outline-none focus:border-cyber-cyan/50 transition-colors"
                    >
                      {DEMO_TAGS.filter((t) => t !== "All").map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* File info */}
                  {pendingFile && (
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-cyber-border bg-cyber-dark/50">
                      <Film size={14} className="text-cyber-dim flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-cyber-text text-xs font-mono truncate">{pendingFile.name}</p>
                        <p className="text-cyber-muted text-xs">{formatBytes(pendingFile.size)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <p className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 rounded px-4 py-2 mt-4">
                    {uploadError}
                  </p>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={confirmUpload}
                    disabled={uploading}
                    className="btn-cyber flex items-center gap-2 px-5 py-2.5 bg-cyber-cyan text-cyber-black font-display text-xs font-bold tracking-widest hover:shadow-cyber-sm transition-all duration-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-cyber-black border-t-transparent animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <Upload size={12} />
                        ADD VIDEO
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => { setShowForm(false); setPendingFile(null); }}
                    className="px-5 py-2.5 border border-cyber-border text-cyber-dim font-display text-xs tracking-widest rounded hover:border-cyber-cyan/30 hover:text-cyber-text transition-all duration-300"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tag filter */}
        {videos.length > 0 && (
          <div
            className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {DEMO_TAGS.map((tag) => {
              const count = tag === "All" ? videos.length : videos.filter((v) => v.tag === tag).length;
              if (count === 0 && tag !== "All") return null;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-display tracking-widest transition-all duration-300"
                  style={
                    activeTag === tag
                      ? { backgroundColor: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.45)", color: "#00e5ff" }
                      : { backgroundColor: "transparent", border: "1px solid rgba(14,32,64,1)", color: "#4a5568" }
                  }
                >
                  {tag}
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs font-mono"
                    style={
                      activeTag === tag
                        ? { backgroundColor: "rgba(0,229,255,0.2)", color: "#00e5ff" }
                        : { backgroundColor: "rgba(14,32,64,1)", color: "#4a5568" }
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                inView={inView}
                onPlay={setActiveModal}
                onDelete={deleteVideo}
                onRename={renameVideo}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            className={`flex flex-col items-center justify-center py-16 gap-4 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="w-20 h-20 rounded-2xl glass-card border border-cyber-border flex items-center justify-center">
              <FolderOpen size={32} className="text-cyber-dim opacity-40" />
            </div>
            <div className="text-center">
              <p className="text-cyber-text font-display text-sm tracking-wide">No videos yet</p>
              <p className="text-cyber-dim font-body text-xs mt-1">
                Upload your first project demo using the zone above
              </p>
            </div>
          </div>
        )}

        {/* Stats bar */}
        {videos.length > 0 && (
          <div
            className={`mt-10 glass-card rounded-2xl p-5 border border-cyber-border flex flex-wrap items-center gap-6 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="flex items-center gap-2">
              <Film size={14} className="text-cyber-cyan" />
              <span className="font-mono text-xs text-cyber-dim">
                <span className="text-cyber-cyan font-bold">{videos.length}</span> video{videos.length !== 1 ? "s" : ""} uploaded
              </span>
            </div>
            <div className="h-4 w-px bg-cyber-border hidden sm:block" />
            <span className="font-mono text-xs text-cyber-dim">
              Showing <span className="text-cyber-text">{filtered.length}</span>
              {activeTag !== "All" && <> in <span className="text-cyber-cyan">{activeTag}</span></>}
            </span>
            <div className="ml-auto">
              <button
                onClick={() => fileRef.current?.click()}
                className="btn-cyber flex items-center gap-2 px-4 py-2 border border-cyber-cyan/40 text-cyber-cyan text-xs font-display tracking-widest bg-cyber-cyan/5 hover:bg-cyber-cyan/15 transition-all duration-300 rounded"
              >
                <Upload size={11} />
                ADD MORE
              </button>
            </div>
          </div>
        )}

        {/* Integration guide */}
        <div
          className={`mt-8 glass-card rounded-2xl p-6 border border-cyber-border transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-display text-xs tracking-widest text-cyber-dim mb-4">
            // FUTURE INTEGRATIONS
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                name: "Cloudinary",
                color: "#3448c5",
                desc: "Replace blob URLs with Cloudinary signed uploads for persistent cloud video hosting with adaptive streaming and automatic thumbnail generation.",
                steps: ["npm install cloudinary", "Set CLOUDINARY_URL env var", "Replace processFile() with Cloudinary upload API"],
              },
              {
                name: "Firebase Storage",
                color: "#f57c00",
                desc: "Use Firebase Storage for video uploads with Firestore for metadata — enabling multi-device sync and user authentication.",
                steps: ["npm install firebase", "Set NEXT_PUBLIC_FIREBASE_* env vars", "Replace persist() with Firestore collection"],
              },
            ].map((integration) => (
              <div
                key={integration.name}
                className="rounded-xl p-4 border transition-all duration-300 hover:border-opacity-60"
                style={{
                  borderColor: `${integration.color}25`,
                  backgroundColor: `${integration.color}06`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: integration.color }}
                  />
                  <span className="font-display text-xs font-bold tracking-widest text-white">
                    {integration.name}
                  </span>
                </div>
                <p className="text-cyber-dim text-xs font-body leading-relaxed mb-3">
                  {integration.desc}
                </p>
                <ul className="space-y-1">
                  {integration.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-2 text-xs font-mono text-cyber-dim">
                      <span style={{ color: integration.color }}>{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <VideoModal video={activeModal} onClose={() => setActiveModal(null)} />
    </section>
  );
}