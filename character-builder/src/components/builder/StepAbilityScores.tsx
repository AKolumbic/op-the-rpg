"use client";

import { ABILITY_SCORES, ABILITY_SCORE_NAMES, STANDARD_ARRAY, POINT_BUY } from "@/data/ability-scores";
import { ABILITY_FLAVOR_PROMPTS } from "@/data/narrative-prompts";
import { getSuggestion } from "@/data/ability-suggestions";
import { HOME_TOWNS } from "@/data/home-towns";
import { HUMAN_VARIANTS } from "@/data/human-variants";
import { ORIGIN_STORIES } from "@/data/origin-stories";
import type { AbilityScoreKey } from "@/data/skills";
import type { CharacterData, AbilityScoreSet, NarrativeResponses } from "@/lib/types";
import { abilityModifier, formatModifier } from "@/lib/utils";
import NarrativeInput from "./NarrativeInput";

interface Props {
  data: CharacterData;
  onUpdate: (patch: Partial<CharacterData>) => void;
}

export default function StepAbilityScores({ data, onUpdate }: Props) {
  const method = data.abilityScoreMethod;

  const homeTown = HOME_TOWNS.find((h) => h.id === data.homeTown);
  const homeTownOptions = homeTown?.abilityScoreOptions ?? [];

  const suggestion =
    data.originStory && data.humanVariant
      ? getSuggestion(data.originStory, data.humanVariant, homeTownOptions, method)
      : null;

  const variant = HUMAN_VARIANTS.find((v) => v.id === data.humanVariant);
  const origin = ORIGIN_STORIES.find((o) => o.id === data.originStory);

  function setMethod(m: "standard-array" | "point-buy") {
    const base: AbilityScoreSet =
      m === "standard-array"
        ? { STR: 15, DEX: 14, CON: 13, INT: 12, WIS: 10, CHA: 8 }
        : { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 };
    onUpdate({ abilityScoreMethod: m, abilityScores: base });
  }

  function applySuggestion() {
    if (!suggestion) return;
    onUpdate({
      abilityScores: suggestion.scores,
      abilityScoreBonuses: suggestion.bonuses,
    });
  }

  function handleStandardArrayAssign(ability: AbilityScoreKey, value: number) {
    const newScores = { ...data.abilityScores };
    const currentHolder = ABILITY_SCORES.find(
      (a) => a !== ability && newScores[a] === value
    );
    if (currentHolder) {
      newScores[currentHolder] = newScores[ability];
    }
    newScores[ability] = value;
    onUpdate({ abilityScores: newScores });
  }

  function handlePointBuy(ability: AbilityScoreKey, delta: number) {
    const current = data.abilityScores[ability];
    const next = current + delta;
    if (next < POINT_BUY.min || next > POINT_BUY.max) return;

    const currentCost = POINT_BUY.costs[current];
    const nextCost = POINT_BUY.costs[next];
    const spent = pointsSpent();
    const newSpent = spent - currentCost + nextCost;
    if (newSpent > POINT_BUY.totalPoints) return;

    onUpdate({
      abilityScores: { ...data.abilityScores, [ability]: next },
    });
  }

  function pointsSpent(): number {
    return ABILITY_SCORES.reduce(
      (sum, a) => sum + POINT_BUY.costs[data.abilityScores[a]],
      0
    );
  }

  function updateNarrative(
    field: keyof NarrativeResponses["abilities"],
    value: string
  ) {
    onUpdate({
      narrative: {
        ...data.narrative,
        abilities: { ...data.narrative.abilities, [field]: value },
      },
    });
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-comic-orange tracking-wide mb-2">Ability Scores</h2>
      <p className="text-muted mb-6">
        Assign your six ability scores. Home Town bonuses are applied
        automatically.
      </p>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMethod("standard-array")}
          className={`px-4 py-2 text-sm font-display tracking-wide border-2 transition-all shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${
            method === "standard-array"
              ? "border-accent bg-accent text-black"
              : "border-card-border hover:border-muted"
          }`}
        >
          Standard Array
        </button>
        <button
          onClick={() => setMethod("point-buy")}
          className={`px-4 py-2 text-sm font-display tracking-wide border-2 transition-all shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${
            method === "point-buy"
              ? "border-accent bg-accent text-black"
              : "border-card-border hover:border-muted"
          }`}
        >
          Point Buy
        </button>
      </div>

      {/* Suggestion panel */}
      {suggestion && (
        <div className="mb-6 border-2 border-accent bg-accent/5 p-4 shadow-[3px_3px_0_rgba(0,0,0,0.3)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-display text-sm tracking-widest uppercase text-accent mb-1">
                Suggested for {origin?.name ?? "your origin"}
                {variant ? ` + ${variant.name}` : ""}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {suggestion.flavor}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {suggestion.priorities.slice(0, 3).map((ability, i) => (
                  <span key={ability} className="text-xs font-display">
                    <span className="text-accent">{i === 0 ? "▸ Primary: " : i === 1 ? "▸ Secondary: " : "▸ Tertiary: "}</span>
                    {ABILITY_SCORE_NAMES[ability]}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={applySuggestion}
              className="comic-btn bg-accent text-black text-sm whitespace-nowrap"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {method === "point-buy" && (
        <p className="text-sm font-display text-accent mb-4">
          Points: {pointsSpent()} / {POINT_BUY.totalPoints}
        </p>
      )}

      <div className="grid gap-3">
        {ABILITY_SCORES.map((ability) => {
          const base = data.abilityScores[ability];
          const bonus = data.abilityScoreBonuses[ability];
          const total = base + bonus;
          const mod = abilityModifier(total);

          return (
            <div
              key={ability}
              className="flex items-center gap-4 p-3 border-2 border-card-border bg-card-bg shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
            >
              <div className="w-28">
                <p className="font-display tracking-wide">{ABILITY_SCORE_NAMES[ability]}</p>
                <p className="text-xs text-muted">{ability}</p>
              </div>

              {method === "standard-array" ? (
                <select
                  value={base}
                  onChange={(e) =>
                    handleStandardArrayAssign(ability, parseInt(e.target.value))
                  }
                  className="bg-background border-2 border-card-border px-2 py-1 text-sm focus:border-accent focus:outline-none"
                >
                  {STANDARD_ARRAY.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePointBuy(ability, -1)}
                    disabled={base <= POINT_BUY.min}
                    className="w-7 h-7 border-2 border-card-border hover:border-muted disabled:opacity-30 text-sm shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-display">{base}</span>
                  <button
                    onClick={() => handlePointBuy(ability, 1)}
                    disabled={base >= POINT_BUY.max}
                    className="w-7 h-7 border-2 border-card-border hover:border-muted disabled:opacity-30 text-sm shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                  >
                    +
                  </button>
                </div>
              )}

              {bonus > 0 && (
                <span className="text-xs text-accent font-display">+{bonus}</span>
              )}

              <div className="ml-auto text-right">
                <p className="text-lg font-display">{total}</p>
                <p className="text-xs text-muted">{formatModifier(mod)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flavor prompts */}
      <div className="mt-6 pt-6 border-t-3 border-accent/40">
        <p className="text-xs text-muted mb-4">
          Optional — describe what makes your character physically and mentally
          distinctive.
        </p>
        {ABILITY_FLAVOR_PROMPTS.map((prompt) => (
          <NarrativeInput
            key={prompt.id}
            label={prompt.label}
            placeholder={prompt.placeholder}
            value={
              data.narrative.abilities[
                prompt.id as keyof NarrativeResponses["abilities"]
              ]
            }
            onChange={(v) =>
              updateNarrative(
                prompt.id as keyof NarrativeResponses["abilities"],
                v
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
