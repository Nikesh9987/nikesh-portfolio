"use client";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Cpu,
  HeartPulse,
  Network,
  ShieldCheck,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const EXPERIENCES = [
  {
    id: 0,
    icon: Cpu,
    color: "#a78bfa",
    role: "Analyst — AI / LLM",
    company: "Innodata Inc.",
    type: "Full-time",
    duration: "2025 – Present",
    location: "Remote",
    summary: "AI training data annotation and LLM model quality assurance.",
    achievements: [
      "Annotated 10,000+ text samples for LLM training pipelines with 98%+ accuracy",
      "Evaluated model outputs for factuality, coherence, and safety across diverse domains",
      "Collaborated with ML engineers to refine annotation guidelines and edge-case handling",
      "Specialized in prompt engineering tasks for instruction-tuned language models",
      "Reduced annotation error rate by 15% through process documentation improvements",
    ],
    skills: ["LLM", "NLP", "Data Annotation", "Prompt Engineering", "Python", "QA"],
  },
  {
    id: 1,
    icon: HeartPulse,
    color: "#f87171",
    role: "Care Coordinator",
    company: "Pristyn Care",
    type: "Full-time",
    duration: "2024 – 2025",
    location: "Haryana, India",
    summary: "Patient coordination and healthcare operations at a leading surgical care startup.",
    achievements: [
      "Coordinated surgical consultations and end-to-end patient journeys across 5+ specialties",
      "Managed data entry, CRM updates, and patient record systems with high accuracy",
      "Developed internal Excel-based automation tools to reduce manual scheduling effort by 30%",
      "Interfaced with hospital partners and insurance providers to streamline approvals",
      "Maintained patient satisfaction scores above team benchmarks",
    ],
    skills: ["CRM Systems", "Data Management", "Healthcare Ops", "Excel Automation", "Communication"],
  },
  {
    id: 2,
    icon: Network,
    color: "#00e5ff",
    role: "System Operations & EDI Analyst",
    company: "Vensure Employer Solutions",
    type: "Full-time",
    duration: "2021 – 2022",
    location: "Noida, India",
    summary: "Enterprise EDI systems management and HR data operations for US-based employer clients.",
    achievements: [
      "Processed and validated EDI 834/820 transactions for benefits enrollment and payroll",
      "Performed system audits and data reconciliation across client HR platforms",
      "Built SQL queries and reports to surface discrepancies in employee benefit data",
      "Coordinated with cross-functional US and India teams to resolve data integrity issues",
      "Documented SOPs for EDI workflows, reducing onboarding time for new analysts",
    ],
    skills: ["EDI", "SQL", "Data Operations", "HR Systems", "Process Documentation"],
  },
  {
    id: 3,
    icon: ShieldCheck,
    color: "#4ade80",
    role: "Cyber Security Analyst Intern",
    company: "Virtual Cyber Labs",
    type: "Internship",
    duration: "2020 – 2021",
    location: "Remote",
    summary: "Hands-on cybersecurity training covering threat analysis, vulnerability assessment, and security tooling.",
    achievements: [
      "Conducted vulnerability scans and penetration testing on controlled lab environments",
      "Analyzed and documented network traffic anomalies using Wireshark and Nmap",
      "Studied OWASP Top 10 vulnerabilities and applied them in CTF-style exercises",
      "Completed security incident response simulations and wrote post-incident reports",
      "Gained foundational knowledge in SIEM tools, firewalls, and IDS/IPS systems",
    ],
    skills: ["Network Security", "Wireshark", "Nmap", "OWASP", "Linux", "Penetration Testing"],
  },
];

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

