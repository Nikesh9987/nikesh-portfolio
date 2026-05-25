"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard, { type Project } from "@/components/ui/ProjectCard";

// ─── Project Data ──────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 0,
    title: "Log Forensic Tool",
    description: "Enterprise-grade data labeling platform for LLM training datasets with quality pipelines.",
    longDesc:
      "A full-stack Windows log analysis and forensic investigation tool.
Upload log files, search and filter entries, detect suspicious activity,
and export results — all from a clean web interface.",
    category: "AI / ML",
    color: "#a78bfa",
    gradient: "linear-gradient(135deg, #1a0533 0%, #2d1065 50%, #0f0a2a 100%)",
    tech: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/Nikesh9987?tab=repositories",
    demo: "#",
    status: "demo",
    featured: true,
  },
  {
    id: 1,
    title: "Freelance ERP System",
    description: "Custom ERP built for SMBs — invoicing, inventory, HR modules, and reporting dashboards.",
    longDesc:
      "A modular ERP system tailored for small-to-medium businesses. Features invoicing with PDF export, real-time inventory tracking, employee management, role-based access control, and analytics dashboards.",
    category: "Full Stack",
    color: "#00e5ff",
    gradient: "linear-gradient(135deg, #001a2e 0%, #003655 50%, #001520 100%)",
    tech: ["Spring Boot", "React", "MySQL", "JWT", "Docker"],
    github: "https://github.com/Nikesh9987?tab=repositories",
    demo: "#",
    status: "live",
    featured: true,
  },
  {
    id: 2,
    title: "Research Paper Management System",
    description: "Academic platform for organizing, reviewing, and submitting research papers with citation tracking.",
    longDesc:
      "End-to-end research management system — paper submission workflows, peer review assignment, citation graph visualizer, plagiarism check integration, and export to IEEE/APA formats.",
    category: "Full Stack",
    color: "#f89820",
    gradient: "linear-gradient(135deg, #1a0e00 0%, #3d2200 50%, #1a0e00 100%)",
    tech: ["Java", "Spring Boot", "React", "MongoDB", "REST API"],
    github: "https://github.com/Nikesh9987?tab=repositories",
    demo: "#",
    status: "demo",
  },
  {
    id: 3,
    title: "Spring Boot API Platform",
    description: "Production-ready REST API gateway with auth, rate limiting, versioning, and Swagger docs.",
    longDesc:
      "A robust API platform template featuring JWT authentication, role-based authorization, request rate limiting, API versioning, comprehensive Swagger/OpenAPI documentation, and JUnit test coverage.",
    category: "Backend / API",
    color: "#4ade80",
    gradient: "linear-gradient(135deg, #001a0a 0%, #003318 50%, #001a0a 100%)",
    tech: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Swagger", "JUnit"],
    github: "https://github.com/Nikesh9987?tab=repositories",
    demo: "#",
    status: "live",
    featured: true,
  },
  {
    id: 4,
    title: "Full Stack Task Manager",
    description: "Kanban-style project management app with real-time updates, team collaboration, and analytics.",
    longDesc:
      "A collaborative task management platform with drag-and-drop Kanban boards, real-time WebSocket updates, team workspaces, time tracking, deadline notifications, and productivity analytics.",
    category: "Full Stack",
    color: "#64ffda",
    gradient: "linear-gradient(135deg, #001a15 0%, #003328 50%, #001a15 100%)",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "TypeScript"],
    github: "https://github.com/Nikesh9987?tab=repositories",
    demo: "#",
    status: "demo",
  },
  {
    id: 5,
    title: "Cyber Security Dashboard",
    description: "Real-time security monitoring dashboard with threat detection, alerts, and network analysis.",
    longDesc:
      "A security operations dashboard featuring real-time network traffic monitoring, anomaly detection alerts, vulnerability scan reports, IP reputation lookups, and incident management workflows.",
    category: "Security",
    color: "#f87171",
    gradient: "linear-gradient(135deg, #1a0000 0%, #3d0000 50%, #1a0000 100%)",
    tech: ["Python", "React", "ElasticSearch", "Kibana", "FastAPI"],
    github: "https://github.com/Nikesh9987?tab=repositories",
    demo: "#",
    status: "wip",
  },
];

