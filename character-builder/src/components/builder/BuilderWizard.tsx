"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_CHARACTER_DATA } from "@/lib/types";
import type { CharacterData } from "@/lib/types";
import { createCharacter } from "@/hooks/useCharacter";
import StepHumanVariant from "./StepHumanVariant";
import StepHomeTown from "./StepHomeTown";
import StepOriginStory from "./StepOriginStory";
import StepAbilityScores from "./StepAbilityScores";
import StepFeatsAndSkills from "./StepFeatsAndSkills";
import StepDetails from "./StepDetails";

const STEPS = [
  { id: "variant", label: "Who Are You?" },
  { id: "origin", label: "Origin Story" },
  { id: "hometown", label: "Home Town" },
  { id: "abilities", label: "Ability Scores" },
  { id: "feats", label: "Feats & Skills" },
  { id: "details", label: "Details" },
];

const STEP_COLORS = [
  "bg-comic-red",
  "bg-comic-blue",
  "bg-comic-cyan",
  "bg-comic-orange",
  "bg-comic-green",
  "bg-comic-yellow",
];

export default function BuilderWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CharacterData>({ ...DEFAULT_CHARACTER_DATA });
  const [characterName, setCharacterName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateData(patch: Partial<CharacterData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        return !!data.humanVariant;
      case 1:
        return !!data.originStory;
      case 2:
        return !!data.homeTown;
      case 3:
        return true;
      case 4:
        return data.feats.length >= 2;
      case 5:
        return characterName.trim().length > 0;
      default:
        return false;
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const character = await createCharacter(characterName.trim(), data);
      router.push(`/characters/${character.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Step indicator */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => i < step && setStep(i)}
            disabled={i > step}
            className={`px-3 py-1.5 text-sm font-display tracking-wide whitespace-nowrap border-2 transition-all ${
              i === step
                ? `${STEP_COLORS[i]} text-white border-black shadow-[3px_3px_0_#000]`
                : i < step
                ? "bg-accent/20 text-accent border-accent/40 cursor-pointer hover:bg-accent/30 shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
                : "bg-card-bg text-muted border-card-border cursor-not-allowed shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
            }`}
          >
            {i + 1}. {s.label}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="mb-8">
        {step === 0 && <StepHumanVariant data={data} onUpdate={updateData} />}
        {step === 1 && <StepOriginStory data={data} onUpdate={updateData} />}
        {step === 2 && <StepHomeTown data={data} onUpdate={updateData} />}
        {step === 3 && <StepAbilityScores data={data} onUpdate={updateData} />}
        {step === 4 && <StepFeatsAndSkills data={data} onUpdate={updateData} />}
        {step === 5 && (
          <StepDetails
            data={data}
            characterName={characterName}
            onNameChange={setCharacterName}
            onUpdate={updateData}
          />
        )}
      </div>

      {/* Navigation */}
      {error && <p className="text-comic-red text-sm font-semibold mb-4">{error}</p>}

      <div className="flex justify-between">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="comic-btn bg-card-bg text-foreground/70 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="comic-btn bg-accent text-black disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={!canAdvance() || saving}
            className="comic-btn bg-comic-red text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Character"}
          </button>
        )}
      </div>
    </div>
  );
}