export default function ExperienceSection() {
  const { ref, inView } = useInView();
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggle = (id: number) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Left glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader
            eyebrow="MY JOURNEY"
            title="Work"
            highlight="Experience"
            description="Four distinct industries. One common thread — using technology to create real-world impact."
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(0,229,255,0.3) 10%, rgba(0,229,255,0.3) 90%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-4">
            {EXPERIENCES.map((exp, i) => {
              const Icon = exp.icon;
              const isOpen = expanded === exp.id;

              return (
                <div
                  key={exp.id}
                  className={`relative transition-all duration-500 ${
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 top-8 w-4 h-4 rounded-full border-2 border-cyber-black hidden sm:flex items-center justify-center z-10 transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? exp.color : "rgba(0,229,255,0.2)",
                      borderColor: exp.color,
                      boxShadow: isOpen ? `0 0 12px ${exp.color}60` : "none",
                    }}
                    aria-hidden="true"
                  />

                  {/* Card */}
                  <div
                    className="sm:ml-16 glass-card rounded-2xl border overflow-hidden transition-all duration-300"
                    style={{
                      borderColor: isOpen ? `${exp.color}40` : "rgba(14,32,64,1)",
                      boxShadow: isOpen ? `0 0 30px ${exp.color}10` : "none",
                    }}
                  >
                    {/* Header — always visible */}
                    <button
                      className="w-full p-6 flex items-start gap-4 text-left group focus:outline-none"
                      onClick={() => toggle(exp.id)}
                      aria-expanded={isOpen}
                    >
                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${exp.color}15`,
                          border: `1px solid ${exp.color}35`,
                        }}
                      >
                        <Icon size={18} style={{ color: exp.color }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Role + company */}
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="font-display text-sm font-bold text-white tracking-wide">
                            {exp.role}
                          </h3>
                          <span
                            className="text-xs font-mono px-2 py-0.5 rounded-full border"
                            style={{
                              color: exp.color,
                              borderColor: `${exp.color}30`,
                              backgroundColor: `${exp.color}10`,
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1.5 text-cyber-dim text-xs font-body">
                            <Building2 size={11} />
                            {exp.company}
                          </span>
                          <span className="text-cyber-border">·</span>
                          <span className="flex items-center gap-1.5 text-cyber-dim text-xs font-mono">
                            <Calendar size={11} />
                            {exp.duration}
                          </span>
                          <span className="text-cyber-border">·</span>
                          <span className="text-cyber-dim text-xs font-body">{exp.location}</span>
                        </div>
                        <p className="text-cyber-dim text-xs font-body mt-2 leading-relaxed">
                          {exp.summary}
                        </p>
                      </div>

                      {/* Toggle icon */}
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-full border border-cyber-border flex items-center justify-center transition-all duration-300"
                        style={{
                          borderColor: isOpen ? `${exp.color}40` : "",
                          color: isOpen ? exp.color : "#4a5568",
                        }}
                      >
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>

                    {/* Expanded body */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: isOpen ? "500px" : "0px" }}
                    >
                      <div className="px-6 pb-6">
                        <div
                          className="h-px mb-5"
                          style={{
                            background: `linear-gradient(90deg, ${exp.color}30, transparent)`,
                          }}
                        />

                        {/* Achievements */}
                        <p className="font-display text-xs tracking-widest text-cyber-dim mb-3">
                          KEY ACHIEVEMENTS
                        </p>
                        <ul className="space-y-2.5 mb-5">
                          {exp.achievements.map((ach) => (
                            <li
                              key={ach}
                              className="flex items-start gap-3 text-cyber-dim text-sm font-body group/item"
                            >
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover/item:scale-150 transition-transform"
                                style={{ backgroundColor: exp.color }}
                              />
                              <span className="group-hover/item:text-cyber-text transition-colors leading-relaxed">
                                {ach}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Skills */}
                        <p className="font-display text-xs tracking-widest text-cyber-dim mb-3">
                          SKILLS USED
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded text-xs font-mono border transition-all duration-200 hover:scale-105"
                              style={{
                                borderColor: `${exp.color}30`,
                                color: `${exp.color}cc`,
                                backgroundColor: `${exp.color}08`,
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline foot */}
        <div
          className={`sm:ml-16 mt-6 flex items-center gap-3 transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-4 h-4 rounded-full border-2 border-cyber-accent bg-cyber-accent/20 hidden sm:block" />
          <p className="text-cyber-dim text-xs font-mono">
            And the story continues...{" "}
            {/* FIX: Added missing opening <a> tag — was causing all 12 cascade errors */}
            <a
              href="#contact"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-cyber-cyan hover:underline underline-offset-2"
            >
              Let&apos;s write the next chapter together →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}