"use client";

import { useState } from "react";
import { getSubclassesForOrigin } from "@/data/subclasses";

interface Props {
  originId: string;
  onConfirm: (subclassId: string) => Promise<void>;
  onClose: () => void;
}

export default function SubclassPickerModal({ originId, onConfirm, onClose }: Props) {
  const [selected, setSelected] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const subclasses = getSubclassesForOrigin(originId);

  async function handleConfirm() {
    if (!selected) return;
    setSaving(true);
    setError("");
    try {
      await onConfirm(selected);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 bg-background border-3 border-accent shadow-[6px_6px_0_#000] p-6">
        <div className="mb-6">
          <h2 className="font-display text-2xl text-comic-blue tracking-wide">
            Choose Your Subclass
          </h2>
          <p className="text-muted mt-1">
            Your specialization defines how your powers develop. This choice is permanent.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {subclasses.map((sc) => {
            const isSelected = selected === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => setSelected(sc.id)}
                className={`w-full text-left p-4 border-2 transition-all ${
                  isSelected
                    ? "border-comic-blue bg-comic-blue/10 shadow-[4px_4px_0_#000]"
                    : "border-card-border bg-card-bg hover:border-comic-blue/50 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h4
                    className={`font-display text-sm tracking-wide ${
                      isSelected ? "text-comic-blue" : ""
                    }`}
                  >
                    {sc.name}
                  </h4>
                  <span className="text-xs text-muted italic">
                    SRD: {sc.srdName}
                  </span>
                </div>
                <p className="text-xs text-accent italic mt-1">
                  &ldquo;{sc.quote}&rdquo;
                </p>
                <p className="text-xs text-muted mt-2">{sc.description}</p>

                {sc.features.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-card-border">
                    <p className="text-xs font-display text-muted tracking-wide mb-1">
                      Features:
                    </p>
                    {sc.features.map((f) => (
                      <p key={f.name} className="text-xs text-muted mt-0.5">
                        <span className="text-accent">Lv {f.level}</span> — {f.name}
                      </p>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <p className="text-comic-red text-sm font-semibold mb-4">{error}</p>
        )}

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="comic-btn bg-card-bg text-foreground/70"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected || saving}
            className="comic-btn bg-comic-blue text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Confirm Subclass"}
          </button>
        </div>
      </div>
    </div>
  );
}
