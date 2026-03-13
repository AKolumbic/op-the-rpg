import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrigin, getOrigins, ORIGIN_COLORS } from "@/lib/content";
import ContentRenderer from "@/components/ContentRenderer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getOrigins().map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const origin = getOrigin(slug);
  if (!origin) return { title: "Not Found" };
  return {
    title: `${origin.name} — Origin Story — OP the RPG`,
    description: origin.quote
      ? `"${origin.quote}" — ${origin.name} in OP the RPG.`
      : `Full details for ${origin.name} in OP the RPG.`,
  };
}

export default async function OriginDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const origin = getOrigin(slug);
  if (!origin) notFound();

  const colors = ORIGIN_COLORS[origin.slug] || {
    bg: "bg-accent",
    text: "text-black",
    accent: "text-accent",
  };

  // Prev/next
  const all = getOrigins();
  const idx = all.findIndex((o) => o.slug === origin.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b-2 border-accent bg-card-bg/80 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center gap-4">
          <Link
            href="/"
            className="font-display text-accent text-lg hover:text-comic-yellow transition-colors"
          >
            OP the RPG
          </Link>
          <span className="text-muted">/</span>
          <Link
            href="/origins"
            className="font-display text-foreground/70 text-lg hover:text-foreground transition-colors"
          >
            Origins
          </Link>
          <span className="text-muted">/</span>
          <span className="font-display text-foreground text-lg">
            {origin.name}
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="halftone-dense relative">
        <div className={`${colors.bg} py-12 px-4 relative`}>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="comic-title text-white text-5xl sm:text-7xl drop-shadow-lg">
              {origin.name}
            </h1>
            {origin.quote && (
              <div className="speech-bubble inline-block mt-6">
                <p className="font-display text-xl sm:text-2xl">
                  &ldquo;{origin.quote}&rdquo;
                </p>
              </div>
            )}
            <p className="mt-4 text-white/70 text-sm font-semibold tracking-wide">
              Mapped from: {origin.mappedFrom}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <ContentRenderer
          content={origin.rawContent}
          accentColor={colors.accent}
        />
      </section>

      {/* Prev / Next nav */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-center border-t-2 border-accent/30 pt-6">
          {prev ? (
            <Link
              href={`/origins/${prev.slug}`}
              className="comic-btn bg-card-bg text-foreground text-sm"
            >
              &larr; {prev.name}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/origins/${next.slug}`}
              className="comic-btn bg-card-bg text-foreground text-sm"
            >
              {next.name} &rarr;
            </Link>
          ) : (
            <div />
          )}
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
