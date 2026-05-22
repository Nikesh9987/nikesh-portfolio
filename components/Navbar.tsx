"use client";
import { useState, useEffect } from "react";
import { Menu, X, Code2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    setActiveSection(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-card border-b border-cyber-border shadow-cyber-sm py-3"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 border border-cyber-cyan rounded flex items-center justify-center group-hover:shadow-cyber-sm transition-all duration-300">
            <Code2 size={16} className="text-cyber-cyan" />
          </div>
          <span className="font-display text-sm font-700 tracking-widest text-white">
            NIKESH<span className="text-gradient">.</span>DEV
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className={cn(
                  "font-body text-sm tracking-wide transition-all duration-300 relative group",
                  activeSection === link.href
                    ? "text-cyber-cyan"
                    : "text-cyber-dim hover:text-cyber-cyan"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-cyan group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="btn-cyber flex items-center gap-2 px-4 py-2 text-xs font-display tracking-widest border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-black transition-all duration-300 rounded"
          >
            <Download size={13} />
            RESUME
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyber-cyan p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "md:hidden glass-card border-t border-cyber-border overflow-hidden transition-all duration-400",
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-cyber-dim hover:text-cyber-cyan text-sm tracking-wide transition-colors w-full text-left py-1"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              download
              className="btn-cyber flex items-center gap-2 px-4 py-2 text-xs font-display tracking-widest border border-cyber-cyan text-cyber-cyan w-fit rounded mt-2"
            >
              <Download size={13} />
              DOWNLOAD RESUME
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}