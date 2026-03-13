import Link from "next/link";
import { getVariants, VARIANT_COLORS, VARIANT_TAGLINES } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who Are You? — OP the RPG",
  description: "All 9 options in OP the RPG. All human, all different.",
};

export default function VariantsIndex() {
  const variants = getVariants();

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b-2 border-accent bg-card-bg/80 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center gap-4">
          <Link href="/" className="font-display text-accent text-lg hover:text-comic-yellow transition-colors">
            OP the RPG
          </Link>
          <span className="text-muted">/</span>
          <span className="font-display text-foreground text-lg">Who Are You?</span>
        </div>
      </nav>

      {/* Header */}
      <section className="halftone py-16 px-4 text-center relative">
        <div className="relative z-10">
          <h1 className="comic-title text-comic-cyan text-5xl sm:text-7xl mb-4">
            Who Are You?
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            All player characters in OP are human. These represent natural human diversity
            — genetics, upbringing, physiology, and temperament. This is who you are{" "}
            <em>before</em> your Origin Story gives you powers.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map((v) => {
            const colors = VARIANT_COLORS[v.slug] || { bg: "bg-accent", text: "text-black", accent: "text-accent" };
            const tagline = VARIANT_TAGLINES[v.slug] || "";
            return (
              <Link
                key={v.slug}
                href={`/variants/${v.slug}`}
                className="comic-panel transition-transform hover:scale-105 hover:-translate-y-1 block"
              >
                <div className={`${colors.bg} ${colors.text} px-4 py-3`}>
                  <h2 className="font-display text-2xl tracking-wide">{v.name}</h2>
                </div>
                <div className="px-4 py-4">
                  <p className="text-foreground/80 text-sm mb-2">{tagline}</p>
                  <p className="text-muted text-xs">
                    Mapped from: {v.mappedFrom}
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
