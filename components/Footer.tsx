"use client";
import { useEffect, useState } from "react";
import {
  Github, Linkedin, Mail, MessageCircle,
  Code2, ArrowUp, Heart, ExternalLink,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "About",       href: "#about"       },
  { label: "Services",    href: "#services"    },
  { label: "Experience",  href: "#experience"  },
  { label: "Projects",    href: "#projects"    },
  { label: "Skills",      href: "#skills"      },
  { label: "Videos",      href: "#videos"      },
  { label: "Contact",     href: "#contact"     },
];

const SERVICES_LINKS = [
  { label: "Custom Software",  href: "#services" },
  { label: "Full Stack Dev",   href: "#services" },
  { label: "REST API Design",  href: "#services" },
  { label: "AI / Annotation",  href: "#services" },
  { label: "Research Writing", href: "#services" },
  { label: "Automation",       href: "#services" },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/nikeshmandal",
    label: "GitHub",
    color: "#ffffff",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/nikesh-mandal-6a208a216/",
    label: "LinkedIn",
    color: "#0077b5",
  },
  {
    icon: Mail,
    href: "mailto:nikeshmandal.07@gmail.com",
    label: "Email",
    color: "#00e5ff",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/917257918489",
    label: "WhatsApp",
    color: "#25d366",
  },
];

function scrollTo(href: string) {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative mt-8 overflow-hidden" role="contentinfo">
      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,229,255,0.3) 30%, rgba(100,255,218,0.3) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,229,255,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Main footer body */}
      <div className="relative z-10 bg-cyber-dark/50 backdrop-blur-sm border-t border-cyber-border/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Col 1 — Brand */}
            <div className="lg:col-span-1 space-y-5">
              {/* FIX 1: Added missing opening <a> tag for Logo */}
              <a
                href="#"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); scrollTo("#"); }}
                className="inline-flex items-center gap-2.5 group"
                aria-label="Back to top"
              >
                <div className="w-8 h-8 border border-cyber-cyan/40 rounded flex items-center justify-center group-hover:border-cyber-cyan group-hover:shadow-cyber-sm transition-all duration-300">
                  <Code2 size={15} className="text-cyber-cyan" />
                </div>
                <span className="font-display text-sm font-bold tracking-widest text-white">
                  NIKESH<span className="text-gradient">.</span>DEV
                </span>
              </a>

              <p className="text-cyber-dim text-sm font-body leading-relaxed">
                Full Stack Engineer · Freelance Developer · AI Specialist.
                Building production-grade software that solves real problems.
              </p>

              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-accent/30 bg-cyber-accent/5 text-xs font-mono text-cyber-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse-slow" />
                Open to freelance work
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2 pt-1">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
                  // FIX 2: Added missing opening <a> tag for social icons in .map()
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded border border-cyber-border flex items-center justify-center text-cyber-dim transition-all duration-300"
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      const el = e.currentTarget;
                      el.style.borderColor = `${color}50`;
                      el.style.color = color;
                      el.style.boxShadow = `0 0 10px ${color}25`;
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "";
                      el.style.color = "";
                      el.style.boxShadow = "";
                    }}
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div>
              <h3 className="font-display text-xs font-bold tracking-widest text-cyber-cyan mb-5">
                NAVIGATION
              </h3>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-cyber-dim text-sm font-body hover:text-cyber-text transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-3 h-px bg-cyber-border group-hover:w-5 group-hover:bg-cyber-cyan transition-all duration-300" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div>
              <h3 className="font-display text-xs font-bold tracking-widest text-cyber-cyan mb-5">
                SERVICES
              </h3>
              <ul className="space-y-2.5">
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-cyber-dim text-sm font-body hover:text-cyber-text transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-3 h-px bg-cyber-border group-hover:w-5 group-hover:bg-cyber-cyan transition-all duration-300" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact CTA */}
            <div>
              <h3 className="font-display text-xs font-bold tracking-widest text-cyber-cyan mb-5">
                HIRE ME
              </h3>

              <div className="space-y-4">
                <p className="text-cyber-dim text-sm font-body leading-relaxed">
                  Have a project in mind? Let&apos;s build something
                  great together.
                </p>

                {/* FIX 3: Added missing opening <a> tag for Email CTA */}
                <a
                  href="mailto:nikeshmandal.07@gmail.com"
                  className="btn-cyber flex items-center justify-center gap-2 w-full py-3 bg-cyber-cyan text-cyber-black font-display text-xs font-bold tracking-widest hover:shadow-cyber-md transition-all duration-300 rounded group"
                >
                  <Mail size={12} className="group-hover:rotate-12 transition-transform" />
                  SEND AN EMAIL
                </a>

                {/* FIX 4: Added missing opening <a> tag for WhatsApp CTA */}
                <a
                  href="https://wa.me/917257918489?text=Hi%20Nikesh%2C%20I%27d%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber flex items-center justify-center gap-2 w-full py-3 border border-cyber-border text-cyber-dim font-display text-xs tracking-widest hover:border-[#25d366]/40 hover:text-[#25d366] transition-all duration-300 rounded group"
                >
                  <MessageCircle size={12} />
                  WHATSAPP
                </a>

                {/* FIX 5: Added missing opening <a> tag for Resume download */}
                <a
                  href="/resume.pdf"
                  download
                  className="btn-cyber flex items-center justify-center gap-2 w-full py-3 border border-cyber-border text-cyber-dim font-display text-xs tracking-widest hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all duration-300 rounded group"
                >
                  <ExternalLink size={12} />
                  DOWNLOAD RESUME
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cyber-border/30">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-cyber-muted text-xs font-mono text-center sm:text-left">
              © {year} Nikesh Mandal. Built with{" "}
              <span className="text-cyber-cyan">Next.js</span> &{" "}
              <span className="text-cyber-accent">Tailwind CSS</span>.
              <span className="ml-2 inline-flex items-center gap-1">
                Made with <Heart size={10} className="text-red-400 inline" fill="currentColor" /> in Bihar (Mithila)
              </span>
            </p>

            <div className="flex items-center gap-4">
              <span className="text-cyber-muted text-xs font-mono hidden sm:block">
                v2.0.0
              </span>
              <div className="h-3 w-px bg-cyber-border hidden sm:block" />
              {/* FIX 6 (bonus): Added missing opening <a> tag for GitHub source link in bottom bar */}
              <a
                href="https://github.com/nikeshmandal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-muted text-xs font-mono hover:text-cyber-cyan transition-colors"
              >
                Source on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded border border-cyber-border glass-card flex items-center justify-center text-cyber-dim hover:text-cyber-cyan hover:border-cyber-cyan/50 hover:shadow-cyber-sm transition-all duration-300"
        style={{
          opacity:       showTop ? 1 : 0,
          transform:     showTop ? "translateY(0)" : "translateY(12px)",
          pointerEvents: showTop ? "auto" : "none",
          transition:    "opacity 0.3s ease, transform 0.3s ease, color 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={15} />
      </button>
    </footer>
  );
}