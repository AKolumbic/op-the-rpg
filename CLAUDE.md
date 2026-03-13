# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OP the RPG is a tabletop RPG (TTRPG) set in an alternate 20th century (no 21st century tech) unnamed country resembling the USA. It's a superhero setting built mechanically on the **SRD 5.2** (based on D&D 5.5e) chassis. Every fantasy element is reflavored for a comic book/superhero genre. All player characters are human. Levels 1-12 only.

## Core Design Principles

- **Narrative-first, mechanical-second.** Player-facing concepts are genre-appropriate names and stories. SRD mechanics run underneath but are never the primary identity.
- **1:1 SRD 5.2 mapping.** Every Origin Story maps to an SRD class, every Human Variant maps to an SRD species, every Home Town maps to an SRD background. Mechanical foundations stay intact; fiction changes.
- **Spellcasting is always reflavored.** Never call it "magic" without context. The Genius uses inventions. The Mutant expresses innate abilities. The Chosen channels an unknown power. The Pactbound draws on granted power.
- **Ambiguous divinity.** The system deliberately does not confirm whether gods or cosmic forces exist. Power sources are real and measurable; their origins are unconfirmed.
- **All variants are human.** No fantasy species. Genetic diversity, bloodlines, mutations, and unexplained traits explain mechanical differences. "Darkvision" is always "Low-Light Awareness."

## Document Structure

Each markdown file covers one pillar of character creation:

| File | Covers | SRD Equivalent |
|------|--------|----------------|
| `origin-stories.md` | 12 Origin Stories (classes), multiclassing rules | SRD 5.2 Classes |
| `human-variants.md` | 9 Human Variants (species/races) | SRD 5.2 Species |
| `home-towns.md` | 4 Home Towns (backgrounds) | SRD 5.2 Backgrounds |
| `feats.md` | Feat categories, progression, current feat pool | SRD 5.2 Feats |
| `skills.md` | 18 skills (5 renamed/replaced from SRD) | SRD 5.2 Skills |

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

## Known Gaps and Development Priorities

1. **Feat pool is critically undersized.** Only 4 Origin Feats and 1 General half-feat exist. Target is 100+ feats across categories: General Half-Feats, Origin-specific Feats, Home Town Feats, and tiered Power Feats.
2. **Only 4 Home Towns exist.** Planned expansions: The Harbor, The Frontier, The Estate, The Underground, and more.
3. **Subclasses not yet written.** Each Origin Story needs subclass equivalents ("sub-origins" or "story branches").
4. **Feat progression timing** (which levels grant the 3 half-feat picks) is TBD.
5. **Level-up feats must be half-feats** (include +1 ability score). Standalone ASI picks are excluded by design. Epic Boons are cut (no level 19+).
