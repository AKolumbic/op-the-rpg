"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/components/RoleProvider";
import { listMyCampaigns } from "@/hooks/useCampaign";
import type { Campaign } from "@/lib/roles";
import Navbar from "@/components/Navbar";

export default function CampaignsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useRole();
  const [campaigns, setCampaigns] = useState<(Campaign & { role: string })[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }
    listMyCampaigns()
      .then(setCampaigns)
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  return (
    <div className="min-h-screen pt-14">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl text-comic-cyan tracking-wide">
            Your Campaigns
          </h1>
          <div className="flex gap-2">
            <a
              href="/campaigns/join"
              className="comic-btn bg-comic-blue text-white text-sm"
            >
              Join Campaign
            </a>
            <a
              href="/campaigns/new"
              className="comic-btn bg-comic-red text-white text-sm"
            >
              New Campaign
            </a>
          </div>
        </div>

        {loading ? (
          <p className="text-muted font-display text-lg">Loading...</p>
        ) : campaigns.length === 0 ? (
          <div className="comic-panel text-center py-16 px-4 halftone relative">
            <div className="relative z-10">
              <p className="font-display text-2xl text-muted mb-2">
                No campaigns yet.
              </p>
              <p className="text-muted mb-6">
                Create a campaign to GM, or join one with an invite code.
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href="/campaigns/new"
                  className="comic-btn bg-comic-yellow text-black"
                >
                  Create Campaign
                </a>
                <a
                  href="/campaigns/join"
                  className="comic-btn bg-comic-blue text-white"
                >
                  Join with Code
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <a
                key={campaign.id}
                href={`/campaigns/${campaign.id}`}
                className="block comic-panel transition-transform hover:scale-[1.01] hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between p-4">
                  <div>
                    <h3 className="font-display text-xl text-foreground tracking-wide">
                      {campaign.name}
                    </h3>
                    {campaign.description && (
                      <p className="text-sm text-muted mt-1 line-clamp-2">
                        {campaign.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-display border-2 shadow-[2px_2px_0_rgba(0,0,0,0.1)] ${
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
      </main>
    </div>
  );
}
