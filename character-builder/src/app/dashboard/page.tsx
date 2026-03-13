"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { listCharacters, deleteCharacter } from "@/hooks/useCharacter";
import type { Character } from "@/lib/types";
import Navbar from "@/components/Navbar";
import CharacterCard from "@/components/CharacterCard";

export default function DashboardPage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/sign-in");
        return;
      }
      listCharacters().then((chars) => {
        setCharacters(chars);
        setLoading(false);
      });
    });
  }, [router]);

  async function handleDelete(id: string) {
    await deleteCharacter(id);
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="min-h-screen pt-14">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl text-comic-cyan tracking-wide">
            Your Characters
          </h1>
          <a
            href="/characters/new"
            className="comic-btn bg-comic-red text-white"
          >
            New Character
          </a>
        </div>

        {loading ? (
          <p className="text-muted font-display text-lg">Loading...</p>
        ) : characters.length === 0 ? (
          <div className="comic-panel text-center py-16 px-4 halftone relative">
            <div className="relative z-10">
              <p className="font-display text-2xl text-muted mb-4">No characters yet.</p>
              <a
                href="/characters/new"
                className="comic-btn bg-comic-yellow text-black inline-block"
              >
                Create Your First Hero
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
