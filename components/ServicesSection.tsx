"use client";
import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Globe,
  Brain,
  FileText,
  Server,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const SERVICES = [
  {
    icon: Code2,
    color: "#00e5ff",
    title: "Custom Software Development",
    short: "Tailored applications built to solve your specific business challenges.",
    description:
      "End-to-end custom software solutions — from requirements gathering to deployment. I design scalable architectures using Java, Spring Boot, Python, and modern frameworks to deliver robust, maintainable systems.",
    technologies: ["Java", "Spring Boot", "Python", "PostgreSQL", "Docker"],
    cta: "Start a Project",
  },
  {
    icon: Globe,
    color: "#64ffda",
    title: "Full Stack Web Development",
    short: "Modern, responsive web apps with polished UIs and powerful backends.",
    description:
      "Building complete web applications from database design to deployment. React & Next.js frontends paired with Java/Node.js backends, optimized for performance and scalability.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
    cta: "Build My App",
  },
  {
    icon: Brain,
    color: "#a78bfa",
    title: "AI & Data Annotation",
    short: "High-quality LLM training data, annotation, and AI model evaluation.",
    description:
      "Specialized annotation for AI/ML training datasets — text classification, NER, sentiment analysis, and LLM response evaluation. Proven at Innodata with enterprise-grade accuracy standards.",
    technologies: ["LLM", "NLP", "Python", "Label Studio", "Prompt Engineering"],
    cta: "Annotate My Data",
  },
  {
    icon: FileText,
    color: "#f89820",
    title: "Research & Technical Writing",
    short: "Clear, structured documentation and research papers for any domain.",
    description:
      "Academic research papers, technical documentation, API docs, system design documents, and business reports. Clean, well-referenced, and delivered on time.",
    technologies: ["LaTeX", "Markdown", "IEEE Format", "APA Style", "Notion"],
    cta: "Commission Writing",
  },
  {
    icon: Server,
    color: "#00b4d8",
    title: "REST API Development",
    short: "Secure, scalable, and well-documented API platforms.",
    description:
      "Designing and building RESTful APIs with Spring Boot and Node.js — authentication, rate limiting, versioning, Swagger documentation, and thorough testing with Postman/JUnit.",
    technologies: ["Spring Boot", "Node.js", "Swagger", "JWT", "Postman"],
    cta: "Build My API",
  },
  {
    icon: Zap,
    color: "#fb923c",
    title: "Automation Solutions",
    short: "Eliminate repetitive workflows with intelligent automation.",
    description:
      "Python-powered automation scripts, web scrapers, data pipelines, and scheduled tasks. EDI integrations, report generation, and workflow orchestration that save your team hours every week.",
    technologies: ["Python", "Selenium", "Celery", "Pandas", "Bash"],
    cta: "Automate This",
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

export default function ServicesSection() {
  const { ref, inView } = useInView();
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/3 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(100,255,218,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
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
            eyebrow="WHAT I DO"
            title="Services &"
            highlight="Expertise"
            description="Premium software solutions tailored for startups, enterprises, and researchers. Every engagement is backed by clean code and professional delivery."
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isFlipped = flipped === i;

            return (
              <div
                key={service.title}
                className={`relative transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Card
                    FIX 3: Removed invalid onMouseEnterCapture / onMouseLeaveCapture —
                    these are not valid React div props. Merged their inline-style logic
                    into the existing onMouseEnter / onMouseLeave handlers instead.
                    FIX 4: Replaced invalid duration-400 → duration-300 (valid Tailwind) */}
                <div
                  className="glass-card rounded-2xl border border-cyber-border h-full flex flex-col overflow-hidden group cursor-pointer transition-all duration-300"
                  style={{ minHeight: "320px" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    setFlipped(i);
                    e.currentTarget.style.borderColor = `${service.color}40`;
                    e.currentTarget.style.boxShadow = `0 0 30px ${service.color}10`;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    setFlipped(null);
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                  onFocus={() => setFlipped(i)}
                  onBlur={() => setFlipped(null)}
                  tabIndex={0}
                  role="article"
                  aria-label={service.title}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${service.color}12`,
                        border: `1px solid ${service.color}30`,
                        boxShadow: isFlipped ? `0 0 16px ${service.color}30` : "none",
                      }}
                    >
                      <Icon size={20} style={{ color: service.color }} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xs font-bold tracking-widest text-white mb-3 leading-snug">
                      {service.title}
                    </h3>

                    {/* Short vs full desc */}
                    <p className="text-cyber-dim font-body text-sm leading-relaxed flex-1 transition-all duration-300">
                      {isFlipped ? service.description : service.short}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-xs font-mono border"
                          style={{
                            borderColor: `${service.color}25`,
                            color: `${service.color}bb`,
                            backgroundColor: `${service.color}08`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* FIX 1: Added missing opening <a> tag for per-card CTA link */}
                    <a
                      href="#contact"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-5 flex items-center gap-2 text-xs font-display tracking-widest transition-all duration-300 group/cta w-fit"
                      style={{ color: service.color }}
                    >
                      {service.cta}
                      <ArrowUpRight
                        size={12}
                        className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div
          className={`mt-12 glass-card rounded-2xl p-6 border border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="font-display text-sm font-bold text-white tracking-wide">
              Have a project in mind?
            </p>
            <p className="text-cyber-dim text-xs font-body mt-1">
              Let&apos;s discuss your requirements and build something great together.
            </p>
          </div>

          {/* FIX 2: Added missing opening <a> tag + missing closing > after props
              for the bottom strip CTA — was also missing the > to close its props */}
          <a
            href="#contact"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-cyber flex items-center gap-2 px-6 py-3 bg-cyber-cyan text-cyber-black font-display text-xs font-bold tracking-widest hover:shadow-cyber-md transition-all duration-300 rounded flex-shrink-0 group"
          >
            GET IN TOUCH
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}