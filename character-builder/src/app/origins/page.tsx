import Link from "next/link";
import { getOrigins, ORIGIN_COLORS } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origin Stories — OP the RPG",
  description: "All 12 Origin Stories in OP the RPG. What happened to you matters more than what you can do.",
};

export default function OriginsIndex() {
  const origins = getOrigins();

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b-2 border-accent bg-card-bg/80 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center gap-4">
          <Link href="/" className="font-display text-accent text-lg hover:text-comic-yellow transition-colors">
            OP the RPG
          </Link>
          <span className="text-muted">/</span>
          <span className="font-display text-foreground text-lg">Origin Stories</span>
        </div>
      </nav>

      {/* Header */}
      <section className="halftone-dense diagonal-stripes py-16 px-4 text-center relative">
        <div className="relative z-10">
          <h1 className="comic-title text-comic-magenta text-5xl sm:text-7xl mb-4">
            Origin Stories
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Origin Stories represent what happened to your character — the defining event
            that set them on the path to becoming a hero. Each maps mechanically to an SRD 5.2
            class, but the player-facing identity is purely narrative.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {origins.map((o) => {
            const colors = ORIGIN_COLORS[o.slug] || { bg: "bg-accent", text: "text-black", accent: "text-accent" };
            return (
              <Link
                key={o.slug}
                href={`/origins/${o.slug}`}
                className="comic-panel transition-transform hover:scale-105 hover:-translate-y-1 block"
              >
                <div className={`${colors.bg} ${colors.text} px-4 py-3`}>
                  <h2 className="font-display text-2xl tracking-wide">{o.name}</h2>
                </div>
                <div className="px-4 py-4">
                  {o.quote && (
                    <p className={`font-display text-lg ${colors.accent} mb-2 leading-snug`}>
                      &ldquo;{o.quote}&rdquo;
                    </p>
                  )}
                  <p className="text-muted text-xs">
                    Mapped from: {o.mappedFrom}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-accent py-8 text-center">
        <p className="font-display text-lg text-foreground/60 tracking-wide">
          OP the RPG &middot; Built on the SRD 5.2
        </p>
      </footer>
    </div>
  );
}
