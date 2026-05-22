"use client";
import { useEffect, useRef, useState } from "react";
import { PenLine, Clock, ArrowUpRight, Rss } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const BLOG_PLACEHOLDERS = [
  {
    id: 0,
    title: "Building Production-Grade REST APIs with Spring Boot",
    excerpt: "A deep dive into designing scalable, secure, and well-documented REST APIs — from authentication to Swagger integration.",
    category: "Backend",
    color: "#00e5ff",
    readTime: "8 min",
    status: "coming_soon" as const,
  },
  {
    id: 1,
    title: "LLM Data Annotation: Best Practices from the Trenches",
    excerpt: "Hard-won lessons from annotating 10,000+ samples for LLM training — quality signals, edge cases, and workflow automation.",
    category: "AI / ML",
    color: "#a78bfa",
    readTime: "6 min",
    status: "coming_soon" as const,
  },
  {
    id: 2,
    title: "From Monolith to Microservices: A Practical Migration Guide",
    excerpt: "Step-by-step breakdown of decomposing a Java monolith into Docker-based microservices without breaking production.",
    category: "Architecture",
    color: "#64ffda",
    readTime: "12 min",
    status: "coming_soon" as const,
  },
  {
    id: 3,
    title: "Python Automation Scripts Every Developer Should Know",
    excerpt: "Five powerful automation patterns using Python — file processing, web scraping, report generation, and scheduled pipelines.",
    category: "Automation",
    color: "#f89820",
    readTime: "7 min",
    status: "coming_soon" as const,
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

export default function BlogSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="blog"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-8"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.2) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionHeader
            eyebrow="COMING SOON"
            title="Technical"
            highlight="Blog"
            description="In-depth articles on software engineering, AI, system design, and freelancing — written from real experience."
          />
        </div>

        {/* Coming soon banner */}
        <div
          className={`glass-card rounded-2xl border border-cyber-border p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center flex-shrink-0">
              <PenLine size={18} className="text-cyber-cyan" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white tracking-wide">
                Blog launching soon
              </p>
              <p className="text-cyber-dim text-xs font-body mt-0.5">
                Technical articles, tutorials, and engineering insights — subscribe to be notified.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cyber-accent/30 text-cyber-accent text-xs font-mono bg-cyber-accent/5">
              <Rss size={11} />
              RSS Feed Coming
            </span>
          </div>
        </div>

        {/* Blog card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BLOG_PLACEHOLDERS.map((post, i) => (
            <div
              key={post.id}
              className="glass-card rounded-2xl border border-cyber-border overflow-hidden group cursor-default transition-all duration-400 hover:border-cyber-cyan/20"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, border-color 0.3s`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${post.color}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${post.color}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* Color top bar */}
              <div
                className="h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${post.color}, transparent)` }}
              />

              <div className="p-5 flex flex-col h-full">
                {/* Category + read time */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-mono border"
                    style={{
                      color: post.color,
                      borderColor: `${post.color}30`,
                      backgroundColor: `${post.color}08`,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-cyber-muted text-xs font-mono">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xs font-bold text-white tracking-wide leading-snug mb-3 flex-1">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-cyber-dim text-xs font-body leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-cyber-border/50">
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono border"
                    style={{
                      color: "rgba(100,255,218,0.7)",
                      borderColor: "rgba(100,255,218,0.2)",
                      backgroundColor: "rgba(100,255,218,0.06)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse" />
                    Coming Soon
                  </span>
                  <ArrowUpRight size={13} className="text-cyber-border group-hover:text-cyber-cyan transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notify CTA */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-cyber-dim text-sm font-body">
            Want to know when articles drop?
          </p>
          <a
            href="https://www.linkedin.com/in/nikesh-mandal-6a208a216/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber flex items-center gap-2 px-5 py-2.5 border border-cyber-cyan/40 text-cyber-cyan text-xs font-display tracking-widest bg-cyber-cyan/5 hover:bg-cyber-cyan/15 transition-all duration-300 rounded"
          >
            Follow on LinkedIn →
          </a>
        </div>
      </div>
    </section>
  );
}