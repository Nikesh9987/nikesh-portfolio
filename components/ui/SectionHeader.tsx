interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 space-y-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-cyber-cyan/30 rounded-full bg-cyber-cyan/5 text-cyber-cyan text-xs font-mono tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent" />
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl sm:text-5xl font-black text-white leading-tight">
        {title}{" "}
        <span className="text-gradient">{highlight}</span>
      </h2>
      {description && (
        <p className="text-cyber-dim font-body text-base max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}