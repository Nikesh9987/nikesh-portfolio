"use client";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Code2,
  Brain,
  FileText,
  Zap,
  CheckCircle2,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const EDUCATION = [
  {
    degree: "MCA — Master of Computer Applications",
    school: "Amity University Noida",
    year: "2022–2024",
  },
  {
    degree: "BSc Computer Science",
    school: "Mumbai University",
    year: "2018–2021",
  },
];

const HIGHLIGHTS = [
  {
    icon: Code2,
    color: "#00e5ff",
    title: "Full Stack Development",
    desc: "Building end-to-end web applications with Java, Spring Boot, React, and Node.js — from database schema to pixel-perfect UI.",
  },
  {
    icon: Brain,
    color: "#64ffda",
    title: "AI & Data Annotation",
    desc: "Specialized in LLM training data annotation, prompt engineering, and AI model evaluation at Innodata Inc.",
  },
  {
    icon: FileText,
    color: "#00b4d8",
    title: "Technical Research Writing",
    desc: "Producing high-quality technical documentation, research papers, and structured reports for academic and corporate clients.",
  },
  {
    icon: Zap,
    color: "#f89820",
    title: "Automation & APIs",
    desc: "Designing scalable REST APIs and workflow automation systems that eliminate manual processes and accelerate business velocity.",
  },
];

const TRAITS = [
  "Clean, maintainable code",
  "Deadline-driven delivery",
  "Strong problem-solving",
  "Client-first communication",
  "Agile & collaborative",
  "Continuous learner",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Side accent line */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,229,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader
            eyebrow="WHO I AM"
            title="About"
            highlight="Nikesh"
            description="A versatile software engineer with a passion for building things that matter — from startup MVPs to enterprise platforms."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Story */}
          <div
            className={`space-y-6 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="glass-card rounded-2xl p-8 space-y-5 border border-cyber-border hover:border-cyber-cyan/20 transition-all duration-500">
              <p className="text-cyber-text font-body text-base leading-relaxed">
                I&apos;m a{" "}
                <span className="text-cyber-cyan font-medium">
                  Full Stack Software Engineer
                </span>{" "}
                with hands-on experience across AI/LLM platforms, healthcare
                systems, enterprise operations, and cybersecurity. I hold an
                MCA from Amity University Noida and a BSc in Computer Science
                from Mumbai University.
              </p>
              <p className="text-cyber-dim font-body text-base leading-relaxed">
                My career spans{" "}
                <span className="text-cyber-text font-medium">4 domains</span>{" "}
                — AI data annotation at Innodata, care coordination at Pristyn
                Care, enterprise EDI systems at Vensure, and cybersecurity
                fundamentals at Virtual Cyber Labs. This cross-domain exposure
                gives me a uniquely broad lens when architecting solutions.
              </p>
              <p className="text-cyber-dim font-body text-base leading-relaxed">
                As a{" "}
                <span className="text-cyber-text font-medium">
                  freelance developer
                </span>
                , I work with startups and businesses to deliver custom
                software, REST APIs, automation pipelines, and research writing
                — always on time, always production-grade.
              </p>
            </div>

            {/* Education */}
            <div className="glass-card rounded-2xl p-6 border border-cyber-border space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={16} className="text-cyber-cyan" />
                <span className="font-display text-xs tracking-widest text-cyber-cyan">
                  EDUCATION
                </span>
              </div>
              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree}
                  className="flex gap-4 group cursor-default"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-cyber-cyan/50 flex-shrink-0 group-hover:bg-cyber-cyan transition-colors" />
                  <div>
                    <p className="text-cyber-text text-sm font-medium">
                      {edu.degree}
                    </p>
                    <p className="text-cyber-dim text-xs font-mono mt-0.5">
                      {edu.school} · {edu.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Traits */}
            <div className="grid grid-cols-2 gap-2">
              {TRAITS.map((trait) => (
                <div
                  key={trait}
                  className="flex items-center gap-2 text-cyber-dim text-sm group"
                >
                  <CheckCircle2
                    size={13}
                    className="text-cyber-accent flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <span className="group-hover:text-cyber-text transition-colors font-body">
                    {trait}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Highlight cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {HIGHLIGHTS.map(({ icon: Icon, color, title, desc }, i) => (
              <div
                key={title}
                className="glass-card rounded-2xl p-6 border border-cyber-border group hover:border-opacity-60 transition-all duration-400 cursor-default"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  ["--hover-color" as string]: color,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${color}40`;
                  el.style.boxShadow = `0 0 24px ${color}15`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${color}12`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="font-display text-xs font-bold tracking-widest text-white mb-2">
                  {title}
                </h3>
                <p className="text-cyber-dim text-xs font-body leading-relaxed">{desc}</p>
              </div>
            ))}

            {/* Experience stat card */}
            <div
              className="glass-card rounded-2xl p-6 border border-cyber-border col-span-full flex items-center gap-6 group hover:border-cyber-cyan/20 transition-all duration-400"
            >
              <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Briefcase size={20} className="text-cyber-cyan" />
              </div>
              <div>
                <p className="font-display text-xs tracking-widest text-cyber-cyan mb-1">
                  PROFESSIONAL EXPERIENCE
                </p>
                <p className="text-cyber-text text-sm font-body leading-relaxed">
                  2+ years across{" "}
                  <span className="text-white font-medium">AI/LLM</span>,{" "}
                  <span className="text-white font-medium">Healthcare Tech</span>,{" "}
                  <span className="text-white font-medium">Enterprise Operations</span>, and{" "}
                  <span className="text-white font-medium">Cybersecurity</span> —
                  with real-world impact in each domain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}