"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import BuilderWizard from "@/components/builder/BuilderWizard";

export default function NewCharacterPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/auth/sign-in");
    });
  }, [router]);

  return (
    <div className="min-h-screen pt-14">
      <Navbar />
      <BuilderWizard />
    </div>
  );
}
