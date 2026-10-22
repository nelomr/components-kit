<div align="center">

# ⚙️ @components-kit/components-kit

### Core Monorepo Tooling Engine & CLI

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite+](https://img.shields.io/badge/Vite+-1.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://viteplus.dev/)
[![Vitest 5](https://img.shields.io/badge/Vitest-5.x-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![CLI](https://img.shields.io/badge/CLI-kit--cli-blueviolet?style=flat-square)](./cli/index.mjs)

<br/>

[**Overview**](#-overview) •
[**CLI Commands**](#-kit-cli-commands) •
[**Vite Pipeline**](#-vite-build-pipeline) •
[**Testing Setup**](#-testing-pipeline)

---

</div>

## ✦ Overview

`@components-kit/components-kit` is the centralized build and testing engine for all individual component packages in the monorepo. It abstracts away tooling boilerplate, providing:

- 🚀 **`kit-cli`**: A unified command-line runner for `build` and `test`.
- 📦 **Zero-Config Vite Builds**: Library-mode packaging with inline CSS injection and SVG loader integration.
- 🧪 **Vitest Test Runner**: Headless JSDOM test environment with Vue Test Utils integration.

---

## 🛠 `kit-cli` Commands

Each component workspace binds its scripts to `kit-cli`:

```json
{
  "scripts": {
    "build": "kit-cli build",
    "test": "kit-cli test"
  }
}
```

### 1. `kit-cli build`
Compiles the target component into a tree-shakeable ES Module bundle:
- Resolves Vue SFCs with `@vitejs/plugin-vue`.
- Inlines compiled component styles with `vite-plugin-css-injected-by-js`.
- Embeds raw SVG files as Vue components via `vite-svg-loader`.

### 2. `kit-cli test`
Executes Vitest in headless mode:
- Pre-configures JSDOM virtual DOM.
- Auto-discovers `*.test.js` files.
- Accepts `--watch` flag for active development:
  ```bash
  kit-cli test --watch
  ```

---

## 📦 Vite Build Pipeline

The shared `vite.config.mjs` standardizes:

- **Target**: ESNext / Modern Evergreen Browsers.
- **Rollup Options**: Marks `vue` as an external peer dependency so it isn't duplicated in component bundles.
- **CSS Processing**: Dart Sass modern compiler with Autoprefixer and PostCSS.

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
