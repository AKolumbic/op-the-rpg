"use client";

import type { CharacterData } from "@/lib/types";
import { HUMAN_VARIANTS } from "@/data/human-variants";
import { HOME_TOWNS } from "@/data/home-towns";
import { ORIGIN_STORIES } from "@/data/origin-stories";

interface BackstoryPreviewProps {
  data: CharacterData;
  characterName: string;
}

export default function BackstoryPreview({ data, characterName }: BackstoryPreviewProps) {
  const variant = HUMAN_VARIANTS.find((v) => v.id === data.humanVariant);
  const homeTown = HOME_TOWNS.find((h) => h.id === data.homeTown);
  const origin = ORIGIN_STORIES.find((o) => o.id === data.originStory);
  const n = data.narrative;

  // Build sections, omitting empty responses
  const sections: { heading: string; lines: string[] }[] = [];

  // Intro
  const introLines: string[] = [];
  const name = characterName || "This character";
  if (variant && homeTown) {
    introLines.push(`${name} is a ${variant.name} from ${homeTown.name}.`);
  }
  if (n.variant.noticeableTraits) introLines.push(n.variant.noticeableTraits);
  if (n.variant.firstImpression) introLines.push(n.variant.firstImpression);
  if (introLines.length > 0) sections.push({ heading: "", lines: introLines });

  // Who They Are (variant)
  const variantLines: string[] = [];
  if (n.variant.specific1) variantLines.push(n.variant.specific1);
  if (n.variant.specific2) variantLines.push(n.variant.specific2);
  if (variantLines.length > 0) sections.push({ heading: "Who They Are", lines: variantLines });

  // Growing Up (home town)
  const townLines: string[] = [];
  if (n.homeTown.neighborhood) townLines.push(n.homeTown.neighborhood);
  if (n.homeTown.importantPerson) townLines.push(n.homeTown.importantPerson);
  if (n.homeTown.specific1) townLines.push(n.homeTown.specific1);
  if (n.homeTown.memory) townLines.push(n.homeTown.memory);
  if (townLines.length > 0) sections.push({ heading: "Growing Up", lines: townLines });

  // The Turning Point (origin)
  const originLines: string[] = [];
  if (n.origin.whatHappened) originLines.push(n.origin.whatHappened);
  if (n.origin.where) originLines.push(n.origin.where);
  if (n.origin.whoElse) originLines.push(n.origin.whoElse);
  if (n.origin.whatYouLost) originLines.push(n.origin.whatYouLost);
  if (n.origin.whatYouGained) originLines.push(n.origin.whatYouGained);
  if (n.origin.howYouFeel) originLines.push(n.origin.howYouFeel);
  if (originLines.length > 0) sections.push({ heading: "The Turning Point", lines: originLines });

  // Abilities
  const abilityLines: string[] = [];
  if (n.abilities.physicalStrength) abilityLines.push(n.abilities.physicalStrength);
  if (n.abilities.mentalStrength) abilityLines.push(n.abilities.mentalStrength);
  if (abilityLines.length > 0) sections.push({ heading: "Abilities", lines: abilityLines });

  const hasContent = sections.some((s) => s.lines.length > 0);

  if (!hasContent) {
    return (
      <div className="comic-panel p-6 text-center">
        <p className="text-muted italic">
          No backstory yet. Go back and fill in some narrative prompts to see your character&apos;s story come together.
        </p>
      </div>
    );
  }

  return (
    <div className="comic-panel p-6">
      {sections.map((section, i) => (
        <div key={i} className={i > 0 ? "mt-4" : ""}>
          {section.heading && (
            <h4 className="font-display text-accent text-sm tracking-widest uppercase mb-1">
              {section.heading}
            </h4>
          )}
          <p className="text-foreground/90 leading-relaxed">
            {section.lines.join(" ")}
          </p>
        </div>
      ))}
    </div>
  );
}
