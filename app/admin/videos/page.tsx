"use client";
// app/admin/videos/page.tsx
// Admin Video Manager — upload to Cloudinary, save to Firestore, delete, edit

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Upload, Trash2, Film, Clock, HardDrive, Tag,
  Pencil, Check, X as XIcon, AlertCircle, FolderOpen,
  Loader2, RefreshCw, Shield,
} from "lucide-react";
import {
  uploadVideoToCloudinary,
  deleteVideoFromCloudinary,
  formatBytes,
  formatDuration,
  type UploadProgress,
} from "@/lib/cloudinary";
import {
  addVideo,
  getVideos,
  deleteVideoFromFirestore,
  updateVideo,
  type VideoDocument,
} from "@/lib/videoService";

// ─── Constants ─────────────────────────────────────────────────────────────
const MAX_FILE_MB = 100; // Cloudinary free tier: 100MB per video
const ACCEPTED    = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];

const DEMO_TAGS = [
  "Full Stack", "API Demo", "AI / ML", "Security", "Automation",
];

const TAG_COLORS: Record<string, string> = {
  "Full Stack": "#00e5ff",
  "API Demo":   "#4ade80",
  "AI / ML":    "#a78bfa",
  "Security":   "#f87171",
  "Automation": "#f89820",
};

// ─── VideoCard ─────────────────────────────────────────────────────────────
interface VideoCardProps {
  video:     VideoDocument;
  onDelete:  (v: VideoDocument) => void;
  onUpdate:  (id: string, updates: { title?: string; description?: string; tag?: string }) => void;
  deleting:  boolean;
}

