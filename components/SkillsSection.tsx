"use client";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

// ─── Data ──────────────────────────────────────────────────────────────────
const SKILL_CATEGORIES = [
  {
    label: "Languages",
    color: "#00e5ff",
    skills: [
      { name: "Java",       level: 88, years: "3+ yrs" },
      { name: "Python",     level: 82, years: "3+ yrs" },
      { name: "TypeScript", level: 72, years: "2 yrs"  },
      { name: "SQL",        level: 80, years: "3+ yrs" },
      { name: "Bash",       level: 60, years: "2 yrs"  },
    ],
  },
  {
    label: "Frameworks & Tools",
    color: "#64ffda",
    skills: [
      { name: "Spring Boot", level: 85, years: "3 yrs"  },
      { name: "React",       level: 78, years: "2+ yrs" },
      { name: "Node.js",     level: 70, years: "2 yrs"  },
      { name: "Next.js",     level: 68, years: "1+ yr"  },
      { name: "Docker",      level: 65, years: "1+ yr"  },
    ],
  },
  {
    label: "Domains",
    color: "#a78bfa",
    skills: [
      { name: "Full Stack Dev",    level: 85, years: "3+ yrs" },
      { name: "REST API Design",   level: 88, years: "3 yrs"  },
      { name: "AI / LLM",         level: 80, years: "2 yrs"  },
      { name: "Data Annotation",   level: 92, years: "2 yrs"  },
      { name: "Cyber Security",    level: 60, years: "1 yr"   },
    ],
  },
];

const TECH_BADGES = [
  { name: "Java",         color: "#f89820" },
  { name: "Python",       color: "#ffd43b" },
  { name: "Spring Boot",  color: "#6db33f" },
  { name: "React",        color: "#61dafb" },
  { name: "Next.js",      color: "#ffffff" },
  { name: "Node.js",      color: "#68a063" },
  { name: "TypeScript",   color: "#3178c6" },
  { name: "PostgreSQL",   color: "#336791" },
  { name: "MySQL",        color: "#00758f" },
  { name: "MongoDB",      color: "#4db33d" },
  { name: "Docker",       color: "#2496ed" },
  { name: "Git",          color: "#f05033" },
  { name: "REST APIs",    color: "#00e5ff" },
  { name: "JWT",          color: "#d63aff" },
  { name: "Swagger",      color: "#85ea2d" },
  { name: "LLM / NLP",   color: "#a78bfa" },
  { name: "Selenium",     color: "#43b02a" },
  { name: "Linux",        color: "#fcc624" },
  { name: "Postman",      color: "#ff6c37" },
  { name: "Figma",        color: "#f24e1e" },
];

// ─── Reusable hook ─────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
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

