"use client";

interface Option {
  id: string;
  name: string;
}

interface CompressedSelectorProps {
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function CompressedSelector({
  options,
  selectedId,
  onSelect,
}: CompressedSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`px-3 py-1.5 text-sm font-display tracking-wide border-2 transition-all ${
            option.id === selectedId
              ? "border-accent bg-accent text-black shadow-[2px_2px_0_#000]"
              : "border-card-border text-muted hover:border-accent/50 hover:text-foreground shadow-[2px_2px_0_#000]"
          }`}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}
