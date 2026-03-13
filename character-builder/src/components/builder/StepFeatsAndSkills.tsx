"use client";

import { useEffect } from "react";
import { FEATS, type Feat } from "@/data/feats";
import { HOME_TOWNS } from "@/data/home-towns";
import { ORIGIN_STORIES } from "@/data/origin-stories";
import { SKILLS } from "@/data/skills";
import { FEAT_PROMPT_LABEL, FEAT_PLACEHOLDERS } from "@/data/narrative-prompts";
import type { CharacterData } from "@/lib/types";

interface Props {
  data: CharacterData;
  onUpdate: (patch: Partial<CharacterData>) => void;
}

export default function StepFeatsAndSkills({ data, onUpdate }: Props) {
  const homeTown = HOME_TOWNS.find((h) => h.id === data.homeTown);
  const origin = ORIGIN_STORIES.find((o) => o.id === data.originStory);
  const isEveryman = data.humanVariant === "everyman";
  const pickCount = isEveryman ? 3 : 2;

  // --- Home Town Grant Options ---
  const defaultGrantFeat = FEATS.find((f) => f.id === homeTown?.grantedFeat);
  const homeTownFeats = FEATS.filter(
    (f) => f.category === "hometown" && f.hometown === data.homeTown
  );
  const grantOptions = [defaultGrantFeat, ...homeTownFeats].filter(
    (f): f is Feat => f != null
  );

  // --- Creation Pick Pool ---
  const originFeats = FEATS.filter((f) => f.category === "origin");
  const originStoryFeats = FEATS.filter(
    (f) => f.category === "origin-story" && f.originStory === data.originStory
  );

  // --- Cleanup invalid selections when home town or origin story changes ---
  useEffect(() => {
    const validGrantIds = grantOptions.map((f) => f.id);
    let needsUpdate = false;
    let newHomeTownFeat = data.homeTownFeat;
    let newFeats = [...data.feats];
    const newNarrative = { ...data.narrative.feats };

    if (newHomeTownFeat && !validGrantIds.includes(newHomeTownFeat)) {
      delete newNarrative[newHomeTownFeat];
      newHomeTownFeat = "";
      needsUpdate = true;
    }

    const invalidPicks = newFeats.filter((f) => {
      const feat = FEATS.find((ff) => ff.id === f);
      if (feat?.category === "origin-story" && feat.originStory !== data.originStory) return true;
      if (feat?.category === "hometown") return true; // hometown feats belong in the grant slot
      return false;
    });
    if (invalidPicks.length > 0) {
      invalidPicks.forEach((f) => delete newNarrative[f]);
      newFeats = newFeats.filter((f) => !invalidPicks.includes(f));
      needsUpdate = true;
    }

    if (needsUpdate) {
      onUpdate({
        homeTownFeat: newHomeTownFeat,
        feats: newFeats,
        narrative: { ...data.narrative, feats: newNarrative },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.homeTown, data.originStory]);

  function selectGrant(featId: string) {
    let newFeats = [...data.feats];
    const newNarrative = { ...data.narrative.feats };

    // Clear narrative for old grant
    if (data.homeTownFeat) {
      delete newNarrative[data.homeTownFeat];
    }

    // If the new grant is currently in picks (e.g., an origin feat), remove it
    if (newFeats.includes(featId)) {
      delete newNarrative[featId];
      newFeats = newFeats.filter((f) => f !== featId);
    }

    onUpdate({
      homeTownFeat: featId,
      feats: newFeats,
      narrative: { ...data.narrative, feats: newNarrative },
    });
  }

  function toggleFeat(featId: string) {
    const current = [...data.feats];
    const idx = current.indexOf(featId);

    if (idx >= 0) {
      current.splice(idx, 1);
      const newNarrative = { ...data.narrative.feats };
      delete newNarrative[featId];
      onUpdate({
        feats: current,
        narrative: { ...data.narrative, feats: newNarrative },
      });
    } else {
      const feat = FEATS.find((f) => f.id === featId);
      if (!feat?.repeatable && current.includes(featId)) return;
      if (current.length >= pickCount) return;
      current.push(featId);
      onUpdate({ feats: current });
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

  function renderFeatCard(
    feat: Feat,
    isSelected: boolean,
    onToggle: () => void,
    tag?: string
  ) {
    return (
      <div key={feat.id}>
        <button
          onClick={onToggle}
          className={`w-full text-left p-4 border-2 transition-all ${
            isSelected
              ? "border-accent bg-accent/10 shadow-[4px_4px_0_#000]"
              : "border-card-border bg-card-bg hover:border-accent/50 shadow-[3px_3px_0_rgba(0,0,0,0.3)]"
          }`}
        >
          <h4
            className={`font-display text-sm tracking-wide ${
              isSelected ? "text-accent" : ""
            }`}
          >
            {feat.name}
            {tag && (
              <span className="text-xs ml-2 text-muted">({tag})</span>
            )}
            {feat.repeatable && (
              <span className="text-xs ml-2 text-muted">(repeatable)</span>
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

        {isSelected && (
          <div className="mt-2 ml-2 mr-2 mb-3">
            <label className="block text-xs text-muted font-display mb-1">
              {FEAT_PROMPT_LABEL}
            </label>
            <input
              type="text"
              value={data.narrative.feats[feat.id] ?? ""}
              onChange={(e) => updateFeatNarrative(feat.id, e.target.value)}
              placeholder={
                FEAT_PLACEHOLDERS[feat.category] ?? "Tell us more..."
              }
              className="w-full px-3 py-1.5 bg-background border-2 border-card-border focus:border-accent focus:outline-none text-sm placeholder:text-muted/50 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-comic-green tracking-wide mb-2">
        Feats & Skills
      </h2>
      <p className="text-muted mb-6">
        Your Home Town grants one feat, then choose {pickCount} more from your
        Origin Feats and Origin Story.
      </p>

      {/* Section 1: Home Town Grant */}
      {homeTown && grantOptions.length > 0 && (
        <div className="mb-8">
          <h3 className="font-display tracking-wide mb-1">
            Home Town Feat
            <span className="text-sm text-muted font-normal ml-2">
              — granted by {homeTown.name}
            </span>
          </h3>
          <p className="text-xs text-muted mb-3">
            Choose one feat from your Home Town.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {grantOptions.map((feat) =>
              renderFeatCard(
                feat,
                data.homeTownFeat === feat.id,
                () => selectGrant(feat.id),
                feat.category === "hometown" ? "home town" : "default"
              )
            )}
          </div>
        </div>
      )}

      {/* Section 2: Creation Picks */}
      <div className="mb-8">
        <h3 className="font-display tracking-wide mb-1">
          Origin Feats ({data.feats.length}/{pickCount})
        </h3>
        <p className="text-xs text-muted mb-3">
          Choose {pickCount} from Origin Feats and your Origin Story.
        </p>

        {/* Origin Feats sub-group */}
        {originFeats.filter((f) => f.id !== data.homeTownFeat).length > 0 && (
          <>
            <p className="text-xs text-accent font-display tracking-wide mb-2 mt-4">
              Origin Feats
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {originFeats
                .filter((f) => f.id !== data.homeTownFeat)
                .map((feat) =>
                  renderFeatCard(
                    feat,
                    data.feats.includes(feat.id),
                    () => toggleFeat(feat.id)
                  )
                )}
            </div>
          </>
        )}

        {/* Origin Story Feats sub-group */}
        {originStoryFeats.length > 0 && (
          <>
            <p className="text-xs text-accent font-display tracking-wide mb-2 mt-6">
              {origin?.name ?? "Origin Story"} Feats
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {originStoryFeats.map((feat) =>
                renderFeatCard(
                  feat,
                  data.feats.includes(feat.id),
                  () => toggleFeat(feat.id)
                )
              )}
            </div>
          </>
        )}
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
