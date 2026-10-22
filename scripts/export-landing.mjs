import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dest = path.join(root, "skora-landing-website");

async function copyFile(srcRel, destRel) {
  const src = path.join(root, srcRel);
  const target = path.join(dest, destRel);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(src, target);
}

async function copyDir(srcRel, destRel) {
  const src = path.join(root, srcRel);
  const target = path.join(dest, destRel);
  await fs.cp(src, target, { recursive: true });
}

async function run() {
  console.log("Preparing export directory:", dest);
  await fs.rm(dest, { recursive: true, force: true });
  await fs.mkdir(dest, { recursive: true });

  // 1. App marketing routes
  console.log("Copying app/(marketing)...");
  await copyDir(path.join("app", "(marketing)"), path.join("app", "(marketing)"));
  await copyFile(path.join("app", "not-found.tsx"), path.join("app", "not-found.tsx"));
  await copyFile(path.join("app", "error.tsx"), path.join("app", "error.tsx"));

  // 2. Marketing components
  console.log("Copying components/marketing...");
  await copyDir(path.join("components", "marketing"), path.join("components", "marketing"));

  // 3. UI components used by marketing
  console.log("Copying UI components...");
  const uiComponents = [
    "arrow-cta.tsx",
    "blurry-to-clear.tsx",
    "falling-pattern.tsx",
    "halftone-wordmark-footer.tsx",
    "hud-button.tsx",
    "mesh-drift-background.tsx",
    "shader-b3e94fd7.tsx",
    "timeline.tsx",
  ];
  for (const comp of uiComponents) {
    await copyFile(path.join("components", "ui", comp), path.join("components", "ui", comp));
  }

  // 4. Public assets (images & fonts)
  console.log("Copying public assets...");
  await copyDir(path.join("public", "images"), path.join("public", "images"));
  await copyDir(path.join("public", "fonts"), path.join("public", "fonts"));

  // 5. Lib queries, security & utils
  console.log("Copying lib helpers...");
  await copyFile(path.join("lib", "queries", "landing.ts"), path.join("lib", "queries", "landing.ts"));
  await copyFile(path.join("lib", "queries", "blog.ts"), path.join("lib", "queries", "blog.ts"));
  await copyFile(path.join("lib", "security", "rate-limit.ts"), path.join("lib", "security", "rate-limit.ts"));
  await copyFile(path.join("lib", "security", "ip.ts"), path.join("lib", "security", "ip.ts"));
  await copyFile(path.join("lib", "config.ts"), path.join("lib", "config.ts"));
  await copyFile(path.join("lib", "utils.ts"), path.join("lib", "utils.ts"));

  // 6. CSS theme tokens snippet
  console.log("Extracting marketing styles...");
  const globalsCss = await fs.readFile(path.join(root, "app", "globals.css"), "utf8");
  // Extract font-face and theme block
  const fontFaceMatch = globalsCss.match(/@font-face[\s\S]*?@theme\s*\{[\s\S]*?\}/);
  const themeSnippet = fontFaceMatch ? fontFaceMatch[0] : "";
  await fs.mkdir(path.join(dest, "styles"), { recursive: true });
  await fs.writeFile(
    path.join(dest, "styles", "marketing-theme.css"),
    `/* Marketing site fonts & design tokens — include in your main globals.css */\n\n` + themeSnippet + `\n`
  );

  console.log("✓ Export completed successfully!");
}

run().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
