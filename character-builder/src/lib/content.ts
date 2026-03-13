import fs from "fs";
import path from "path";

export interface ContentEntry {
  name: string;
  slug: string;
  mappedFrom: string;
  quote?: string;
  rawContent: string;
}

// Color accents for each entry (keyed by slug)
export const VARIANT_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  everyman:   { bg: "bg-comic-yellow", text: "text-black",  accent: "text-comic-yellow" },
  brute:      { bg: "bg-comic-red",    text: "text-white",  accent: "text-comic-red" },
  rascal:     { bg: "bg-comic-green",  text: "text-white",  accent: "text-comic-green" },
  savant:     { bg: "bg-comic-blue",   text: "text-white",  accent: "text-comic-blue" },
  roughneck:  { bg: "bg-comic-orange", text: "text-black",  accent: "text-comic-orange" },
  scion:      { bg: "bg-comic-purple", text: "text-white",  accent: "text-comic-purple" },
  ancient:    { bg: "bg-comic-cyan",   text: "text-black",  accent: "text-comic-cyan" },
  elemental:  { bg: "bg-comic-magenta",text: "text-white",  accent: "text-comic-magenta" },
  cursed:     { bg: "bg-comic-red",    text: "text-white",  accent: "text-comic-red" },
};

export const ORIGIN_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  bereaved:   { bg: "bg-comic-red",     text: "text-white", accent: "text-comic-red" },
  celebrity:  { bg: "bg-comic-yellow",  text: "text-black", accent: "text-comic-yellow" },
  chosen:     { bg: "bg-comic-cyan",    text: "text-black", accent: "text-comic-cyan" },
  shifter:    { bg: "bg-comic-green",   text: "text-white", accent: "text-comic-green" },
  soldier:    { bg: "bg-comic-blue",    text: "text-white", accent: "text-comic-blue" },
  disciple:   { bg: "bg-comic-orange",  text: "text-black", accent: "text-comic-orange" },
  oathsworn:  { bg: "bg-comic-yellow",  text: "text-black", accent: "text-comic-yellow" },
  hunter:     { bg: "bg-comic-orange",  text: "text-black", accent: "text-comic-orange" },
  scoundrel:  { bg: "bg-comic-purple",  text: "text-white", accent: "text-comic-purple" },
  mutant:     { bg: "bg-comic-magenta", text: "text-white", accent: "text-comic-magenta" },
  pactbound:  { bg: "bg-comic-red",     text: "text-white", accent: "text-comic-red" },
  genius:     { bg: "bg-comic-cyan",    text: "text-black", accent: "text-comic-cyan" },
};

// Short taglines for index pages
export const VARIANT_TAGLINES: Record<string, string> = {
  everyman:  "No powers. Just drive.",
  brute:     "Big. Tough. Unstoppable.",
  rascal:    "Quick, cunning, lucky.",
  savant:    "Sharpest mind in the room.",
  roughneck: "Survived what you can't imagine.",
  scion:     "Born into power.",
  ancient:   "Older than they look.",
  elemental: "Forces of nature, incarnate.",
  cursed:    "Something is wrong with you.",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/^the /, "")
    .replace(/\s+/g, "-");
}

function parseEntries(markdown: string, skipSections: string[]): ContentEntry[] {
  const sections = markdown.split(/\n---\n/);
  const entries: ContentEntry[] = [];

  for (const section of sections) {
    const headerMatch = section.match(/^##\s+(.+)$/m);
    if (!headerMatch) continue;

    const name = headerMatch[1].trim();
    if (skipSections.some((s) => name.startsWith(s))) continue;

    const mappedMatch = section.match(/\*Mapped from:\s*(.+)\*/);
    const mappedFrom = mappedMatch ? mappedMatch[1].trim() : "";

    const quoteMatch = section.match(/\*\*"(.+?)"\*\*/);
    const quote = quoteMatch ? quoteMatch[1] : undefined;

    // Get content after header, mapping line, and quote
    let content = section;
    content = content.replace(/^##\s+.+$/m, "");
    content = content.replace(/\*Mapped from:.+\*/, "");
    if (quote) {
      content = content.replace(/\*\*".+?"\*\*/, "");
    }
    content = content.trim();

    entries.push({
      name,
      slug: slugify(name),
      mappedFrom,
      quote,
      rawContent: content,
    });
  }

  return entries;
}

export function getVariants(): ContentEntry[] {
  const filePath = path.join(process.cwd(), "..", "human-variants.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return parseEntries(content, ["Summary", "Design Notes"]);
}

export function getOrigins(): ContentEntry[] {
  const filePath = path.join(process.cwd(), "..", "origin-stories.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return parseEntries(content, ["Summary", "Design Notes", "Multiclassing"]);
}

export function getHometowns(): ContentEntry[] {
  const filePath = path.join(process.cwd(), "..", "home-towns.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return parseEntries(content, ["Summary", "Design Notes", "Parts of a Home Town"]);
}

export function getVariant(slug: string): ContentEntry | undefined {
  return getVariants().find((v) => v.slug === slug);
}

export function getOrigin(slug: string): ContentEntry | undefined {
  return getOrigins().find((o) => o.slug === slug);
}

export function getHometown(slug: string): ContentEntry | undefined {
  return getHometowns().find((h) => h.slug === slug);
}