const CATEGORIES = ["All", "Full Stack", "Backend / API", "AI / ML", "Security"];

// ─── Hook ──────────────────────────────────────────────────────────────────
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

// ─── Component ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchFeatured = !featuredOnly || p.featured;
      return matchCat && matchSearch && matchFeatured;
    });
  }, [activeCategory, search, featuredOnly]);

  const handleSearchToggle = () => {
    setShowSearch((v) => !v);
    if (!showSearch) setTimeout(() => searchRef.current?.focus(), 100);
    else setSearch("");
  };

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute right-1/4 top-1/4 w-80 h-80 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-1/4 bottom-1/4 w-80 h-80 rounded-full pointer-events-none opacity-8"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeader
            eyebrow="WHAT I BUILD"
            title="Featured"
            highlight="Projects"
            description="Production-grade software across AI, full stack development, APIs, and security. Each project solves a real problem."
          />
        </div>

        {/* Filter toolbar */}
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded text-xs font-display tracking-widest transition-all duration-300"
                style={
                  activeCategory === cat
                    ? {
                        backgroundColor: "rgba(0,229,255,0.15)",
                        border: "1px solid rgba(0,229,255,0.5)",
                        color: "#00e5ff",
                        boxShadow: "0 0 12px rgba(0,229,255,0.2)",
                      }
                    : {
                        backgroundColor: "transparent",
                        border: "1px solid rgba(14,32,64,1)",
                        color: "#4a5568",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Featured toggle */}
            <button
              onClick={() => setFeaturedOnly((v) => !v)}
              className="flex items-center gap-2 px-3 py-2 rounded border text-xs font-mono transition-all duration-300"
              style={
                featuredOnly
                  ? {
                      borderColor: "rgba(100,255,218,0.5)",
                      color: "#64ffda",
                      backgroundColor: "rgba(100,255,218,0.08)",
                    }
                  : {
                      borderColor: "rgba(14,32,64,1)",
                      color: "#4a5568",
                    }
              }
            >
              <SlidersHorizontal size={12} />
              Featured
            </button>

            {/* Search toggle */}
            <div className="relative flex items-center">
              <button
                onClick={handleSearchToggle}
                className="w-9 h-9 rounded border border-cyber-border flex items-center justify-center text-cyber-dim hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all duration-300"
              >
                {showSearch ? <X size={14} /> : <Search size={14} />}
              </button>
              <div
                className="overflow-hidden transition-all duration-400"
                style={{ width: showSearch ? "180px" : "0px", opacity: showSearch ? 1 : 0 }}
              >
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="ml-2 bg-transparent border border-cyber-border rounded px-3 py-2 text-xs font-mono text-cyber-text placeholder-cyber-muted focus:outline-none focus:border-cyber-cyan/50 w-full transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div
          className={`mb-6 transition-all duration-500 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-mono text-xs text-cyber-dim">
            Showing{" "}
            <span className="text-cyber-cyan">{filtered.length}</span>{" "}
            of {PROJECTS.length} projects
            {activeCategory !== "All" && (
              <> in <span className="text-cyber-text">{activeCategory}</span></>
            )}
            {search && (
              <> matching &quot;<span className="text-cyber-text">{search}</span>&quot;</>
            )}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl glass-card border border-cyber-border flex items-center justify-center">
              <Search size={24} className="text-cyber-dim" />
            </div>
            <p className="text-cyber-dim font-body text-sm">
              No projects match your filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearch("");
                setFeaturedOnly(false);
              }}
              className="text-cyber-cyan text-xs font-mono hover:underline underline-offset-2"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-cyber-dim text-sm font-body mb-5">
            Want to see the code or discuss a custom project?
          </p>
          <div className="flex flex-wrap justify-center gap-4">

            <a
              href="https://github.com/Nikesh9987?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber flex items-center gap-2 px-6 py-3 border border-cyber-border text-cyber-dim font-display text-xs tracking-widest hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all duration-300 rounded"
            >
              View GitHub Profile →
            </a>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-cyber flex items-center gap-2 px-6 py-3 bg-cyber-cyan text-cyber-black font-display text-xs font-bold tracking-widest hover:shadow-cyber-md transition-all duration-300 rounded"
            >
              Discuss a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}