"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/components/RoleProvider";
import { createCampaign } from "@/hooks/useCampaign";
import Navbar from "@/components/Navbar";

export default function NewCampaignPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useRole();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!authLoading && !user) {
    router.push("/auth/sign-in");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setError("");
    try {
      const campaign = await createCampaign(name.trim(), description.trim());
      router.push(`/campaigns/${campaign.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create campaign");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen pt-14">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl text-comic-cyan tracking-wide mb-6">
          New Campaign
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block font-display tracking-wide mb-2"
            >
              Campaign Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Ironside Files"
              className="w-full px-4 py-3 bg-card-bg border-3 border-accent focus:outline-none text-xl font-display tracking-wide shadow-[4px_4px_0_#000]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-display tracking-wide mb-2"
            >
              Description{" "}
              <span className="text-muted text-sm">(optional)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this campaign about?"
              rows={4}
              className="w-full px-4 py-3 bg-card-bg border-3 border-accent focus:outline-none text-sm shadow-[4px_4px_0_#000] resize-none"
            />
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
              disabled={!name.trim() || saving}
              className="comic-btn bg-comic-red text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {saving ? "Creating..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
