"use client";

interface NarrativeInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  maxLength?: number;
}

export default function NarrativeInput({
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
  maxLength = 200,
}: NarrativeInputProps) {
  const isNearLimit = value.length > maxLength * 0.85;
  const isOverLimit = value.length > maxLength;

  return (
    <div className="mb-4 last:mb-0">
      <label className="block text-sm font-display tracking-wide text-foreground/80 mb-1.5">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full px-3 py-2 bg-background border-2 border-card-border focus:border-accent focus:outline-none text-sm resize-none placeholder:text-muted/50 shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-background border-2 border-card-border focus:border-accent focus:outline-none text-sm placeholder:text-muted/50 shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
        />
      )}
      {value.length > 0 && (
        <p className={`text-xs mt-1 text-right ${isOverLimit ? "text-comic-red" : isNearLimit ? "text-comic-orange" : "text-muted/50"}`}>
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}
