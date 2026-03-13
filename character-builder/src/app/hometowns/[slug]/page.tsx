import { notFound } from "next/navigation";
import Link from "next/link";
import { getHometown, getHometowns } from "@/lib/content";
import ContentRenderer from "@/components/ContentRenderer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getHometowns().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hometown = getHometown(slug);
  if (!hometown) return { title: "Not Found" };
  return {
    title: `${hometown.name} — Where Are You From? — OP the RPG`,
    description: `Full details for ${hometown.name} in OP the RPG.`,
  };
}

export default async function HometownDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hometown = getHometown(slug);
  if (!hometown) notFound();

  // Prev/next
  const all = getHometowns();
  const idx = all.findIndex((h) => h.slug === hometown.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b-2 border-accent bg-card-bg/80 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center gap-4">
          <Link
            href="/"
            className="font-display text-accent text-lg hover:text-foreground transition-colors"
          >
            OP the RPG
          </Link>
          <span className="text-muted">/</span>
          <span className="font-display text-foreground/70 text-lg">
            Where Are You From?
          </span>
          <span className="text-muted">/</span>
          <span className="font-display text-foreground text-lg">
            {hometown.name}
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="halftone relative">
        <div className="bg-card-bg border-b-2 border-accent py-12 px-4 relative">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="comic-title text-foreground text-5xl sm:text-7xl drop-shadow-lg">
              {hometown.name}
            </h1>
            <p className="mt-2 text-muted text-sm font-semibold tracking-wide">
              Mapped from: {hometown.mappedFrom}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <ContentRenderer
          content={hometown.rawContent}
          accentColor="text-accent"
        />
      </section>

      {/* Prev / Next nav */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-center border-t-2 border-accent/30 pt-6">
          {prev ? (
            <Link
              href={`/hometowns/${prev.slug}`}
              className="comic-btn bg-card-bg text-foreground text-sm"
            >
              &larr; {prev.name}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/hometowns/${next.slug}`}
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
