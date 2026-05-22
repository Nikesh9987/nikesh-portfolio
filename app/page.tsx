import Navbar              from "@/components/Navbar";
import HeroSection         from "@/components/HeroSection";
import AboutSection        from "@/components/AboutSection";
import ServicesSection     from "@/components/ServicesSection";
import ExperienceSection   from "@/components/ExperienceSection";
import ProjectsSection     from "@/components/ProjectsSection";
import VideoShowcase       from "@/components/VideoShowcase";
import SkillsSection       from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection         from "@/components/BlogSection";
import ContactSection      from "@/components/ContactSection";
import Footer              from "@/components/Footer";
import ParticleBackground  from "@/components/ui/ParticleBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-cyber-black overflow-x-hidden">

      {/* Layer 0 — Particles (canvas, fixed) */}
      <ParticleBackground />

      {/* Layer 1 — Grid pattern */}
      <div
        className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none"
        style={{ zIndex: 1, opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* Layer 2 — Radial hero gradient */}
      <div
        className="fixed inset-0 bg-hero-gradient pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Layer 3 — Content */}
      <div className="relative" style={{ zIndex: 3 }}>

        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9998] focus:px-4 focus:py-2 focus:bg-cyber-cyan focus:text-cyber-black focus:font-display focus:text-xs focus:tracking-widest focus:rounded"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ExperienceSection />
          <ProjectsSection />
          <VideoShowcase />
          <SkillsSection />
          <TestimonialsSection />
          <BlogSection />
          <ContactSection />
        </main>

        <Footer />

      </div>
    </div>
  );
}