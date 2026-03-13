"use client";

import { HUMAN_VARIANTS } from "@/data/human-variants";
import {
  VARIANT_UNIVERSAL_PROMPTS,
  getVariantPrompts,
} from "@/data/narrative-prompts";
import type { CharacterData, NarrativeResponses } from "@/lib/types";
import OptionCard from "./OptionCard";
import CompressedSelector from "./CompressedSelector";
import NarrativeInput from "./NarrativeInput";
import NarrativeSection from "./NarrativeSection";

interface Props {
  data: CharacterData;
  onUpdate: (patch: Partial<CharacterData>) => void;
}

export default function StepHumanVariant({ data, onUpdate }: Props) {
  const selected = HUMAN_VARIANTS.find((v) => v.id === data.humanVariant);
  const variantPrompts = selected ? getVariantPrompts(selected.id) : undefined;

  function handleSelect(id: string) {
    onUpdate({ humanVariant: id, variantOptions: {} });
  }

  function handleSubChoice(choiceId: string, value: string) {
    onUpdate({
      variantOptions: { ...data.variantOptions, [choiceId]: value },
    });
  }

  function updateNarrative(
    field: keyof NarrativeResponses["variant"],
    value: string
  ) {
    onUpdate({
      narrative: {
        ...data.narrative,
        variant: { ...data.narrative.variant, [field]: value },
      },
    });
  }

  // Before selection: show full card grid
  if (!selected) {
    return (
      <div>
        <h2 className="font-display text-2xl text-comic-red tracking-wide mb-2">Who Are You?</h2>
        <p className="text-muted mb-6">
          Who you are before your Origin Story — your genetics, upbringing, and
          natural abilities.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HUMAN_VARIANTS.map((variant) => (
            <OptionCard
              key={variant.id}
              name={variant.name}
              tagline={variant.tagline}
              description={variant.description}
              selected={false}
              onClick={() => handleSelect(variant.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // After selection: compressed selector + detail panel
  return (
    <div>
      <h2 className="font-display text-2xl text-comic-red tracking-wide mb-4">Who Are You?</h2>

      <CompressedSelector
        options={HUMAN_VARIANTS.map((v) => ({ id: v.id, name: v.name }))}
        selectedId={data.humanVariant}
        onSelect={handleSelect}
      />

      {/* Detail panel */}
      <div className="comic-panel p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-display text-xl text-accent tracking-wide">{selected.name}</h3>
          <p className="text-sm text-muted italic">{selected.tagline}</p>
        </div>

        {/* Full description */}
        <p className="text-sm text-foreground/80 mb-4">{selected.description}</p>

        {/* Traits */}
        <div className="mb-4">
          <h4 className="font-display text-sm text-accent/80 tracking-wide mb-2">Traits</h4>
          <ul className="space-y-1.5">
            {selected.traits.map((trait) => (
              <li key={trait.name} className="text-sm">
                <span className="font-medium">{trait.name}.</span>{" "}
                <span className="text-muted">{trait.description}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted mt-2">
            Size: {selected.size} &middot; Speed: {selected.speed} ft.
          </p>
        </div>

        {/* Sub-choices */}
        {selected.subChoices.length > 0 && (
          <div className="mb-4 p-3 border-2 border-card-border bg-background/50 shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
            {selected.subChoices.map((choice) => (
              <div key={choice.id} className="mb-3 last:mb-0">
                <label className="block text-sm font-display tracking-wide mb-2">
                  {choice.label}
                </label>
                <div className="flex flex-wrap gap-2">
                  {choice.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSubChoice(choice.id, opt.id)}
                      className={`px-3 py-1.5 text-sm border-2 transition-all shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${
                        data.variantOptions[choice.id] === opt.id
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-card-border hover:border-muted"
                      }`}
                    >
                      {opt.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Narrative prompts */}
        <NarrativeSection>
          {variantPrompts && (
            <>
              <NarrativeInput
                label={variantPrompts.specific1.label}
                placeholder={variantPrompts.specific1.placeholder}
                value={data.narrative.variant.specific1}
                onChange={(v) => updateNarrative("specific1", v)}
              />
              <NarrativeInput
                label={variantPrompts.specific2.label}
                placeholder={variantPrompts.specific2.placeholder}
                value={data.narrative.variant.specific2}
                onChange={(v) => updateNarrative("specific2", v)}
              />
            </>
          )}
          {VARIANT_UNIVERSAL_PROMPTS.map((prompt) => (
            <NarrativeInput
              key={prompt.id}
              label={prompt.label}
              placeholder={prompt.placeholder}
              value={
                data.narrative.variant[
                  prompt.id as keyof NarrativeResponses["variant"]
                ]
              }
              onChange={(v) =>
                updateNarrative(
                  prompt.id as keyof NarrativeResponses["variant"],
                  v
                )
              }
            />
          ))}
        </NarrativeSection>
      </div>
    </div>
  );
}