function AdminVideoCard({ video, onDelete, onUpdate, deleting }: VideoCardProps) {
  const [hovered,  setHovered]  = useState(false);
  const [editing,  setEditing]  = useState(false);
  const [draft,    setDraft]    = useState({
    title:       video.title,
    description: video.description,
    tag:         video.tag,
  });
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const tagColor = TAG_COLORS[video.tag] ?? "#64ffda";

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(video.id, draft);
    setSaving(false);
    setEditing(false);
  };

  return (
    <article
      className="rounded-2xl border overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background:   "rgba(10,22,40,0.6)",
        borderColor:  hovered ? `${tagColor}45` : "rgba(14,32,64,1)",
        boxShadow:    hovered ? `0 0 24px ${tagColor}10` : "none",
        transform:    hovered ? "translateY(-2px)" : "translateY(0)",
        opacity:      deleting ? 0.4 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: "16/9" }}>
        {video.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${tagColor}15, rgba(0,0,0,0.6))` }}
          >
            <Film size={28} className="text-cyber-dim opacity-40" />
          </div>
        )}

        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${tagColor}, transparent)`, opacity: hovered ? 1 : 0.3 }}
        />

        {/* Tag badge */}
        <div className="absolute top-2 left-2">
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono border backdrop-blur-sm"
            style={{ color: tagColor, borderColor: `${tagColor}40`, backgroundColor: `${tagColor}18` }}
          >
            <Tag size={9} />
            {video.tag}
          </span>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(video)}
          disabled={deleting}
          className="absolute top-2 right-2 w-7 h-7 rounded-full border border-red-500/40 bg-red-500/15 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/30 transition-all duration-300 disabled:cursor-not-allowed"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-label="Delete video"
        >
          {deleting ? (
            <Loader2 size={11} className="animate-spin" />
          ) : (
            <Trash2 size={11} />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {editing ? (
          /* Edit form */
          <div className="space-y-3">
            <div>
              <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1">TITLE</label>
              <input
                ref={inputRef}
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                className="w-full bg-cyber-dark border border-cyber-cyan/40 rounded px-3 py-1.5 text-xs font-body text-white focus:outline-none focus:border-cyber-cyan"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1">DESCRIPTION</label>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                rows={2}
                className="w-full bg-cyber-dark border border-cyber-cyan/40 rounded px-3 py-1.5 text-xs font-body text-white focus:outline-none focus:border-cyber-cyan resize-none"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1">CATEGORY</label>
              <select
                value={draft.tag}
                onChange={(e) => setDraft((d) => ({ ...d, tag: e.target.value }))}
                className="w-full bg-cyber-dark border border-cyber-cyan/40 rounded px-3 py-1.5 text-xs font-body text-white focus:outline-none focus:border-cyber-cyan"
              >
                {DEMO_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-display tracking-widest bg-cyber-cyan text-cyber-black font-bold transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                {saving ? "SAVING..." : "SAVE"}
              </button>
              <button
                onClick={() => { setEditing(false); setDraft({ title: video.title, description: video.description, tag: video.tag }); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-display tracking-widest border border-cyber-border text-cyber-dim hover:text-cyber-text transition-all"
              >
                <XIcon size={11} />
                CANCEL
              </button>
            </div>
          </div>
        ) : (
          /* Display mode */
          <>
            <div className="flex items-start gap-2">
              <h3 className="font-display text-xs font-bold text-white tracking-wide leading-snug flex-1 line-clamp-2">
                {video.title}
              </h3>
              <button
                onClick={() => setEditing(true)}
                className="flex-shrink-0 text-cyber-muted hover:text-cyber-cyan transition-colors"
                style={{ opacity: hovered ? 1 : 0 }}
                aria-label="Edit video"
              >
                <Pencil size={11} />
              </button>
            </div>
            <p className="text-cyber-dim text-xs font-body leading-relaxed line-clamp-2">
              {video.description}
            </p>
            <div className="flex items-center gap-3 mt-auto pt-2 border-t border-cyber-border/50">
              {video.size && (
                <span className="flex items-center gap-1 text-cyber-muted text-xs font-mono">
                  <HardDrive size={9} />{video.size}
                </span>
              )}
              {video.duration && (
                <span className="flex items-center gap-1 text-cyber-muted text-xs font-mono">
                  <Clock size={9} />{video.duration}
                </span>
              )}
              <span className="ml-auto text-cyber-muted text-xs font-mono">{video.uploadedAt}</span>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function AdminVideosPage() {
  const [videos,       setVideos]       = useState<VideoDocument[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [dragging,     setDragging]     = useState(false);
  const [uploadError,  setUploadError]  = useState("");
  const [showForm,     setShowForm]     = useState(false);
  const [pendingFile,  setPendingFile]  = useState<File | null>(null);
  const [uploading,    setUploading]    = useState(false);
  const [progress,     setProgress]     = useState<UploadProgress | null>(null);
  const [deletingId,   setDeletingId]   = useState<string | null>(null);
  const [formData,     setFormData]     = useState({ title: "", description: "", tag: "Full Stack" });
  const [successMsg,   setSuccessMsg]   = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  // ── Load videos from Firestore ───────────────────────────────────────────
  const loadVideos = useCallback(async () => {
    setLoading(true);
    const data = await getVideos();
    setVideos(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadVideos(); }, [loadVideos]);

  // ── Show success message temporarily ────────────────────────────────────
  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ── Process file selection ───────────────────────────────────────────────
  const processFile = useCallback((file: File) => {
    setUploadError("");
    if (!ACCEPTED.includes(file.type)) {
      setUploadError("Unsupported format. Use MP4, WebM, OGG, or MOV.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setUploadError(`File too large. Max ${MAX_FILE_MB} MB on free tier.`);
      return;
    }
    setPendingFile(file);
    setFormData((f) => ({ ...f, title: file.name.replace(/\.[^.]+$/, "") }));
    setShowForm(true);
  }, []);

  // ── Upload to Cloudinary → save to Firestore ─────────────────────────────
  const handleUpload = async () => {
    if (!pendingFile) return;
    if (!formData.title.trim()) { setUploadError("Title is required."); return; }

    setUploading(true);
    setUploadError("");
    setProgress(null);

    try {
      // Step 1: Upload to Cloudinary with progress tracking
      const cloudResult = await uploadVideoToCloudinary(pendingFile, (p) => {
        setProgress(p);
      });

      // Step 2: Save metadata to Firestore
      const result = await addVideo({
        title:        formData.title.trim(),
        description:  formData.description.trim() || "Project demo video.",
        tag:          formData.tag,
        publicId:     cloudResult.public_id,
        secureUrl:    cloudResult.secure_url,
        thumbnailUrl: cloudResult.thumbnail_url,
        duration:     formatDuration(cloudResult.duration),
        size:         formatBytes(cloudResult.bytes),
      });

      if (!result.success) throw new Error(result.error);

      // Step 3: Reset and reload
      setPendingFile(null);
      setShowForm(false);
      setProgress(null);
      setFormData({ title: "", description: "", tag: "Full Stack" });
      await loadVideos();
      showSuccess("Video uploaded successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setUploadError(message);
    } finally {
      setUploading(false);
    }
  };

  // ── Delete video (Cloudinary + Firestore) ────────────────────────────────
  const handleDelete = async (video: VideoDocument) => {
    if (!confirm(`Delete "${video.title}"? This cannot be undone.`)) return;

    setDeletingId(video.id);

    // Delete from Cloudinary first
    await deleteVideoFromCloudinary(video.publicId);

    // Then delete from Firestore
    const result = await deleteVideoFromFirestore(video.id);

    if (result.success) {
      setVideos((prev) => prev.filter((v) => v.id !== video.id));
      showSuccess("Video deleted.");
    } else {
      setUploadError(result.error ?? "Delete failed");
    }

    setDeletingId(null);
  };

  // ── Update video metadata ────────────────────────────────────────────────
  const handleUpdate = async (
    id: string,
    updates: { title?: string; description?: string; tag?: string }
  ) => {
    const result = await updateVideo(id, updates);
    if (result.success) {
      setVideos((prev) =>
        prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
      );
      showSuccess("Video updated.");
    }
  };

  // ── Drag handlers ────────────────────────────────────────────────────────
  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragging(true);  };
  const onDragLeave = ()                   => { setDragging(false);  };
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={13} className="text-cyber-cyan" />
            <span className="font-mono text-xs text-cyber-cyan tracking-widest">
              ADMIN · VIDEO MANAGER
            </span>
          </div>
          <h1
            className="text-white text-xl font-black tracking-wide"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            Manage Videos
          </h1>
          <p className="text-cyber-dim text-xs font-body mt-1">
            Upload to Cloudinary · Metadata stored in Firestore
          </p>
        </div>
        <button
          onClick={loadVideos}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded border border-cyber-border text-cyber-dim text-xs font-display tracking-widest hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all duration-300"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          REFRESH
        </button>
      </div>

      {/* Success message */}
      {successMsg && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg border text-xs font-mono"
          style={{
            background:  "rgba(74,222,128,0.08)",
            border:      "1px solid rgba(74,222,128,0.25)",
            color:       "#4ade80",
          }}
        >
          <Check size={13} />
          {successMsg}
        </div>
      )}

      {/* Upload zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !showForm && !uploading && fileRef.current?.click()}
        className="relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden"
        style={{
          borderColor:     dragging ? "rgba(0,229,255,0.7)" : "rgba(0,229,255,0.25)",
          backgroundColor: dragging ? "rgba(0,229,255,0.05)" : "rgba(10,22,40,0.4)",
          boxShadow:       dragging ? "0 0 40px rgba(0,229,255,0.1)" : "none",
          cursor:          showForm || uploading ? "default" : "pointer",
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/quicktime"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ""; }}
        />

        {!showForm && !uploading && (
          /* Drop prompt */
          <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center select-none">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: dragging ? "rgba(0,229,255,0.15)" : "rgba(0,229,255,0.08)",
                border:          `1px solid ${dragging ? "rgba(0,229,255,0.5)" : "rgba(0,229,255,0.2)"}`,
                transform:       dragging ? "scale(1.1)" : "scale(1)",
              }}
            >
              <Upload size={24} style={{ color: dragging ? "#00e5ff" : "rgba(0,229,255,0.5)" }} />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white tracking-wide">
                {dragging ? "Drop to upload" : "Drag & drop video here"}
              </p>
              <p className="text-cyber-dim text-xs font-body mt-1">
                or <span className="text-cyber-cyan">click to browse</span> · MP4, WebM, MOV · max {MAX_FILE_MB} MB
              </p>
            </div>
          </div>
        )}

        {showForm && !uploading && (
          /* Metadata form */
          <div className="p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Film size={15} className="text-cyber-cyan" />
                <span className="font-display text-xs tracking-widest text-cyber-cyan">
                  VIDEO DETAILS
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
                <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">TITLE *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
                  placeholder="My Project Demo"
                  className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-4 py-2.5 text-sm text-cyber-text placeholder-cyber-muted font-body focus:outline-none focus:border-cyber-cyan/50 transition-colors"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">DESCRIPTION</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                  placeholder="What does this demo show?"
                  rows={2}
                  className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-4 py-2.5 text-sm text-cyber-text placeholder-cyber-muted font-body focus:outline-none focus:border-cyber-cyan/50 transition-colors resize-none"
                />
              </div>

              {/* Tag + file info */}
              <div>
                <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">CATEGORY</label>
                <select
                  value={formData.tag}
                  onChange={(e) => setFormData((f) => ({ ...f, tag: e.target.value }))}
                  className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-4 py-2.5 text-sm text-cyber-text font-body focus:outline-none focus:border-cyber-cyan/50 transition-colors"
                >
                  {DEMO_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {pendingFile && (
                <div
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-cyber-border"
                  style={{ background: "rgba(8,13,26,0.6)" }}
                >
                  <Film size={14} className="text-cyber-dim flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-cyber-text text-xs font-mono truncate">{pendingFile.name}</p>
                    <p className="text-cyber-muted text-xs">{formatBytes(pendingFile.size)}</p>
                  </div>
                </div>
              )}
            </div>

            {uploadError && (
              <div className="flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg border border-red-500/25 bg-red-500/08 text-red-400 text-xs font-mono">
                <AlertCircle size={12} />
                {uploadError}
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={handleUpload}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyber-cyan text-cyber-black font-display text-xs font-bold tracking-widest rounded transition-all hover:shadow-cyber-sm"
              >
                <Upload size={12} />
                UPLOAD TO CLOUDINARY
              </button>
              <button
                onClick={() => { setShowForm(false); setPendingFile(null); }}
                className="px-5 py-2.5 border border-cyber-border text-cyber-dim font-display text-xs tracking-widest rounded hover:border-cyber-cyan/30 hover:text-cyber-text transition-all"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}

        {uploading && (
          /* Upload progress */
          <div className="p-8 flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)" }}
            >
              <Loader2 size={24} className="text-cyber-cyan animate-spin" />
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyber-dim">
                  {progress ? "Uploading to Cloudinary..." : "Preparing..."}
                </span>
                <span className="text-cyber-cyan font-bold">
                  {progress?.percent ?? 0}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-cyber-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width:      `${progress?.percent ?? 0}%`,
                    background: "linear-gradient(90deg, #00e5ff, #64ffda)",
                    boxShadow:  "0 0 8px rgba(0,229,255,0.6)",
                  }}
                />
              </div>
              {progress && (
                <p className="text-cyber-muted text-xs font-mono text-center">
                  {formatBytes(progress.loaded)} / {formatBytes(progress.total)}
                </p>
              )}
            </div>
            <p className="text-cyber-dim text-xs font-body text-center">
              Saving to Firestore after upload...
            </p>
          </div>
        )}
      </div>

      {/* Error outside form */}
      {uploadError && !showForm && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/25 bg-red-500/08 text-red-400 text-xs font-mono">
          <AlertCircle size={13} />
          {uploadError}
        </div>
      )}

      {/* Video grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-xs text-cyber-dim tracking-widest">
            // UPLOADED VIDEOS{" "}
            <span className="text-cyber-cyan">({videos.length})</span>
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <Loader2 size={20} className="text-cyber-cyan animate-spin" />
            <span className="font-mono text-xs text-cyber-dim tracking-widest">
              LOADING FROM FIRESTORE...
            </span>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(14,32,64,1)" }}
            >
              <FolderOpen size={28} className="text-cyber-dim opacity-40" />
            </div>
            <div className="text-center">
              <p className="text-cyber-text font-display text-sm tracking-wide">No videos yet</p>
              <p className="text-cyber-dim font-body text-xs mt-1">
                Upload your first project demo above
              </p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <AdminVideoCard
                key={video.id}
                video={video}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                deleting={deletingId === video.id}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
