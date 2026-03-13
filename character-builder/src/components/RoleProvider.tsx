"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getProfile } from "@/hooks/useProfile";
import type { Profile } from "@/lib/roles";
import type { User } from "@supabase/supabase-js";

interface RoleContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const RoleContext = createContext<RoleContextValue>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export function useRole() {
  return useContext(RoleContext);
}

export default function RoleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const supabase = createClient();
    const {
      data: { user: u },
    } = await supabase.auth.getUser();
    setUser(u);

    if (u) {
      const p = await getProfile();
      setProfile(p);
    } else {
      setProfile(null);
    }

    setLoading(false);
  }

  async function refreshProfile() {
    const p = await getProfile();
    setProfile(p);
  }

  useEffect(() => {
    load();

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <RoleContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </RoleContext.Provider>
  );
}
