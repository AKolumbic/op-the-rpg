"use client";

interface NarrativeSectionProps {
  children: React.ReactNode;
}

export default function NarrativeSection({ children }: NarrativeSectionProps) {
  return (
    <div className="mt-6 pt-6 border-t-3 border-accent/40">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-display text-lg text-comic-yellow tracking-wide">Tell Your Story</h3>
      </div>
      <p className="text-xs text-muted mb-4">
        Optional — write as much or as little as you want. These build your backstory.
      </p>
      {children}
    </div>
  );
}
