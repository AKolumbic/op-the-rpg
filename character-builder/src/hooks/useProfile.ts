"use client";

import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/roles";

const supabase = createClient();

export async function getProfile(): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data as Profile;
}

export async function updateProfile(displayName: string): Promise<Profile> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .update({ display_name: displayName })
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function setUserAdmin(
  userId: string,
  isAdmin: boolean
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .update({ is_admin: isAdmin })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}
