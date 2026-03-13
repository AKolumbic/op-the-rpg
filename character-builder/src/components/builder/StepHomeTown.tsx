"use client";

import { HOME_TOWNS } from "@/data/home-towns";
import { ABILITY_SCORE_NAMES } from "@/data/ability-scores";
import {
  HOMETOWN_UNIVERSAL_PROMPTS,
  getHomeTownPrompts,
} from "@/data/narrative-prompts";
import type { AbilityScoreKey } from "@/data/skills";
import type { CharacterData, AbilityScoreSet, NarrativeResponses } from "@/lib/types";
import { EMPTY_ABILITY_SCORES } from "@/lib/types";
import OptionCard from "./OptionCard";
import CompressedSelector from "./CompressedSelector";
import NarrativeInput from "./NarrativeInput";
import NarrativeSection from "./NarrativeSection";

interface Props {
  data: CharacterData;
  onUpdate: (patch: Partial<CharacterData>) => void;
}

export default function StepHomeTown({ data, onUpdate }: Props) {
  const selected = HOME_TOWNS.find((h) => h.id === data.homeTown);
  const townPrompts = selected ? getHomeTownPrompts(selected.id) : undefined;

  function handleSelect(id: string) {
    onUpdate({
      homeTown: id,
      abilityScoreBonuses: { ...EMPTY_ABILITY_SCORES },
    });
  }

  function setBonuses(bonuses: Partial<Record<AbilityScoreKey, number>>) {
    const newBonuses: AbilityScoreSet = { ...EMPTY_ABILITY_SCORES };
    for (const [key, val] of Object.entries(bonuses)) {
      newBonuses[key as AbilityScoreKey] = val!;
    }
    onUpdate({ abilityScoreBonuses: newBonuses });
  }

  function updateNarrative(
    field: keyof NarrativeResponses["homeTown"],
    value: string
  ) {
    onUpdate({
      narrative: {
        ...data.narrative,
        homeTown: { ...data.narrative.homeTown, [field]: value },
      },
    });
  }

  const totalBonus = selected
    ? selected.abilityScoreOptions.reduce(
        (sum, key) => sum + data.abilityScoreBonuses[key],
        0
      )
    : 0;

  // Before selection: show full card grid
  if (!selected) {
    return (
      <div>
        <h2 className="font-display text-2xl text-comic-blue tracking-wide mb-2">Choose Your Home Town</h2>
        <p className="text-muted mb-6">
          Where you grew up — the place that shaped you before your Origin Story.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {HOME_TOWNS.map((town) => (
            <OptionCard
              key={town.id}
              name={town.name}
              description={town.description}
              selected={false}
              onClick={() => handleSelect(town.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // After selection: compressed selector + detail panel
  return (
    <div>
      <h2 className="font-display text-2xl text-comic-blue tracking-wide mb-4">Home Town</h2>

      <CompressedSelector
        options={HOME_TOWNS.map((t) => ({ id: t.id, name: t.name }))}
        selectedId={data.homeTown}
        onSelect={handleSelect}
      />

      <div className="comic-panel p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-display text-xl text-accent tracking-wide">{selected.name}</h3>
        </div>

        {/* Full description */}
        <p className="text-sm text-foreground/80 mb-4">{selected.description}</p>

        {/* What it teaches */}
        <div className="mb-4 p-3 border-2 border-card-border bg-background/50 shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
          <h4 className="font-display text-sm text-accent/80 tracking-wide mb-1">
            What {selected.name} Teaches You
          </h4>
          <p className="text-sm text-muted">{selected.whatItTeaches}</p>
        </div>

        {/* Ability score bonuses */}
        <div className="mb-4">
          <h4 className="font-display text-sm tracking-wide mb-2">Ability Score Bonuses</h4>
          <p className="text-xs text-muted mb-3">
            +2 to one and +1 to another, or +1 to all three.
          </p>

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setBonuses({})}
              className="px-3 py-1 text-xs border-2 border-card-border hover:border-muted transition-colors shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
            >
              Reset
            </button>
            <button
              onClick={() => {
                const [a, b, c] = selected.abilityScoreOptions;
                setBonuses({ [a]: 1, [b]: 1, [c]: 1 });
              }}
              className={`px-3 py-1 text-xs border-2 transition-colors shadow-[2px_2px_0_rgba(0,0,0,0.2)] ${
                totalBonus === 3 &&
                !Object.values(data.abilityScoreBonuses).some((v) => v === 2)
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-card-border hover:border-muted"
              }`}
            >
              +1 / +1 / +1
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {selected.abilityScoreOptions.map((ability) => (
              <div key={ability} className="text-center">
                <p className="text-sm font-display tracking-wide mb-2">
                  {ABILITY_SCORE_NAMES[ability]}
                </p>
                <div className="flex gap-1 justify-center">
                  {[0, 1, 2].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        const newBonuses = { ...EMPTY_ABILITY_SCORES };
                        for (const key of selected.abilityScoreOptions) {
                          if (key !== ability) {
                            newBonuses[key] = data.abilityScoreBonuses[key];
                          }
                        }
                        newBonuses[ability] = val;
                        onUpdate({ abilityScoreBonuses: newBonuses });
                      }}
                      className={`w-8 h-8 text-sm border-2 transition-all shadow-[2px_2px_0_rgba(0,0,0,0.2)] ${
                        data.abilityScoreBonuses[ability] === val
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-card-border hover:border-muted"
                      }`}
                    >
                      +{val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {totalBonus > 0 && totalBonus !== 3 && (
            <p className="text-xs text-comic-orange mt-2 font-semibold">
              Total must be exactly 3. Currently: +{totalBonus}
            </p>
          )}
        </div>

        {/* Grants */}
        <div className="mb-0 p-3 border-2 border-card-border shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
          <h4 className="font-display text-sm tracking-wide mb-2">Granted</h4>
          <ul className="text-sm space-y-1 text-muted">
            <li>
              <span className="text-foreground font-medium">Feat:</span>{" "}
              {selected.grantedFeat}
            </li>
            <li>
              <span className="text-foreground font-medium">Skills:</span>{" "}
              {selected.skillProficiencies.join(", ")}
            </li>
            <li>
              <span className="text-foreground font-medium">Tool:</span>{" "}
              {selected.toolProficiency}
            </li>
          </ul>
        </div>

        {/* Narrative prompts */}
        <NarrativeSection>
          {townPrompts && (
            <NarrativeInput
              label={townPrompts.specific1.label}
              placeholder={townPrompts.specific1.placeholder}
              value={data.narrative.homeTown.specific1}
              onChange={(v) => updateNarrative("specific1", v)}
            />
          )}
          {HOMETOWN_UNIVERSAL_PROMPTS.map((prompt) => (
            <NarrativeInput
              key={prompt.id}
              label={prompt.label}
              placeholder={prompt.placeholder}
              value={
                data.narrative.homeTown[
                  prompt.id as keyof NarrativeResponses["homeTown"]
                ]
              }
              onChange={(v) =>
                updateNarrative(
                  prompt.id as keyof NarrativeResponses["homeTown"],
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
