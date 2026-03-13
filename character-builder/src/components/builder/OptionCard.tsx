"use client";

interface OptionCardProps {
  name: string;
  tagline?: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  name,
  tagline,
  description,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border-3 transition-all ${
        selected
          ? "border-accent bg-accent/10 shadow-[4px_4px_0_#000]"
          : "border-card-border bg-card-bg hover:border-accent/50 shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:-translate-y-0.5"
      }`}
    >
      <div className={`px-4 py-1.5 ${selected ? "bg-accent/20" : ""}`}>
        <h3 className={`font-display text-lg tracking-wide ${selected ? "text-accent" : "text-foreground"}`}>
          {name}
        </h3>
      </div>
      <div className="px-4 pb-3 pt-1">
        {tagline && (
          <p className="text-sm text-accent/70 italic">{tagline}</p>
        )}
        {description && (
          <p className="text-sm text-muted mt-1.5 line-clamp-3">{description}</p>
        )}
      </div>
    </button>
  );
}
