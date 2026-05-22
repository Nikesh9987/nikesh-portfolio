"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const TESTIMONIALS = [
  {
    id: 0,
    name: "Rohan Mehta",
    role: "Founder, TechStart Mumbai",
    avatar: "RM",
    color: "#00e5ff",
    rating: 5,
    text: "Nikesh delivered our entire SaaS platform in record time. His Spring Boot APIs were clean, well-documented, and ready for production. He anticipated requirements we hadn't even thought of yet. Absolutely the kind of engineer you want on your team.",
    project: "SaaS Platform",
    relation: "Freelance Client",
  },
  {
    id: 1,
    name: "Priya Shashank",
    role: "ML Lead, Innodata Inc.",
    avatar: "PS",
    color: "#64ffda",
    rating: 5,
    text: "Working with Nikesh on our LLM annotation pipeline was exceptional. His data annotation accuracy consistently exceeded team benchmarks, and he brought thoughtful process improvements that reduced our error rate by over 15%. Reliable, precise, and proactive.",
    project: "LLM Training Pipeline",
    relation: "Team Lead",
  },
  {
    id: 2,
    name: "Amit Verma",
    role: "CTO, Nexbridge Solutions",
    avatar: "AV",
    color: "#a78bfa",
    rating: 5,
    text: "We hired Nikesh to build a custom ERP system for our operations team. He understood our business requirements deeply, built a scalable architecture, and delivered clean, maintainable code. Post-launch support was excellent too. Will definitely hire again.",
    project: "Custom ERP System",
    relation: "Freelance Client",
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Research Director, AcademiaPro",
    avatar: "ST",
    color: "#f89820",
    rating: 5,
    text: "Nikesh's technical writing and research skills are outstanding. He prepared a comprehensive system design document and research paper for our platform that impressed our entire editorial board. Clear, structured, and technically rigorous.",
    project: "Research Documentation",
    relation: "Freelance Client",
  },
  {
    id: 4,
    name: "Deepak Nair",
    role: "Senior Engineer, Vensure",
    avatar: "DN",
    color: "#4ade80",
    rating: 5,
    text: "Nikesh's EDI work at Vensure was top-notch. He picked up the complex EDI 834/820 transaction formats quickly, wrote solid SQL queries, and his SOP documentation made onboarding the next analyst significantly easier. A real team player.",
    project: "EDI Operations",
    relation: "Colleague",
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

export default function TestimonialsSection() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive(next);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const prev = () => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, "left");
  const next = useCallback(() => go((active + 1) % TESTIMONIALS.length, "right"), [active, go]);

  // Auto-advance
  useEffect(() => {
    if (!inView) return;
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView, next]);

  const t = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionHeader
            eyebrow="SOCIAL PROOF"
            title="Client"
            highlight="Testimonials"
            description="What clients, colleagues, and collaborators say about working with me."
          />
        </div>

        {/* Main card */}
        <div
          className={`transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="glass-card rounded-2xl border p-8 sm:p-10 relative overflow-hidden transition-all duration-500"
            style={{ borderColor: `${t.color}30` }}
          >
            {/* Accent corner */}
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right, ${t.color}10 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            {/* Quote icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${t.color}15`, border: `1px solid ${t.color}30` }}
            >
              <Quote size={18} style={{ color: t.color }} />
            </div>

            {/* Quote text */}
            <blockquote
              className="font-body text-lg text-cyber-text leading-relaxed mb-8 relative"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating
                  ? direction === "right" ? "translateX(-20px)" : "translateX(20px)"
                  : "translateX(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              &ldquo;{t.text}&rdquo;
            </blockquote>

            {/* Author row */}
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
              style={{
                opacity: animating ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display text-sm font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}30, ${t.color}10)`,
                    border: `2px solid ${t.color}40`,
                    color: t.color,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white tracking-wide">
                    {t.name}
                  </p>
                  <p className="text-cyber-dim text-xs font-body mt-0.5">
                    {t.role}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded border"
                      style={{
                        color: t.color,
                        borderColor: `${t.color}30`,
                        backgroundColor: `${t.color}08`,
                      }}
                    >
                      {t.relation}
                    </span>
                    <span className="text-cyber-muted text-xs font-mono">· {t.project}</span>
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 16 16"
                    className="w-4 h-4"
                    style={{ fill: t.color }}
                    aria-hidden="true"
                  >
                    <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.3l-3.7 2 .7-4.1-3-2.9 4.2-.6z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 h-0.5 transition-all duration-700"
              style={{
                width: inView ? "100%" : "0%",
                background: `linear-gradient(90deg, ${t.color}60, transparent)`,
              }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > active ? "right" : "left")}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: active === i ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: active === i ? TESTIMONIALS[i].color : "rgba(14,32,64,1)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded border border-cyber-border flex items-center justify-center text-cyber-dim hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded border border-cyber-border flex items-center justify-center text-cyber-dim hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Mini cards */}
        <div
          className={`grid sm:grid-cols-3 gap-4 mt-8 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {TESTIMONIALS.filter((_, i) => i !== active).slice(0, 3).map((tm) => (
            <button
              key={tm.id}
              onClick={() => go(tm.id, tm.id > active ? "right" : "left")}
              className="glass-card rounded-xl p-4 border border-cyber-border text-left hover:border-cyber-cyan/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${tm.color}30, ${tm.color}10)`,
                    border: `1px solid ${tm.color}40`,
                    color: tm.color,
                  }}
                >
                  {tm.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs font-bold text-white truncate">{tm.name}</p>
                  <p className="text-cyber-muted text-xs font-mono truncate">{tm.relation}</p>
                </div>
              </div>
              <p className="text-cyber-dim text-xs font-body line-clamp-2 leading-relaxed">
                &ldquo;{tm.text}&rdquo;
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}