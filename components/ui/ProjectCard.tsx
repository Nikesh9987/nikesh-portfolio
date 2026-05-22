"use client";
import { useState } from "react";
import { Github, ExternalLink, Play } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDesc: string;
  category: string;
  color: string;
  gradient: string;
  tech: string[];
  github: string;
  demo: string;
  status: "live" | "demo" | "wip";
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
}

const STATUS_LABELS = {
  live: { label: "Live",        color: "#4ade80" },
  demo: { label: "Demo",        color: "#00e5ff" },
  wip:  { label: "In Progress", color: "#f59e0b" },
};

export default function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_LABELS[project.status];

  return (
    <article
      className="relative group cursor-default"
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="glass-card rounded-2xl border overflow-hidden h-full flex flex-col transition-all duration-400"
        style={{
          borderColor: hovered ? `${project.color}50` : "rgba(14,32,64,1)",
          boxShadow:   hovered
            ? `0 0 40px ${project.color}12, 0 20px 60px rgba(0,0,0,0.4)`
            : "none",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* ── Visual header ─────────────────────────────────────────── */}
        <div
          className="relative h-44 overflow-hidden flex-shrink-0"
          style={{ background: project.gradient }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"
            aria-hidden="true"
          />

          {/* Corner dots */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>

          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border backdrop-blur-sm"
              style={{
                color:           status.color,
                borderColor:     `${status.color}40`,
                backgroundColor: `${status.color}15`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: status.color }}
              />
              {status.label}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-1 rounded text-xs font-display tracking-widest bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan">
                FEATURED
              </span>
            </div>
          )}

          {/* Hover overlay — play button */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-400"
            style={{
              background: `linear-gradient(135deg, ${project.color}20, rgba(0,0,0,0.3))`,
              opacity: hovered ? 1 : 0,
            }}
          >
            <div
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor:     project.color,
                backgroundColor: `${project.color}20`,
                transform:       hovered ? "scale(1)" : "scale(0.5)",
              }}
            >
              <Play
                size={20}
                style={{ color: project.color }}
                fill={project.color}
              />
            </div>
          </div>

          {/* Corner SVG accent */}
          <div
            className="absolute bottom-0 right-0 w-16 h-16 transition-all duration-400"
            style={{ opacity: hovered ? 0.6 : 0.2 }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M64 0 L64 64 L0 64"
                stroke={project.color}
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────────────── */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-sm font-bold text-white tracking-wide mb-2 leading-snug">
            {project.title}
          </h3>

          <p className="text-cyber-dim font-body text-xs leading-relaxed flex-1 mb-4">
            {hovered ? project.longDesc : project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-xs font-mono border transition-all duration-200"
                style={{
                  borderColor:     `${project.color}25`,
                  color:           `${project.color}bb`,
                  backgroundColor: `${project.color}08`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* ── Action buttons ─────────────────────────────────────── */}
          <div className="flex gap-2 mt-auto">

            {/* CODE — GitHub link */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded border border-cyber-border text-cyber-dim text-xs font-display tracking-widest hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all duration-300 group/btn"
              onClick={(e) => project.github === "#" && e.preventDefault()}
            >
              <Github
                size={13}
                className="group-hover/btn:rotate-12 transition-transform"
              />
              CODE
            </a>

            {/* DEMO — live link */}
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-xs font-display tracking-widest transition-all duration-300 group/btn"
              style={{
                backgroundColor: `${project.color}18`,
                border:          `1px solid ${project.color}40`,
                color:            project.color,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = `${project.color}30`;
                el.style.boxShadow       = `0 0 16px ${project.color}30`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = `${project.color}18`;
                el.style.boxShadow       = "none";
              }}
              onClick={(e) => project.demo === "#" && e.preventDefault()}
            >
              <ExternalLink
                size={13}
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
              />
              DEMO
            </a>

          </div>
        </div>
      </div>
    </article>
  );
}