"use client";

import { createClient } from "@/lib/supabase/client";
import type { Character, CharacterData } from "@/lib/types";

const supabase = createClient();

export async function listCharacters(): Promise<Character[]> {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Character[];
}

export async function getCharacter(id: string): Promise<Character> {
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Character;
}

export async function createCharacter(
  name: string,
  data: CharacterData
): Promise<Character> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: character, error } = await supabase
    .from("characters")
    .insert({ user_id: user.id, name, data })
    .select()
    .single();

  if (error) throw error;
  return character as Character;
}

export async function updateCharacter(
  id: string,
  name: string,
  data: CharacterData
): Promise<Character> {
  const { data: character, error } = await supabase
    .from("characters")
    .update({ name, data })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return character as Character;
}

export async function deleteCharacter(id: string): Promise<void> {
  const { error } = await supabase.from("characters").delete().eq("id", id);
  if (error) throw error;
}
