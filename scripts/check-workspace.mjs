#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const errors = [];

function checkFile(filePath, content, framework) {
  // Check no cross-framework imports
  if (framework === "vue") {
    if (content.includes("@components-kit/react-")) {
      errors.push(`${filePath}: Forbidden import of React package in Vue package/app.`);
    }
  } else if (framework === "react") {
    if (content.includes("@components-kit/vue-")) {
      errors.push(`${filePath}: Forbidden import of Vue package in React package/app.`);
    }
  }

  // Check no legacy @packages alias
  if (content.includes("@packages/")) {
    errors.push(`${filePath}: Forbidden legacy '@packages/' import.`);
  }

  // Check no relative cross-package imports
  if (/\bfrom\s+["'](?:\.\.\/){2,}(?:vue|react|core|styles|assets|tooling)\//.test(content)) {
    errors.push(`${filePath}: Forbidden relative cross-package import.`);
  }

  // Check components ship no CSS
  if (filePath.includes("/packages/vue/") && filePath.endsWith(".vue")) {
    if (/<style/i.test(content)) {
      errors.push(
        `${filePath}: Vue component SFC must not contain <style> tags (CSS belongs in @components-kit/styles).`,
      );
    }
  }
  if (
    filePath.includes("/packages/react/") &&
    (filePath.endsWith(".jsx") || filePath.endsWith(".js"))
  ) {
    if (/import\s+["'][^"']+\.scss["']/i.test(content)) {
      errors.push(
        `${filePath}: React component must not import SCSS directly (CSS belongs in @components-kit/styles).`,
      );
    }
  }
}

function scanDir(dir, framework) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name !== "node_modules" &&
        entry.name !== "dist" &&
        entry.name !== "storybook-static"
      ) {
        scanDir(fullPath, framework);
      }
    } else if (entry.isFile()) {
      if (/\.(js|jsx|ts|tsx|vue|mjs)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, "utf8");
        checkFile(path.relative(rootDir, fullPath), content, framework);
      }
    }
  }
}

function checkComponentPackage(pkgDir, expectedPrefix, framework) {
  const pkgJsonPath = path.join(pkgDir, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    errors.push(`${pkgDir}: Missing package.json`);
    return;
  }
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  const expectedName = `${expectedPrefix}${path.basename(pkgDir)}`;
  if (pkgJson.name !== expectedName) {
    errors.push(`${pkgJsonPath}: package name is "${pkgJson.name}", expected "${expectedName}"`);
  }

  const allDeps = {
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
    ...pkgJson.peerDependencies,
  };

  const forbiddenPrefix = framework === "vue" ? "@components-kit/react-" : "@components-kit/vue-";
  for (const dep of Object.keys(allDeps)) {
    if (dep.startsWith(forbiddenPrefix)) {
      errors.push(`${pkgJsonPath}: Forbidden cross-framework dependency "${dep}".`);
    }
  }

  scanDir(path.join(pkgDir, "src"), framework);
}

// 1. Validate Vue component packages
const vuePackagesDir = path.join(rootDir, "packages/vue");
if (fs.existsSync(vuePackagesDir)) {
  for (const dir of fs.readdirSync(vuePackagesDir)) {
    const full = path.join(vuePackagesDir, dir);
    if (fs.statSync(full).isDirectory()) {
      checkComponentPackage(full, "@components-kit/vue-", "vue");
    }
  }
}

// 2. Validate React component packages
const reactPackagesDir = path.join(rootDir, "packages/react");
if (fs.existsSync(reactPackagesDir)) {
  for (const dir of fs.readdirSync(reactPackagesDir)) {
    const full = path.join(reactPackagesDir, dir);
    if (fs.statSync(full).isDirectory()) {
      checkComponentPackage(full, "@components-kit/react-", "react");
    }
  }
}

// 3. Validate Storybook apps
scanDir(path.join(rootDir, "apps/storybook-vue/stories"), "vue");
scanDir(path.join(rootDir, "apps/storybook-react/stories"), "react");

if (errors.length > 0) {
  console.error("\x1b[31m[check-workspace] Architecture violations found:\x1b[0m");
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log(
    "\x1b[32m[check-workspace] Monorepo architecture rules validated successfully!\x1b[0m",
  );
}
