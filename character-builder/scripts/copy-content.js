// Copies markdown content files from the repo root into character-builder/content/
// so they're accessible during Vercel builds where the root directory is character-builder.
const fs = require("fs");
const path = require("path");

const FILES = [
  "human-variants.md",
  "origin-stories.md",
  "home-towns.md",
  "feats.md",
  "skills.md",
];

const parentDir = path.join(__dirname, "..", "..");
const contentDir = path.join(__dirname, "..", "content");

// Only copy if the parent files exist (i.e., we're in the full repo)
const parentExists = FILES.some((f) => fs.existsSync(path.join(parentDir, f)));
if (!parentExists) {
  console.log("No parent content files found, skipping copy.");
  process.exit(0);
}

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

for (const file of FILES) {
  const src = path.join(parentDir, file);
  const dest = path.join(contentDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> content/${file}`);
  }
}
