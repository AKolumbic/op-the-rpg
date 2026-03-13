"use client";

import type { Character } from "@/lib/types";
import { ORIGIN_STORIES } from "@/data/origin-stories";
import { HUMAN_VARIANTS } from "@/data/human-variants";

interface CharacterCardProps {
  character: Character;
  onDelete: (id: string) => void;
}

export default function CharacterCard({ character, onDelete }: CharacterCardProps) {
  const origin = ORIGIN_STORIES.find((o) => o.id === character.data.originStory);
  const variant = HUMAN_VARIANTS.find((v) => v.id === character.data.humanVariant);

  return (
    <a
      href={`/characters/${character.id}`}
      className="block comic-panel transition-transform hover:scale-[1.01] hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-4 p-4">
        {/* Avatar */}
        <div className="w-16 h-16 border-2 border-accent/40 bg-card-bg shadow-[3px_3px_0_rgba(0,0,0,0.3)] overflow-hidden flex-shrink-0">
          {character.data.avatarUrl ? (
            <img
              src={character.data.avatarUrl}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl text-foreground tracking-wide">
            {character.data.alias || character.name}
          </h3>
          {character.data.alias && (
            <p className="text-xs text-muted">{character.name}</p>
          )}
          <p className="text-sm text-accent mt-1">
            {origin?.name ?? "Unknown Origin"} &middot;{" "}
            {variant?.name ?? "Unknown"}
          </p>
          <p className="text-xs text-muted mt-1">
            Level {character.data.level}
          </p>
        </div>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (confirm("Delete this character?")) {
              onDelete(character.id);
            }
          }}
          className="comic-btn bg-card-bg text-comic-red text-xs px-2 py-1 border-comic-red/50 flex-shrink-0"
        >
          Delete
        </button>
      </div>
    </a>
  );
}
