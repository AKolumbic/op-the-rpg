"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRole } from "@/components/RoleProvider";
import { joinCampaignByInvite } from "@/hooks/useCampaign";
import Navbar from "@/components/Navbar";

function JoinForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useRole();
  const [code, setCode] = useState(searchParams.get("code") ?? "");
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/sign-in");
    }
  }, [user, authLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setJoining(true);
    setError("");
    try {
      const campaignId = await joinCampaignByInvite(code.trim());
      router.push(`/campaigns/${campaignId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid invite code");
      setJoining(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="code"
          className="block font-display tracking-wide mb-2"
        >
          Invite Code
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste the invite code here"
          className="w-full px-4 py-3 bg-card-bg border-3 border-accent focus:outline-none text-xl font-display tracking-widest text-center shadow-[4px_4px_0_#000] uppercase"
          autoFocus
        />
        <p className="text-xs text-muted mt-2">
          Ask your GM for the campaign invite code.
        </p>
      </div>

      {error && (
        <p className="text-comic-red text-sm font-semibold">{error}</p>
      )}

      <div className="flex justify-between">
        <a
          href="/campaigns"
          className="comic-btn bg-card-bg text-foreground/70"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={!code.trim() || joining}
          className="comic-btn bg-comic-green text-black disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {joining ? "Joining..." : "Join Campaign"}
        </button>
      </div>
    </form>
  );
}

export default function JoinCampaignPage() {
  return (
    <div className="min-h-screen pt-14">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-8">
        <h1 className="font-display text-3xl text-comic-cyan tracking-wide mb-6">
          Join a Campaign
        </h1>
        <Suspense
          fallback={
            <p className="text-muted font-display">Loading...</p>
          }
        >
          <JoinForm />
        </Suspense>
      </main>
    </div>
  );
}
