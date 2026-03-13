"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRole } from "@/components/RoleProvider";
import {
  getCampaign,
  getCampaignMembers,
  getCampaignCharacters,
  removeMember,
  updateMemberRole,
  removeCharacterFromCampaign,
  addCharacterToCampaign,
  regenerateInviteCode,
  deleteCampaign,
  leaveCampaign,
} from "@/hooks/useCampaign";
import { listCharacters } from "@/hooks/useCharacter";
import { isGM } from "@/lib/roles";
import type { Campaign, CampaignMember } from "@/lib/roles";
import type { Character } from "@/lib/types";
import { ORIGIN_STORIES } from "@/data/origin-stories";
import { HUMAN_VARIANTS } from "@/data/human-variants";
import Navbar from "@/components/Navbar";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile, loading: authLoading } = useRole();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [members, setMembers] = useState<CampaignMember[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [myCharacters, setMyCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddChar, setShowAddChar] = useState(false);
  const [copied, setCopied] = useState(false);

  const campaignId = params.id as string;
  const userIsGM = user ? isGM(members, user.id) : false;
  const isAdmin = profile?.is_admin ?? false;
  const canManage = userIsGM || isAdmin;

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }
    loadAll();
  }, [user, authLoading, campaignId]);

  async function loadAll() {
    try {
      const [c, m, chars] = await Promise.all([
        getCampaign(campaignId),
        getCampaignMembers(campaignId),
        getCampaignCharacters(campaignId),
      ]);
      setCampaign(c);
      setMembers(m);
      setCharacters(chars);
    } catch {
      router.push("/campaigns");
      return;
    }
    setLoading(false);
  }

  async function handleCopyInvite() {
    if (!campaign) return;
    await navigator.clipboard.writeText(campaign.invite_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleRegenCode() {
    if (!campaign) return;
    const newCode = await regenerateInviteCode(campaign.id);
    setCampaign({ ...campaign, invite_code: newCode });
  }

  async function handleRemoveMember(userId: string) {
    if (!confirm("Remove this member from the campaign?")) return;
    await removeMember(campaignId, userId);
    setMembers((prev) => prev.filter((m) => m.user_id !== userId));
  }

  async function handleToggleRole(member: CampaignMember) {
    const newRole = member.role === "gm" ? "player" : "gm";
    await updateMemberRole(member.id, newRole);
    setMembers((prev) =>
      prev.map((m) => (m.id === member.id ? { ...m, role: newRole } : m))
    );
  }

  async function handleRemoveCharacter(characterId: string) {
    if (!confirm("Remove this character from the campaign?")) return;
    await removeCharacterFromCampaign(campaignId, characterId);
    setCharacters((prev) => prev.filter((c) => c.id !== characterId));
  }

  async function handleAddCharacter(characterId: string) {
    await addCharacterToCampaign(campaignId, characterId);
    const char = myCharacters.find((c) => c.id === characterId);
    if (char) setCharacters((prev) => [...prev, char]);
    setShowAddChar(false);
  }

  async function handleOpenAddChar() {
    const mine = await listCharacters();
    const alreadyIn = new Set(characters.map((c) => c.id));
    setMyCharacters(mine.filter((c) => !alreadyIn.has(c.id)));
    setShowAddChar(true);
  }

  async function handleLeaveCampaign() {
    if (!confirm("Leave this campaign? Your characters will be removed.")) return;
    await leaveCampaign(campaignId);
    router.push("/campaigns");
  }

  async function handleDeleteCampaign() {
    if (!confirm("Delete this entire campaign? This cannot be undone.")) return;
    await deleteCampaign(campaignId);
    router.push("/campaigns");
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-14">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-muted font-display text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  return (
    <div className="min-h-screen pt-14">
      <Navbar />

      {/* Header */}
      <div className="bg-comic-blue halftone relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="comic-title text-white text-3xl sm:text-4xl">
                {campaign.name}
              </h1>
              {campaign.description && (
                <p className="text-white/70 mt-2 max-w-xl">
                  {campaign.description}
                </p>
              )}
              <p className="font-display text-white/50 text-sm mt-2">
                {members.length} member{members.length !== 1 ? "s" : ""} &middot;{" "}
                {characters.length} character{characters.length !== 1 ? "s" : ""}
              </p>
            </div>
            <a
              href="/campaigns"
              className="comic-btn bg-card-bg text-foreground text-sm"
            >
              All Campaigns
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Invite Code (GM/Admin only) */}
        {canManage && (
          <div className="comic-panel p-4">
            <h2 className="font-display text-xs text-muted tracking-widest uppercase mb-2">
              Invite Code
            </h2>
            <div className="flex items-center gap-3">
              <code className="text-xl font-display tracking-[0.3em] text-accent bg-background px-4 py-2 border-2 border-accent/30 shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
                {campaign.invite_code}
              </code>
              <button
                onClick={handleCopyInvite}
                className="comic-btn bg-card-bg text-foreground text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleRegenCode}
                className="comic-btn bg-card-bg text-foreground/50 text-sm"
              >
                Regenerate
              </button>
            </div>
            <p className="text-xs text-muted mt-2">
              Share this code with players so they can join.
            </p>
          </div>
        )}

        {/* Members */}
        <div className="comic-panel p-4">
          <h2 className="font-display text-xs text-muted tracking-widest uppercase mb-3">
            Members
          </h2>
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 border-2 border-card-border bg-background shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 text-xs font-display border-2 shadow-[1px_1px_0_rgba(0,0,0,0.1)] ${
                      member.role === "gm"
                        ? "border-comic-red/40 bg-comic-red/10 text-comic-red"
                        : "border-comic-blue/40 bg-comic-blue/10 text-comic-blue"
                    }`}
                  >
                    {member.role === "gm" ? "GM" : "Player"}
                  </span>
                  <span className="font-display text-sm tracking-wide">
                    {member.profile?.display_name || "Unknown"}
                  </span>
                  {member.user_id === user?.id && (
                    <span className="text-xs text-muted">(you)</span>
                  )}
                </div>

                {canManage && member.user_id !== user?.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleRole(member)}
                      className="text-xs text-muted hover:text-accent transition-colors font-display"
                    >
                      {member.role === "gm" ? "Demote" : "Promote"}
                    </button>
                    <button
                      onClick={() => handleRemoveMember(member.user_id)}
                      className="text-xs text-comic-red hover:text-comic-red/70 transition-colors font-display"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Characters */}
        <div className="comic-panel p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-display text-xs text-muted tracking-widest uppercase">
              Characters
            </h2>
            <button
              onClick={handleOpenAddChar}
              className="comic-btn bg-comic-green text-black text-sm"
            >
              Add Character
            </button>
          </div>

          {characters.length === 0 ? (
            <p className="text-muted text-sm py-4 text-center">
              No characters assigned yet. Add one of your characters to this
              campaign.
            </p>
          ) : (
            <div className="space-y-2">
              {characters.map((char) => {
                const origin = ORIGIN_STORIES.find(
                  (o) => o.id === char.data.originStory
                );
                const variant = HUMAN_VARIANTS.find(
                  (v) => v.id === char.data.humanVariant
                );
                const isOwner = char.user_id === user?.id;

                return (
                  <div
                    key={char.id}
                    className="flex items-center justify-between p-3 border-2 border-card-border bg-background shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
                  >
                    <a
                      href={`/characters/${char.id}`}
                      className="flex items-center gap-3 flex-1 min-w-0 hover:text-accent transition-colors"
                    >
                      {char.data.avatarUrl && (
                        <div className="w-10 h-10 border-2 border-accent/30 overflow-hidden flex-shrink-0">
                          <img
                            src={char.data.avatarUrl}
                            alt={char.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-display text-sm tracking-wide truncate">
                          {char.data.alias || char.name}
                        </p>
                        <p className="text-xs text-muted">
                          Lv {char.data.level} {variant?.name}{" "}
                          {origin?.name}
                        </p>
                      </div>
                    </a>

                    {(isOwner || canManage) && (
                      <button
                        onClick={() => handleRemoveCharacter(char.id)}
                        className="text-xs text-comic-red hover:text-comic-red/70 transition-colors font-display flex-shrink-0 ml-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          {!userIsGM && (
            <button
              onClick={handleLeaveCampaign}
              className="comic-btn bg-card-bg text-comic-red text-sm border-comic-red/50"
            >
              Leave Campaign
            </button>
          )}
          {canManage && (
            <button
              onClick={handleDeleteCampaign}
              className="comic-btn bg-comic-red text-white text-sm ml-auto"
            >
              Delete Campaign
            </button>
          )}
        </div>
      </main>

      {/* Add Character Modal */}
      {showAddChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowAddChar(false)}
          />
          <div className="relative z-10 w-full max-w-md max-h-[80vh] overflow-y-auto mx-4 bg-background border-3 border-accent shadow-[6px_6px_0_#000] p-6">
            <h2 className="font-display text-xl text-accent tracking-wide mb-4">
              Add a Character
            </h2>

            {myCharacters.length === 0 ? (
              <div>
                <p className="text-muted text-sm mb-4">
                  All your characters are already in this campaign, or you
                  haven&apos;t created any yet.
                </p>
                <a
                  href="/characters/new"
                  className="comic-btn bg-comic-yellow text-black text-sm"
                >
                  Create Character
                </a>
              </div>
            ) : (
              <div className="space-y-2">
                {myCharacters.map((char) => {
                  const origin = ORIGIN_STORIES.find(
                    (o) => o.id === char.data.originStory
                  );
                  return (
                    <button
                      key={char.id}
                      onClick={() => handleAddCharacter(char.id)}
                      className="w-full text-left p-3 border-2 border-card-border bg-card-bg hover:border-accent transition-all shadow-[2px_2px_0_rgba(0,0,0,0.2)]"
                    >
                      <p className="font-display text-sm tracking-wide">
                        {char.data.alias || char.name}
                      </p>
                      <p className="text-xs text-muted">
                        Lv {char.data.level} {origin?.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setShowAddChar(false)}
              className="comic-btn bg-card-bg text-foreground/70 text-sm mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
