"use client";

import { useState } from "react";
import { FEATS } from "@/data/feats";
import {
  levelUpSummary,
  computeHP,
  isFeatLevel,
  getOriginData,
} from "@/lib/level-up";
import type { CharacterData } from "@/lib/types";

interface Props {
  character: { id: string; name: string; data: CharacterData };
  onConfirm: (patch: Partial<CharacterData>) => Promise<void>;
  onClose: () => void;
}

export default function LevelUpModal({ character, onConfirm, onClose }: Props) {
  const { data } = character;
  const nextLevel = data.level + 1;
  const summary = levelUpSummary(data.originStory, nextLevel);
  const origin = getOriginData(data.originStory);

  const [selectedFeat, setSelectedFeat] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const generalFeats = FEATS.filter((f) => f.category === "general");

  // Already-chosen half-feats (from prior levels)
  const alreadyChosenFeatIds = Object.values(data.levelFeats ?? {});

  // Compute HP preview
  const currentHP = computeHP(data);
  const previewData = { ...data, level: nextLevel };
  const newHP = computeHP(previewData);
  const hpGain = newHP - currentHP;

  const needsFeat = summary.hasFeatPick;
  const canConfirm = !needsFeat || !!selectedFeat;

  async function handleConfirm() {
    setSaving(true);
    setError("");
    try {
      const patch: Partial<CharacterData> = {
        level: nextLevel,
      };

      if (needsFeat && selectedFeat) {
        patch.levelFeats = {
          ...(data.levelFeats ?? {}),
          [String(nextLevel)]: selectedFeat,
        };
      }

      await onConfirm(patch);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 bg-background border-3 border-accent shadow-[6px_6px_0_#000] p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-2xl text-accent tracking-wide">
            Level Up!
          </h2>
          <p className="text-muted mt-1">
            {character.name} — Level {data.level} → Level {nextLevel}
          </p>
        </div>

        {/* HP Gain */}
        <div className="mb-6 p-4 border-2 border-comic-red/40 bg-comic-red/5 shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
          <h3 className="font-display text-sm tracking-wide text-comic-red mb-1">
            Hit Points
          </h3>
          <p className="text-lg font-display">
            {currentHP} → {newHP}{" "}
            <span className="text-comic-green text-sm">(+{hpGain})</span>
          </p>
          {origin && (
            <p className="text-xs text-muted mt-1">
              {origin.coreTraits.hitDie} average + CON modifier
            </p>
          )}
        </div>

        {/* Proficiency Bonus */}
        {summary.profBonusIncreased && (
          <div className="mb-6 p-4 border-2 border-comic-cyan/40 bg-comic-cyan/5 shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
            <h3 className="font-display text-sm tracking-wide text-comic-cyan mb-1">
              Proficiency Bonus Increase
            </h3>
            <p className="text-lg font-display">
              +{summary.profBonus - 1} → +{summary.profBonus}
            </p>
          </div>
        )}

        {/* Features Gained */}
        {summary.features.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display tracking-wide mb-3">
              New Features
            </h3>
            <div className="space-y-3">
              {summary.features.map((feature) => (
                <div
                  key={feature.name}
                  className="p-4 border-2 border-accent/30 bg-accent/5 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                >
                  <h4 className="font-display text-sm text-accent tracking-wide">
                    {feature.name}
                  </h4>
                  <p className="text-xs text-muted mt-1 italic">
                    SRD: {feature.srdName}
                  </p>
                  <p className="text-sm text-muted mt-2 whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Half-Feat Pick */}
        {needsFeat && (
          <div className="mb-6">
            <h3 className="font-display tracking-wide mb-1">
              Choose a Half-Feat
            </h3>
            <p className="text-xs text-muted mb-3">
              Each half-feat includes +1 to an ability score. Pick one to represent
              how you&apos;ve grown.
            </p>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {generalFeats.map((feat) => {
                const alreadyChosen = alreadyChosenFeatIds.includes(feat.id) && !feat.repeatable;
                const isSelected = selectedFeat === feat.id;

                return (
                  <button
                    key={feat.id}
                    onClick={() => !alreadyChosen && setSelectedFeat(feat.id)}
                    disabled={alreadyChosen}
                    className={`w-full text-left p-3 border-2 transition-all ${
                      alreadyChosen
                        ? "border-card-border bg-card-bg opacity-40 cursor-not-allowed"
                        : isSelected
                        ? "border-accent bg-accent/10 shadow-[4px_4px_0_#000]"
                        : "border-card-border bg-card-bg hover:border-accent/50 shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                    }`}
                  >
                    <h4
                      className={`font-display text-sm tracking-wide ${
                        isSelected ? "text-accent" : ""
                      }`}
                    >
                      {feat.name}
                      {alreadyChosen && (
                        <span className="text-xs ml-2 text-muted">(already taken)</span>
                      )}
                    </h4>
                    <p className="text-xs text-muted mt-1">{feat.description}</p>
                    <ul className="mt-1 space-y-0.5">
                      {feat.benefits.map((b, i) => (
                        <li key={i} className="text-xs text-muted">
                          &#9670; {b}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-comic-red text-sm font-semibold mb-4">{error}</p>
        )}

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="comic-btn bg-card-bg text-foreground/70"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm || saving}
            className="comic-btn bg-comic-green text-black disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : `Confirm Level ${nextLevel}`}
          </button>
        </div>
      </div>
    </div>
  );
}
