"use client";
import { useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  FolderOpen,
  Download,
  Cpu,
  Database,
  Globe,
  Shield,
  Braces,
  Server,
} from "lucide-react";
import TypingEffect from "@/components/ui/TypingEffect";

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/Nikesh9987",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/nikesh-mandal-6a208a216/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:nikeshmandal.07@gmail.com",
    label: "Email",
  },
];

const TYPING_ROLES = [
  "Full Stack Developer",
  "Java & Spring Boot Engineer",
  "Python Developer",
  "REST API Architect",
  "AI/LLM Specialist",
  "Freelance Software Engineer",
  "Automation Engineer",
];

const TECH_ICONS = [
  { icon: Braces,   label: "Java",        color: "#f89820", delay: "0s"   },
  { icon: Server,   label: "Spring Boot", color: "#6db33f", delay: "0.5s" },
  { icon: Globe,    label: "React",       color: "#61dafb", delay: "1s"   },
  { icon: Cpu,      label: "Python",      color: "#ffd43b", delay: "1.5s" },
  { icon: Database, label: "SQL",         color: "#00e5ff", delay: "2s"   },
  { icon: Shield,   label: "Security",    color: "#ff6b6b", delay: "2.5s" },
];

const STAT_ITEMS = [
  { value: "2+", label: "Years Experience"  },
  { value: "10+", label: "Projects Delivered" },
  { value: "4",  label: "Domains Worked"    },
  { value: "∞",  label: "Problems Solved"   },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.innerWidth < 1024) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      const blob = el.querySelector<HTMLElement>(".hero-blob");
      if (blob) {
        blob.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Animated blob background */}
      <div
        className="hero-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,180,216,0.4) 0%, rgba(0,229,255,0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="animate-scan-line absolute left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Main Content */}
          <div className="space-y-8">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-cyber-cyan/30 rounded-full bg-cyber-cyan/5 text-cyber-cyan text-xs font-mono tracking-widest animate-fade-in"
              style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse-slow" />
              AVAILABLE FOR FREELANCE
            </div>

            {/* Name */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              <p className="font-mono text-cyber-dim text-sm tracking-[0.3em] mb-3 uppercase">
                Hello, I&apos;m
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                NIKESH
                <br />
                <span className="text-gradient">MANDAL</span>
              </h1>
            </div>

            {/* Typing Role */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="h-10 flex items-center">
                <span className="text-cyber-dim font-mono text-sm mr-2">&gt;_</span>
                <TypingEffect
                  words={TYPING_ROLES}
                  className="text-cyber-cyan font-mono text-base sm:text-lg font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <p
              className="text-cyber-dim font-body text-base leading-relaxed max-w-xl animate-fade-up"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              I build{" "}
              <span className="text-cyber-text">scalable software solutions</span>,
              design robust{" "}
              <span className="text-cyber-text">REST APIs</span>, and deliver
              end-to-end{" "}
              <span className="text-cyber-text">full stack applications</span>.
              From AI-powered tools to enterprise systems — I turn complex
              problems into elegant, production-ready software.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}
            >
              {/* FIX 1: Added missing opening <a> tag + missing closing </a> for HIRE ME */}
              <a
                href="mailto:nikeshmandal.07@gmail.com"
                className="btn-cyber flex items-center gap-2 px-6 py-3 bg-cyber-cyan text-cyber-black font-display text-xs font-bold tracking-widest hover:shadow-cyber-md transition-all duration-300 rounded group"
              >
                HIRE ME
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <button
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-cyber flex items-center gap-2 px-6 py-3 border border-cyber-cyan/50 text-cyber-cyan font-display text-xs font-bold tracking-widest hover:border-cyber-cyan hover:shadow-cyber-sm transition-all duration-300 rounded"
              >
                <FolderOpen size={14} />
                VIEW PROJECTS
              </button>

              {/* FIX 2: Added missing opening <a> tag + missing closing </a> for RESUME */}
              <a
                href="/resume.pdf"
                download
                className="btn-cyber flex items-center gap-2 px-6 py-3 border border-cyber-border text-cyber-dim font-display text-xs font-bold tracking-widest hover:border-cyber-cyan/30 hover:text-cyber-text transition-all duration-300 rounded"
              >
                <Download size={14} />
                RESUME
              </a>
            </div>

            {/* Social Links */}
            <div
              className="flex items-center gap-4 animate-fade-up"
              style={{ animationDelay: "1s", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="text-cyber-muted text-xs font-mono tracking-widest">CONNECT</span>
              <div className="w-12 h-px bg-cyber-border" />
              {/* FIX 3: Added missing opening <a> tag + missing closing </a> + </div>
                  in SOCIAL_LINKS.map() — entire block was broken/unclosed */}
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-cyber-border rounded flex items-center justify-center text-cyber-dim hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-cyber-sm transition-all duration-300 group"
                >
                  <Icon size={15} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Visual Panel */}
          <div
            className="hidden lg:flex flex-col gap-6 animate-fade-in"
            style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
          >
            {/* Tech Orbit */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 left-4 flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <p className="font-mono text-cyber-dim text-xs text-center mb-6 mt-2 tracking-widest">
                // tech_stack.config
              </p>

              <div className="grid grid-cols-3 gap-4">
                {TECH_ICONS.map(({ icon: Icon, label, color, delay }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 group cursor-default animate-float"
                    style={{ animationDelay: delay }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl border border-cyber-border flex items-center justify-center group-hover:border-opacity-100 transition-all duration-300"
                      style={{
                        borderColor: `${color}30`,
                        backgroundColor: `${color}08`,
                        boxShadow: `0 0 0 0 ${color}`,
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.boxShadow = `0 0 12px ${color}40`;
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.boxShadow = `0 0 0 0 ${color}`;
                      }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <span className="text-cyber-dim text-xs font-mono tracking-wide group-hover:text-cyber-text transition-colors">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STAT_ITEMS.map(({ value, label }) => (
                <div
                  key={label}
                  className="glass-card rounded-xl p-5 text-center border border-cyber-border hover:border-cyber-cyan/30 transition-all duration-300 group"
                >
                  <div className="font-display text-2xl font-black text-gradient mb-1 group-hover:scale-110 transition-transform">
                    {value}
                  </div>
                  <div className="font-body text-xs text-cyber-dim tracking-wide">{label}</div>
                </div>
              ))}
            </div>

            {/* Status badge */}
            <div className="glass-card rounded-xl p-4 flex items-center gap-3 border border-cyber-accent/20">
              <div className="w-8 h-8 rounded-full bg-cyber-accent/10 border border-cyber-accent/30 flex items-center justify-center flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
              </div>
              <div>
                <p className="text-cyber-text text-xs font-medium">Open to opportunities</p>
                <p className="text-cyber-dim text-xs font-mono">
                  Freelance · Contract · Full-time
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="font-mono text-cyber-dim text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyber-cyan to-transparent" />
      </div>
    </section>
  );
}