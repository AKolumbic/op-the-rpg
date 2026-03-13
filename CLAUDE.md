# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OP the RPG is a tabletop RPG (TTRPG) set in an alternate 20th century (no 21st century tech) unnamed country resembling the USA. It's a superhero setting built mechanically on the **SRD 5.2** (based on D&D 5.5e) chassis. Every fantasy element is reflavored for a comic book/superhero genre. All player characters are human. Levels 1-12 only.

## Core Design Principles

- **Narrative-first, mechanical-second.** Player-facing concepts are genre-appropriate names and stories. SRD mechanics run underneath but are never the primary identity.
- **1:1 SRD 5.2 mapping.** Every Origin Story maps to an SRD class, every Human Variant maps to an SRD species, every Home Town maps to an SRD background. Mechanical foundations stay intact; fiction changes.
- **Spellcasting is always reflavored as "Powers."** Never call it "magic" or "spellcasting" in player-facing content. The umbrella term is **Powers** ("What's your Powers?"). Each Origin reflavors Powers differently: The Genius uses Inventions. The Mutant expresses Innate Abilities. The Chosen channels Channeled Power. The Pactbound draws on Granted Power. The Celebrity leverages Connections. The Shifter taps Instinctual Abilities. The Oathsworn wields Oath-Powered Abilities. The Hunter relies on Preparation & Tactics.
- **Ambiguous divinity.** The system deliberately does not confirm whether gods or cosmic forces exist. Power sources are real and measurable; their origins are unconfirmed.
- **All variants are human.** No fantasy species. Genetic diversity, bloodlines, mutations, and unexplained traits explain mechanical differences. "Darkvision" is always "Low-Light Awareness."

## Document Structure

### Game Documents (root)

Each markdown file covers one pillar of character creation:

| File | Covers | SRD Equivalent |
|------|--------|----------------|
| `origin-stories.md` | 12 Origin Stories (classes), multiclassing rules | SRD 5.2 Classes |
| `human-variants.md` | 9 Human Variants (species/races) | SRD 5.2 Species |
| `home-towns.md` | 4 Home Towns (backgrounds) | SRD 5.2 Backgrounds |
| `feats.md` | Feat categories, progression, current feat pool | SRD 5.2 Feats |
| `skills.md` | 18 skills (5 renamed/replaced from SRD) | SRD 5.2 Skills |
| `SRD_CC_v5.2.1.pdf` | SRD 5.2.1 reference (CC-licensed) | — |
| `adventures/` | Adventure modules (e.g. issue-1-blackout.md) | — |

### Character Builder (`character-builder/`)

A Next.js web app deployed on Vercel. Monorepo structure with `character-builder/` as the Vercel root directory.

**Tech stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase (auth + database)

**Character creation wizard flow** (maps to the question theme):
1. **Who are you?** → Human Variant selection (`StepHumanVariant`)
2. **What's your Story?** → Origin Story selection (`StepOriginStory`)
3. **Where'd you Come from?** → Home Town selection (`StepHomeTown`)
4. **What's your Powers?** → Ability Scores, Feats & Skills (`StepAbilityScores`, `StepFeatsAndSkills`)
5. **Details** → Name, alias, narrative prompts (`StepDetails`)

**Key data files (`src/data/`):**

| File | Contents |
|------|----------|
| `origin-stories.ts` | 12 Origin Story definitions (id, name, quote, description, archetype) |
| `origin-story-features.ts` | Types + combined export of all Origin Powers (levels 1-12) |
| `_origin-features-group1.ts` | Powers data: Bereaved, Celebrity, Chosen, Shifter |
| `_origin-features-group2.ts` | Powers data: Soldier, Disciple, Oathsworn, Hunter |
| `_origin-features-group3.ts` | Powers data: Scoundrel, Mutant, Pactbound, Genius |
| `human-variants.ts` | 9 Human Variant definitions with sub-choices |
| `home-towns.ts` | 4 Home Town definitions with ability bonuses & features |
| `feats.ts` | Feat definitions (origin, general, fighting-style categories) |
| `skills.ts` | 18 skills mapped to 6 ability scores |
| `ability-scores.ts` | Standard Array, Point Buy system, score definitions |

**Other key files:**
- `src/lib/types.ts` — Core types: `CharacterData`, `AbilityScoreSet`, `NarrativeResponses`
- `src/lib/content.ts` — Markdown parser for game docs (used on content pages, not the builder)
- `src/hooks/useCharacter.ts` — CRUD operations for characters via Supabase
- `scripts/copy-content.js` — Prebuild script that copies markdown to `content/` for Vercel

## Key Terminology Mappings

When writing or editing content, always use OP terminology:

| SRD 5.2 Term | OP Term |
|---|---|
| Class | Origin Story |
| Species/Race | Human Variant |
| Background | Home Town |
| Arcana (skill) | Science |
| Religion (skill) | Lore |
| Insight (skill) | Intuition |
| Animal Handling (skill) | Urban |
| Nature (skill) | Wilderness |
| Survival (skill) | Wilderness (merged with Nature) |
| Spellcasting | Powers |
| Darkvision | Low-Light Awareness |

## Naming Conventions

- Origin Story names start with "The" (The Bereaved, The Soldier, The Genius)
- Human Variant names are single words, genre-appropriate (Brute, Rascal, Scion, Roughneck)
- Home Town names start with "The" and describe a place archetype (The Small Town, The Capitol)
- Home Towns are archetypes, never proper nouns for specific cities
- The country is deliberately unnamed

## Document Format Conventions

Each entry within a file follows a consistent structure:
- SRD mapping noted with `*Mapped from: SRD 5.2 [original]*`
- Flavor quote in bold
- Narrative description
- **Archetype** line with comic book/superhero comparisons
- **Core Mechanics (SRD)** listing the underlying mechanical features
- **Design Notes** at end of each file for system-wide design rationale

## Completed Milestones

- **Origin Story Powers (levels 1-12)** are fully built out for all 12 origins. Data lives in `_origin-features-group1/2/3.ts`, combined via `origin-story-features.ts`. Each origin has core traits, Powers info, scaling columns, and level-by-level features reflavored for the superhero setting.
- **Character builder wizard** is functional end-to-end with Supabase persistence and Vercel deployment.

## Known Gaps and Development Priorities

1. **Feat pool is undersized.** ~12 feats exist across origin, general, and fighting-style categories. Target is 100+ feats: General Half-Feats, Origin-specific Feats, Home Town Feats, and tiered Power Feats.
2. **Only 4 Home Towns exist.** Planned expansions: The Harbor, The Frontier, The Estate, The Underground, and more.
3. **Subclasses not yet written.** Each Origin Story needs subclass equivalents ("sub-origins" or "story branches"). Stub entries exist in the Powers data.
4. **Feat progression timing** (which levels grant the 3 half-feat picks) is TBD.
5. **Level-up feats must be half-feats** (include +1 ability score). Standalone ASI picks are excluded by design. Epic Boons are cut (no level 19+).
6. **Powers UI not yet built.** The Origin Story Powers data exists but has no UI in the character builder yet.
