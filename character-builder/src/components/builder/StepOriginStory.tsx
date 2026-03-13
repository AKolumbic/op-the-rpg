"use client";

import { ORIGIN_STORIES } from "@/data/origin-stories";
import { ORIGIN_PROMPTS, getOriginHints } from "@/data/narrative-prompts";
import type { CharacterData, NarrativeResponses } from "@/lib/types";
import OptionCard from "./OptionCard";
import CompressedSelector from "./CompressedSelector";
import NarrativeInput from "./NarrativeInput";
import NarrativeSection from "./NarrativeSection";

interface Props {
  data: CharacterData;
  onUpdate: (patch: Partial<CharacterData>) => void;
}

export default function StepOriginStory({ data, onUpdate }: Props) {
  const selected = ORIGIN_STORIES.find((o) => o.id === data.originStory);
  const hints = selected ? getOriginHints(selected.id) : undefined;

  function updateNarrative(
    field: keyof NarrativeResponses["origin"],
    value: string
  ) {
    onUpdate({
      narrative: {
        ...data.narrative,
        origin: { ...data.narrative.origin, [field]: value },
      },
    });
  }

  // Before selection: show full card grid
  if (!selected) {
    return (
      <div>
        <h2 className="font-display text-2xl text-comic-cyan tracking-wide mb-2">Choose Your Origin Story</h2>
        <p className="text-muted mb-6">
          The defining event that set you on the path to becoming a hero (or
          villain).
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ORIGIN_STORIES.map((origin) => (
            <OptionCard
              key={origin.id}
              name={origin.name}
              tagline={`"${origin.quote}"`}
              description={origin.description}
              selected={false}
              onClick={() => onUpdate({ originStory: origin.id })}
            />
          ))}
        </div>
      </div>
    );
  }

  // After selection: compressed selector + detail panel
  return (
    <div>
      <h2 className="font-display text-2xl text-comic-cyan tracking-wide mb-4">Origin Story</h2>

      <CompressedSelector
        options={ORIGIN_STORIES.map((o) => ({ id: o.id, name: o.name }))}
        selectedId={data.originStory}
        onSelect={(id) => onUpdate({ originStory: id })}
      />

      <div className="comic-panel p-6">
        {/* The quote — big and prominent */}
        <blockquote className="font-display text-2xl text-accent mb-4">
          &ldquo;{selected.quote}&rdquo;
        </blockquote>

        {/* Full description */}
        <p className="text-sm text-foreground/80 mb-4">{selected.description}</p>

        {/* Archetype */}
        <div className="mb-4 p-3 border-2 border-card-border bg-background/50 shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
          <h4 className="font-display text-sm text-accent/80 tracking-wide mb-1">
            Archetype
          </h4>
          <p className="text-sm text-muted">{selected.archetype}</p>
        </div>

        {/* Narrative prompts */}
        <NarrativeSection>
          {ORIGIN_PROMPTS.map((prompt) => {
            const hintKey = prompt.id as keyof NarrativeResponses["origin"];
            const placeholder = hints
              ? hints[hintKey as keyof typeof hints] || prompt.placeholder
              : prompt.placeholder;

            return (
              <NarrativeInput
                key={prompt.id}
                label={prompt.label}
                placeholder={placeholder}
                value={data.narrative.origin[hintKey]}
                onChange={(v) => updateNarrative(hintKey, v)}
                multiline={prompt.multiline}
              />
            );
          })}
        </NarrativeSection>
      </div>
    </div>
  );
}
