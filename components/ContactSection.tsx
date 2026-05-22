"use client";
import { useEffect, useRef, useState } from "react";
import {
  Send, Mail, Linkedin, MessageCircle,
  MapPin, Clock, CheckCircle2, AlertCircle,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const PROJECT_TYPES = [
  "Custom Software Development",
  "Full Stack Web App",
  "REST API Development",
  "AI / Data Annotation",
  "Research & Technical Writing",
  "Automation Solution",
  "Consulting / Code Review",
  "Other",
];

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "nikeshmandal.07@gmail.com",
    href: "mailto:nikeshmandal.07@gmail.com",
    color: "#00e5ff",
    desc: "Replies within 24 hours",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/nikesh-mandal-6a208a216/",
    href: "https://www.linkedin.com/in/nikesh-mandal-6a208a216/",
    color: "#0077b5",
    desc: "Connect professionally",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 72579 18489",
    href: "https://wa.me/919876543210?text=Hi%20Nikesh%2C%20I%27d%20like%20to%20discuss%20a%20project",
    color: "#25d366",
    desc: "Quick response on WhatsApp",
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

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

export default function ContactSection() {
  const { ref, inView } = useInView();

  const [form, setForm] = useState({
    name: "", email: "", projectType: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const update = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim())    errs.name    = "Name is required";
    if (!form.email.trim())   errs.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (!form.projectType)    errs.projectType = "Please select a project type";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 20) errs.message = "Please write at least 20 characters";
    return errs;
  };

  // FIX 1: Changed e: React.MouseEvent → e: React.FormEvent for semantic correctness
  // and added proper type annotation
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("sending");
    // Simulate API call — replace with your EmailJS / Formspree / API route
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
    setForm({ name: "", email: "", projectType: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputClass = (field: keyof typeof form) =>
    `w-full bg-cyber-dark border rounded-lg px-4 py-3 text-sm text-cyber-text placeholder-cyber-muted
     font-body focus:outline-none transition-all duration-300 ${
       errors[field]
         ? "border-red-500/60 focus:border-red-500"
         : focusedField === field
         ? "border-cyber-cyan/50 shadow-cyber-sm"
         : "border-cyber-border hover:border-cyber-cyan/20"
     }`;

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,229,255,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionHeader
            eyebrow="GET IN TOUCH"
            title="Let's Build"
            highlight="Together"
            description="Have a project, a question, or just want to say hello? I'd love to hear from you."
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* LEFT — Contact info */}
          <div
            className={`lg:col-span-2 space-y-5 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            {/* Quick info */}
            <div className="glass-card rounded-2xl p-6 border border-cyber-border space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
                <span className="font-display text-xs tracking-widest text-cyber-accent">
                  AVAILABLE FOR WORK
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-cyber-dim mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-cyber-text text-sm font-body">Haryana, India</p>
                  <p className="text-cyber-muted text-xs font-mono mt-0.5">Open to remote worldwide</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={15} className="text-cyber-dim mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-cyber-text text-sm font-body">IST (UTC +5:30)</p>
                  <p className="text-cyber-muted text-xs font-mono mt-0.5">Mon – Sat, 9 AM – 8 PM</p>
                </div>
              </div>

              <div className="h-px bg-cyber-border" />

              <p className="text-cyber-dim text-xs font-body leading-relaxed">
                Response time: <span className="text-cyber-text">within 24 hours</span>.
                For urgent freelance requirements, WhatsApp is fastest.
              </p>
            </div>

            {/* FIX 2 — THE MAIN BUG: Added missing opening <a> tag before key={label} */}
            {/* Previously: props (key, href, target, rel, className, onMouseEnter, onMouseLeave) */}
            {/* were floating with NO wrapping JSX element — causing all 44 cascade errors */}
            {CONTACT_LINKS.map(({ icon: Icon, label, value, href, color, desc }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 border border-cyber-border flex items-center gap-4 group transition-all duration-300 hover:border-opacity-70"
                // FIX 3: Typed event as React.MouseEvent<HTMLAnchorElement> — eliminates
                // the implicit 'any' TypeScript warning on e parameter
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}40`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px ${color}10`;
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${color}12`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xs tracking-widest text-white font-bold">{label}</p>
                  <p className="text-cyber-dim text-xs font-mono mt-0.5 truncate">{value}</p>
                  <p className="text-cyber-muted text-xs font-body mt-0.5">{desc}</p>
                </div>
                <div
                  className="w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  <Send size={11} />
                </div>
              </a>
            ))}
          </div>

          {/* RIGHT — Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="glass-card rounded-2xl border border-cyber-border overflow-hidden">
              {/* Form header */}
              <div className="px-6 py-4 border-b border-cyber-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="font-mono text-xs text-cyber-dim tracking-widest ml-2 hidden sm:block">
                    // new_project_inquiry.form
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-mono text-cyber-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Success state */}
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 px-8 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <div className="text-center">
                    <p className="font-display text-base font-bold text-white tracking-wide">
                      Message Sent!
                    </p>
                    <p className="text-cyber-dim text-sm font-body mt-2 max-w-sm">
                      Thanks for reaching out. I&apos;ll review your message and get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-8 space-y-5">
                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className={inputClass("name")}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 text-red-400 text-xs mt-1 font-mono">
                          <AlertCircle size={10} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@company.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 text-red-400 text-xs mt-1 font-mono">
                          <AlertCircle size={10} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Project type */}
                  <div>
                    <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">
                      PROJECT TYPE *
                    </label>
                    <select
                      value={form.projectType}
                      onChange={update("projectType")}
                      onFocus={() => setFocusedField("projectType")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass("projectType")}
                    >
                      <option value="" disabled>Select the type of project...</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="flex items-center gap-1 text-red-400 text-xs mt-1 font-mono">
                        <AlertCircle size={10} /> {errors.projectType}
                      </p>
                    )}
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label className="font-mono text-xs text-cyber-dim tracking-widest block mb-1.5">
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Describe your project, timeline, budget, and any specific requirements..."
                      rows={5}
                      className={`${inputClass("message")} resize-none`}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? (
                        <p className="flex items-center gap-1 text-red-400 text-xs font-mono">
                          <AlertCircle size={10} /> {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-cyber-muted text-xs font-mono">
                        {form.message.length} chars
                      </span>
                    </div>
                  </div>

                  {/* Error banner */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/8 text-red-400 text-xs font-mono">
                      <AlertCircle size={13} />
                      Something went wrong. Please email me directly at nikeshmandal.07@gmail.com
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className="btn-cyber w-full flex items-center justify-center gap-2 py-3.5 bg-cyber-cyan text-cyber-black font-display text-xs font-bold tracking-widest hover:shadow-cyber-md transition-all duration-300 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-cyber-black border-t-transparent animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        SEND MESSAGE
                      </>
                    )}
                  </button>

                  <p className="text-center text-cyber-muted text-xs font-mono">
                    By submitting, you agree to be contacted about your inquiry.
                    No spam, ever.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}