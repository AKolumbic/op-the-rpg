import React from "react";

/**
 * Renders raw markdown-like content from the OP content files as styled JSX.
 * Handles: paragraphs, bold/italic inline, bullet lists (with nesting),
 * tables, sub-headings (###), and design/worldbuilding notes.
 */

function formatInline(text: string): React.ReactNode[] {
  // Process **bold** and *italic* patterns
  const parts: React.ReactNode[] = [];
  // Match **bold**, *italic*, and plain text segments
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|[^*]+)/g;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      // Bold
      parts.push(
        <strong key={key++} className="font-bold text-foreground">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Italic
      parts.push(
        <em key={key++} className="italic text-foreground/70">
          {match[3]}
        </em>
      );
    } else {
      parts.push(<React.Fragment key={key++}>{match[0]}</React.Fragment>);
    }
  }
  return parts;
}

function renderTable(lines: string[]): React.ReactElement {
  // First line = headers, second line = separator, rest = rows
  const headerCells = lines[0]
    .split("|")
    .filter((c) => c.trim())
    .map((c) => c.trim());
  const dataLines = lines.slice(2); // skip header and separator

  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse border-2 border-accent text-sm">
        <thead>
          <tr className="bg-accent/20">
            {headerCells.map((h, i) => (
              <th
                key={i}
                className="border border-accent/40 px-3 py-2 text-left font-display text-foreground"
              >
                {formatInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataLines.map((line, ri) => {
            const cells = line
              .split("|")
              .filter((c) => c.trim())
              .map((c) => c.trim());
            return (
              <tr key={ri} className="even:bg-card-bg/50">
                {cells.map((c, ci) => (
                  <td
                    key={ci}
                    className="border border-accent/20 px-3 py-2 text-foreground/80"
                  >
                    {formatInline(c)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function ContentRenderer({
  content,
  accentColor,
}: {
  content: string;
  accentColor?: string;
}) {
  const lines = content.split("\n");
  const elements: React.ReactElement[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Sub-heading (###)
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key++}
          className={`font-display text-2xl mt-8 mb-3 ${accentColor || "text-accent"}`}
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Table (starts with |)
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        elements.push(
          <React.Fragment key={key++}>{renderTable(tableLines)}</React.Fragment>
        );
      }
      continue;
    }

    // Bullet list
    if (line.startsWith("- ") || line.startsWith("  - ")) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("  - ") || lines[i].startsWith("  "))
      ) {
        const current = lines[i];
        if (current.startsWith("- ") || current.startsWith("  - ")) {
          listItems.push(current);
        } else if (listItems.length > 0) {
          // Continuation of previous line
          listItems[listItems.length - 1] += " " + current.trim();
        }
        i++;
      }

      elements.push(
        <ul key={key++} className="my-4 space-y-3">
          {listItems.map((item, li) => {
            const isNested = item.startsWith("  - ");
            const text = isNested ? item.slice(4) : item.slice(2);
            return (
              <li
                key={li}
                className={`flex gap-2 ${isNested ? "ml-6" : ""}`}
              >
                <span className={`mt-1 shrink-0 ${accentColor || "text-accent"}`}>
                  &#9670;
                </span>
                <span className="text-foreground/85 leading-relaxed">
                  {formatInline(text)}
                </span>
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    // Design / Worldbuilding note
    if (
      line.startsWith("**Design Note:**") ||
      line.startsWith("**Worldbuilding Note:**")
    ) {
      const noteType = line.startsWith("**Design Note:**")
        ? "Design Note"
        : "Worldbuilding Note";
      const noteText = line
        .replace(/^\*\*(Design Note|Worldbuilding Note):\*\*\s*/, "")
        .trim();
      elements.push(
        <div
          key={key++}
          className="mt-8 comic-panel p-4 border-l-4 border-l-accent"
        >
          <p className="font-display text-accent text-sm tracking-wide mb-1">
            {noteType}
          </p>
          <p className="text-foreground/70 text-sm leading-relaxed">
            {formatInline(noteText)}
          </p>
        </div>
      );
      i++;
      continue;
    }

    // Archetype line
    if (line.startsWith("**Archetype:**")) {
      const text = line.replace(/^\*\*Archetype:\*\*\s*/, "");
      elements.push(
        <div key={key++} className="mt-6 mb-4">
          <p className={`font-display text-lg ${accentColor || "text-accent"} mb-1`}>
            Archetype
          </p>
          <p className="text-foreground/85 leading-relaxed italic">
            {formatInline(text)}
          </p>
        </div>
      );
      i++;
      continue;
    }

    // Core Mechanics line
    if (line.startsWith("**Core Mechanics (SRD):**")) {
      const text = line.replace(/^\*\*Core Mechanics \(SRD\):\*\*\s*/, "");
      elements.push(
        <div key={key++} className="mt-4 comic-panel p-4">
          <p className={`font-display text-lg ${accentColor || "text-accent"} mb-1`}>
            Core Mechanics
          </p>
          <p className="text-foreground/70 text-sm leading-relaxed">
            {formatInline(text)}
          </p>
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="my-3 text-foreground/85 leading-relaxed">
        {formatInline(line)}
      </p>
    );
    i++;
  }

  return <div>{elements}</div>;
}