// ─── Skill bar ─────────────────────────────────────────────────────────────
function SkillBar({
  name, level, years, color, animate,
}: {
  name: string; level: number; years: string; color: string; animate: boolean;
}) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-body text-sm text-cyber-text group-hover:text-white transition-colors">
          {name}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-cyber-muted">{years}</span>
          <span className="font-mono text-xs font-bold" style={{ color }}>
            {level}%
          </span>
        </div>
      </div>
      {/* Track */}
      <div className="h-1.5 rounded-full bg-cyber-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: animate ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}50`,
          }}
        >
          {/* Shimmer */}
          <span
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              animation: animate ? "shimmer 2s infinite" : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const { ref, inView } = useInView();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%);  }
        }
        @keyframes badgePop {
          from { opacity: 0; transform: scale(0.8) translateY(8px); }
          to   { opacity: 1; transform: scale(1)   translateY(0px); }
        }
      `}</style>

      {/* Right glow */}
      <div
        className="absolute right-0 top-1/3 w-80 h-80 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionHeader
            eyebrow="TECH STACK"
            title="Skills &"
            highlight="Technologies"
            description="A carefully built toolkit spanning backend systems, frontend interfaces, AI pipelines, and security fundamentals."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT — Skill bars */}
          <div className={`transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            {/* Category tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {SKILL_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveTab(i)}
                  className="px-4 py-2 rounded text-xs font-display tracking-widest transition-all duration-300"
                  style={
                    activeTab === i
                      ? {
                          backgroundColor: `${cat.color}15`,
                          border: `1px solid ${cat.color}50`,
                          color: cat.color,
                          boxShadow: `0 0 12px ${cat.color}20`,
                        }
                      : {
                          backgroundColor: "transparent",
                          border: "1px solid rgba(14,32,64,1)",
                          color: "#4a5568",
                        }
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Bars */}
            <div className="glass-card rounded-2xl p-6 border border-cyber-border space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: SKILL_CATEGORIES[activeTab].color }}
                />
                <span className="font-display text-xs tracking-widest text-cyber-dim">
                  {SKILL_CATEGORIES[activeTab].label.toUpperCase()}
                </span>
              </div>

              {SKILL_CATEGORIES[activeTab].skills.map((skill, i) => (
                <div
                  key={skill.name}
                  style={{
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.4s ease ${i * 80}ms`,
                  }}
                >
                  <SkillBar
                    {...skill}
                    color={SKILL_CATEGORIES[activeTab].color}
                    animate={inView}
                  />
                </div>
              ))}
            </div>

            {/* Proficiency legend */}
            <div className="flex flex-wrap gap-4 mt-4 px-1">
              {[
                { label: "Beginner",      range: "0–40%",   color: "#4a5568" },
                { label: "Intermediate",  range: "40–70%",  color: "#64ffda" },
                { label: "Proficient",    range: "70–85%",  color: "#00e5ff" },
                { label: "Expert",        range: "85–100%", color: "#a78bfa" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="font-mono text-xs text-cyber-muted">
                    {l.label} <span className="text-cyber-border">·</span> {l.range}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Badge cloud + radar */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {/* Badge cloud */}
            <div className="glass-card rounded-2xl p-6 border border-cyber-border">
              <p className="font-display text-xs tracking-widest text-cyber-dim mb-5">
                // TECHNOLOGIES WORKED WITH
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_BADGES.map((badge, i) => (
                  <span
                    key={badge.name}
                    className="px-3 py-1.5 rounded-full text-xs font-mono border cursor-default
                               hover:scale-105 transition-all duration-200"
                    style={{
                      borderColor: `${badge.color}30`,
                      color: `${badge.color}cc`,
                      backgroundColor: `${badge.color}08`,
                      animation: inView
                        ? `badgePop 0.4s ease ${i * 30}ms both`
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${badge.color}80`;
                      (e.currentTarget as HTMLElement).style.backgroundColor = `${badge.color}18`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${badge.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${badge.color}30`;
                      (e.currentTarget as HTMLElement).style.backgroundColor = `${badge.color}08`;
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
            </div>

            {/* SVG Radar chart */}
            <div className="glass-card rounded-2xl p-6 border border-cyber-border flex flex-col items-center">
              <p className="font-display text-xs tracking-widest text-cyber-dim mb-6 self-start">
                // COMPETENCY RADAR
              </p>
              <RadarChart animate={inView} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SVG Radar ─────────────────────────────────────────────────────────────
function RadarChart({ animate }: { animate: boolean }) {
  const axes = [
    { label: "Backend",    value: 0.88 },
    { label: "Frontend",   value: 0.75 },
    { label: "AI / LLM",  value: 0.80 },
    { label: "Security",   value: 0.60 },
    { label: "DevOps",     value: 0.65 },
    { label: "Research",   value: 0.85 },
  ];

  const cx = 140; const cy = 140; const r = 100;
  const n = axes.length;

  const toXY = (i: number, val: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: cx + r * val * Math.cos(angle),
      y: cy + r * val * Math.sin(angle),
    };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = axes.map((a, i) => toXY(i, animate ? a.value : 0));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const gridPaths = gridLevels.map((level) => {
    const pts = axes.map((_, i) => toXY(i, level));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  });

  return (
    <svg viewBox="0 0 280 280" className="w-full max-w-xs" aria-label="Competency radar chart">
      {/* Grid polygons */}
      {gridPaths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(0,229,255,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {axes.map((_, i) => {
        const end = toXY(i, 1);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={end.x} y2={end.y}
            stroke="rgba(0,229,255,0.1)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <path
        d={dataPath}
        fill="rgba(0,229,255,0.1)"
        stroke="#00e5ff"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ transition: "all 1s ease" }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x} cy={p.y} r="3"
          fill="#00e5ff"
          stroke="rgba(2,4,9,1)"
          strokeWidth="1.5"
          style={{ transition: `all 1s ease ${i * 80}ms` }}
        />
      ))}

      {/* Labels */}
      {axes.map((a, i) => {
        const labelPos = toXY(i, 1.22);
        return (
          <text
            key={i}
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(200,214,229,0.8)"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}