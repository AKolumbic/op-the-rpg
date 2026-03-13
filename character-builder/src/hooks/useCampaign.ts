"use client";

import { createClient } from "@/lib/supabase/client";
import type { Campaign, CampaignMember } from "@/lib/roles";
import type { Character } from "@/lib/types";

const supabase = createClient();

// ─── Campaign CRUD ──────────────────────────────────────────────────────────

export async function listMyCampaigns(): Promise<
  (Campaign & { role: string })[]
> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("campaign_members")
    .select("role, campaign:campaigns(*)")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    ...(row.campaign as unknown as Campaign),
    role: row.role,
  }));
}

export async function getCampaign(id: string): Promise<Campaign> {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Campaign;
}

export async function createCampaign(
  name: string,
  description: string
): Promise<Campaign> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("campaigns")
    .insert({ name, description, created_by: user.id })
    .select()
    .single();

  if (error) throw error;
  return data as Campaign;
}

export async function updateCampaign(
  id: string,
  name: string,
  description: string
): Promise<Campaign> {
  const { data, error } = await supabase
    .from("campaigns")
    .update({ name, description })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Campaign;
}

export async function deleteCampaign(id: string): Promise<void> {
  const { error } = await supabase.from("campaigns").delete().eq("id", id);
  if (error) throw error;
}

// ─── Membership ─────────────────────────────────────────────────────────────

export async function getCampaignMembers(
  campaignId: string
): Promise<CampaignMember[]> {
  const { data, error } = await supabase
    .from("campaign_members")
    .select("*, profile:profiles(id, display_name)")
    .eq("campaign_id", campaignId)
    .order("joined_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as unknown as CampaignMember[];
}

export async function joinCampaignByInvite(
  inviteCode: string
): Promise<string> {
  const { data, error } = await supabase.rpc("join_campaign_by_invite", {
    code: inviteCode,
  });

  if (error) throw error;
  return data as string;
}

export async function leaveCampaign(campaignId: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("campaign_members")
    .delete()
    .eq("campaign_id", campaignId)
    .eq("user_id", user.id);

  if (error) throw error;
}

export async function removeMember(
  campaignId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("campaign_members")
    .delete()
    .eq("campaign_id", campaignId)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function updateMemberRole(
  memberId: string,
  role: "gm" | "player"
): Promise<void> {
  const { error } = await supabase
    .from("campaign_members")
    .update({ role })
    .eq("id", memberId);

  if (error) throw error;
}

// ─── Characters in Campaigns ────────────────────────────────────────────────

export async function getCampaignCharacters(
  campaignId: string
): Promise<Character[]> {
  const { data, error } = await supabase
    .from("campaign_characters")
    .select("character:characters(*)")
    .eq("campaign_id", campaignId);

  if (error) throw error;
  return (data ?? []).map(
    (row) => row.character as unknown as Character
  );
}

export async function addCharacterToCampaign(
  campaignId: string,
  characterId: string
): Promise<void> {
  const { error } = await supabase
    .from("campaign_characters")
    .insert({ campaign_id: campaignId, character_id: characterId });

  if (error) throw error;
}

export async function removeCharacterFromCampaign(
  campaignId: string,
  characterId: string
): Promise<void> {
  const { error } = await supabase
    .from("campaign_characters")
    .delete()
    .eq("campaign_id", campaignId)
    .eq("character_id", characterId);

  if (error) throw error;
}

export async function regenerateInviteCode(
  campaignId: string
): Promise<string> {
  const newCode =
    Math.random().toString(36).substring(2, 8) +
    Math.random().toString(36).substring(2, 8);

  const { data, error } = await supabase
    .from("campaigns")
    .update({ invite_code: newCode })
    .eq("id", campaignId)
    .select("invite_code")
    .single();

  if (error) throw error;
  return data.invite_code;
}
