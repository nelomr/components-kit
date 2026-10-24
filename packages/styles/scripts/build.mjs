// Compiles the SCSS sources into plain CSS:
//   dist/ckl.css                 -> every component (import once in your app)
//   dist/components/<name>.css   -> one stylesheet per component
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src");
const componentsDir = path.join(srcDir, "components");
const distDir = path.join(root, "dist");
const distComponentsDir = path.join(distDir, "components");

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distComponentsDir, { recursive: true });

const compile = (file) => sass.compile(file, { style: "compressed", loadPaths: [srcDir] }).css;

fs.writeFileSync(path.join(distDir, "ckl.css"), compile(path.join(srcDir, "all.scss")));

for (const file of fs.readdirSync(componentsDir)) {
  if (!file.endsWith(".scss")) continue;
  const name = file.replace(/^_/, "").replace(/\.scss$/, "");
  fs.writeFileSync(
    path.join(distComponentsDir, `${name}.css`),
    compile(path.join(componentsDir, file)),
  );
}

console.log(
  `styles: built dist/ckl.css and ${fs.readdirSync(distComponentsDir).length} component files`,
);
