export interface Profile {
  id: string;
  display_name: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  invite_code: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type CampaignRole = "gm" | "player";

export interface CampaignMember {
  id: string;
  campaign_id: string;
  user_id: string;
  role: CampaignRole;
  joined_at: string;
  profile?: Pick<Profile, "id" | "display_name">;
}

export interface CampaignCharacter {
  campaign_id: string;
  character_id: string;
}

// Permission helpers — mirror RLS logic for optimistic UI decisions

export function isGM(members: CampaignMember[], userId: string): boolean {
  return members.some((m) => m.user_id === userId && m.role === "gm");
}

export function isMember(members: CampaignMember[], userId: string): boolean {
  return members.some((m) => m.user_id === userId);
}

export function canManageCampaign(
  campaign: Campaign,
  userId: string,
  isAdmin: boolean
): boolean {
  return campaign.created_by === userId || isAdmin;
}

export function canManageMembers(
  members: CampaignMember[],
  userId: string,
  isAdmin: boolean
): boolean {
  return isGM(members, userId) || isAdmin;
}
