"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { listCharacters, deleteCharacter } from "@/hooks/useCharacter";
import { listMyCampaigns } from "@/hooks/useCampaign";
import type { Character } from "@/lib/types";
import type { Campaign } from "@/lib/roles";
import Navbar from "@/components/Navbar";
import CharacterCard from "@/components/CharacterCard";

export default function DashboardPage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [campaigns, setCampaigns] = useState<(Campaign & { role: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/sign-in");
        return;
      }
      Promise.all([listCharacters(), listMyCampaigns()]).then(
        ([chars, camps]) => {
          setCharacters(chars);
          setCampaigns(camps);
          setLoading(false);
        }
      );
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

        {/* Campaigns Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl text-comic-blue tracking-wide">
              Your Campaigns
            </h2>
            <a
              href="/campaigns"
              className="font-display text-sm text-foreground/70 hover:text-accent transition-colors tracking-wide"
            >
              View All
            </a>
          </div>

          {loading ? null : campaigns.length === 0 ? (
            <div className="comic-panel p-6 text-center">
              <p className="text-muted mb-3">No campaigns yet.</p>
              <div className="flex justify-center gap-3">
                <a
                  href="/campaigns/new"
                  className="comic-btn bg-comic-red text-white text-sm"
                >
                  Create Campaign
                </a>
                <a
                  href="/campaigns/join"
                  className="comic-btn bg-comic-blue text-white text-sm"
                >
                  Join with Code
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {campaigns.slice(0, 3).map((campaign) => (
                <a
                  key={campaign.id}
                  href={`/campaigns/${campaign.id}`}
                  className="block comic-panel p-4 transition-transform hover:scale-[1.01] hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg tracking-wide">
                      {campaign.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-display border-2 shadow-[1px_1px_0_rgba(0,0,0,0.1)] ${
                        campaign.role === "gm"
                          ? "border-comic-red/40 bg-comic-red/10 text-comic-red"
                          : "border-comic-blue/40 bg-comic-blue/10 text-comic-blue"
                      }`}
                    >
                      {campaign.role === "gm" ? "GM" : "Player"}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
