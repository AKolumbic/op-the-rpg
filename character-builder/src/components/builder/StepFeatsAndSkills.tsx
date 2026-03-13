"use client";

import { FEATS } from "@/data/feats";
import { HOME_TOWNS } from "@/data/home-towns";
import { HUMAN_VARIANTS } from "@/data/human-variants";
import { SKILLS } from "@/data/skills";
import { FEAT_PROMPT_LABEL, FEAT_PLACEHOLDERS } from "@/data/narrative-prompts";
import type { CharacterData } from "@/lib/types";

interface Props {
  data: CharacterData;
  onUpdate: (patch: Partial<CharacterData>) => void;
}

export default function StepFeatsAndSkills({ data, onUpdate }: Props) {
  const homeTown = HOME_TOWNS.find((h) => h.id === data.homeTown);
  const isEveryman = data.humanVariant === "everyman";

  const grantedFeatId = homeTown?.grantedFeat ?? "";
  const originFeats = FEATS.filter((f) => f.category === "origin");
  const pickCount = isEveryman ? 3 : 2;
  const chosenFeats = data.feats.filter((f) => f !== grantedFeatId);

  function toggleFeat(featId: string) {
    if (featId === grantedFeatId) return;

    const current = [...chosenFeats];
    const idx = current.indexOf(featId);

    if (idx >= 0) {
      current.splice(idx, 1);
      const newFeatNarrative = { ...data.narrative.feats };
      delete newFeatNarrative[featId];
      onUpdate({
        feats: grantedFeatId ? [grantedFeatId, ...current] : [...current],
        narrative: { ...data.narrative, feats: newFeatNarrative },
      });
    } else {
      const feat = FEATS.find((f) => f.id === featId);
      if (!feat?.repeatable && current.includes(featId)) return;
      if (current.length >= pickCount) return;
      current.push(featId);
      onUpdate({
        feats: grantedFeatId ? [grantedFeatId, ...current] : [...current],
      });
    }
  }

  function updateFeatNarrative(featId: string, value: string) {
    onUpdate({
      narrative: {
        ...data.narrative,
        feats: { ...data.narrative.feats, [featId]: value },
      },
    });
  }

  const homeTownSkills = homeTown?.skillProficiencies ?? [];
  const allSkillProficiencies = [
    ...new Set([...homeTownSkills, ...data.skillProficiencies]),
  ];

  return (
    <div>
      <h2 className="font-display text-2xl text-comic-green tracking-wide mb-2">Feats & Skills</h2>
      <p className="text-muted mb-6">
        Choose {pickCount} Origin Feats. Your Home Town grants an additional
        feat and skill proficiencies automatically.
      </p>

      {/* Granted feat */}
      {homeTown && grantedFeatId && (
        <div className="mb-4 p-3 border-2 border-accent/40 bg-accent/5 shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
          <p className="text-sm text-accent font-display tracking-wide">
            Granted by {homeTown.name}
          </p>
          <p className="text-sm mt-1">
            {FEATS.find((f) => f.id === grantedFeatId)?.name ?? grantedFeatId}
          </p>
        </div>
      )}

      {/* Feat selection */}
      <div className="mb-8">
        <h3 className="font-display tracking-wide mb-3">
          Choose {pickCount} Origin Feats ({chosenFeats.length}/{pickCount})
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {originFeats.map((feat) => {
            const isGranted = feat.id === grantedFeatId;
            const isChosen = chosenFeats.includes(feat.id);

            return (
              <div key={feat.id}>
                <button
                  onClick={() => toggleFeat(feat.id)}
                  disabled={isGranted}
                  className={`w-full text-left p-4 border-2 transition-all ${
                    isGranted
                      ? "border-accent/30 bg-accent/5 opacity-60 cursor-not-allowed shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
                      : isChosen
                      ? "border-accent bg-accent/10 shadow-[4px_4px_0_#000]"
                      : "border-card-border bg-card-bg hover:border-accent/50 shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
                  }`}
                >
                  <h4
                    className={`font-display text-sm tracking-wide ${
                      isChosen ? "text-accent" : ""
                    }`}
                  >
                    {feat.name}
                    {isGranted && (
                      <span className="text-xs ml-2 text-muted">
                        (granted)
                      </span>
                    )}
                    {feat.repeatable && (
                      <span className="text-xs ml-2 text-muted">
                        (repeatable)
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-muted mt-1">{feat.description}</p>
                  <ul className="mt-2 space-y-1">
                    {feat.benefits.map((b, i) => (
                      <li key={i} className="text-xs text-muted">
                        &#9670; {b}
                      </li>
                    ))}
                  </ul>
                </button>

                {/* Inline narrative input when feat is selected */}
                {isChosen && (
                  <div className="mt-2 ml-2 mr-2 mb-3">
                    <label className="block text-xs text-muted font-display mb-1">
                      {FEAT_PROMPT_LABEL}
                    </label>
                    <input
                      type="text"
                      value={data.narrative.feats[feat.id] ?? ""}
                      onChange={(e) =>
                        updateFeatNarrative(feat.id, e.target.value)
                      }
                      placeholder={
                        FEAT_PLACEHOLDERS[feat.category] ?? "Tell us more..."
                      }
                      className="w-full px-3 py-1.5 bg-background border-2 border-card-border focus:border-accent focus:outline-none text-sm placeholder:text-muted/50 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills display */}
      <div>
        <h3 className="font-display tracking-wide mb-3">Skill Proficiencies</h3>
        {homeTown && (
          <p className="text-sm text-muted mb-3">
            From {homeTown.name}: {homeTownSkills.join(", ")}
          </p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SKILLS.map((skill) => {
            const isProficient = allSkillProficiencies.includes(skill.id);
            return (
              <div
                key={skill.id}
                className={`text-sm px-3 py-2 border-2 ${
                  isProficient
                    ? "border-accent/40 bg-accent/5 text-accent shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                    : "border-card-border text-muted"
                }`}
              >
                {skill.name}
                <span className="text-xs ml-1">({skill.ability})</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
