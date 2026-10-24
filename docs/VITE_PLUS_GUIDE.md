# The Definitive Guide to Vite+ (Vite Plus)

This guide documents the architecture, tools, CLI commands, and developer workflows for the **Components Kit** monorepo using **Vite+ (`vp`) 1.3** as our unified native toolchain for development, bundling, testing, linting, and formatting.

---

## Table of Contents

1. [What is Vite+?](#1-what-is-vite)
2. [Toolchain Components & Architecture](#2-toolchain-components--architecture)
3. [Repository Configuration](#3-repository-configuration)
4. [Developer Workflows & CLI Commands](#4-developer-workflows--cli-commands)
   - [Development & Storybook](#development--storybook)
   - [Linting & Code Quality (`vp lint`)](#linting--code-quality-vp-lint)
   - [Code Formatting (`vp fmt`)](#code-formatting-vp-fmt)
   - [Unified Gate (`vp check`)](#unified-gate-vp-check)
   - [Unit Testing (`vp run -r test`)](#unit-testing-vp-run--r-test)
   - [Production Builds (`vp run -r build`)](#production-builds-vp-run--r-build)
   - [Package Management & Dependencies](#package-management--dependencies)
   - [Git Hooks & Staged Files (`vp staged`)](#git-hooks--staged-files-vp-staged)
5. [Monorepo Task Orchestration (`Vite Task`)](#5-monorepo-task-orchestration-vite-task)
6. [Migration from Legacy ESLint / Stylelint / Prettier](#6-migration-from-legacy-eslint--stylelint--prettier)
7. [Engineering Best Practices](#7-engineering-best-practices)

---

## 1. What is Vite+?

**Vite+** (`vp`) is a unified web development toolchain created by **VoidZero** (founded by Evan You, creator of Vue and Vite). It eliminates frontend tooling fragmentation by consolidating disparate tools into a single, cohesive, Rust-powered binary:

- **Bundler & Dev Server**: Vite 8.3 powered by **Rolldown** (written in Rust on top of Oxc).
- **Test Runner**: **Vitest 5.0** (native Rolldown/Vite integration).
- **Linter**: **Oxlint** (Rust linter with 750+ ESLint-compatible rules, executing 50x–100x faster than traditional ESLint).
- **Formatter**: **Oxfmt** (Rust formatter compatible with Prettier rules).
- **Task Orchestrator**: **Vite Task** (dependency graph topology, concurrent task execution, and computation caching).
- **Git Hooks**: Native commit staging integration via `vp staged` and `vp hooks`.
- **Unified Package Manager Wrapper**: Unified interface (`vp install`, `vp add`, `vp update`) that automatically detects and delegates to **pnpm 11**.

> [!NOTE]
> **Runtime Requirement**: The Vite+ standard in this monorepo strictly requires **Node.js `>= 24.0.0`** and **pnpm `>= 11.0.0`**. Legacy runtimes (**Node 20 and Node 22**) are **not supported**.

---

## 2. Toolchain Components & Architecture

You can inspect the exact tool versions and compiler relationships at any time by running:

```bash
npx vp toolchain
```

Output:

```text
vite-plus@1.3.0
├── depends on @voidzero-dev/vite-plus-core@1.3.0
│   ├── bundles vite@8.3.4
│   │   └── uses rolldown@1.2.14
│   │       ├── compiles oxc@0.154.0
│   │       └── compiles oxc-resolver@11.24.3
│   ├── bundles rolldown@1.2.14
│   │   ├── compiles oxc@0.154.0
│   │   └── compiles oxc-resolver@11.24.3
│   └── bundles tsdown@0.23.1
├── depends on vitest@5.0.5
├── depends on oxlint@1.88.0
├── depends on oxlint-tsgolint@7.0.2004
├── depends on oxfmt@0.73.0
└── compiles vite-task
```

### Component Breakdown & Responsibilities

| Tool                  | Engine          | Role in Monorepo                                                                                      |
| :-------------------- | :-------------- | :---------------------------------------------------------------------------------------------------- |
| **Rolldown & Vite 8** | Rust / Oxc      | Compiles all 28 Vue 3 & React 19 libraries (`packages/{vue,react}/*`) into ESM & powers Storybook 10. |
| **Vitest 5**          | Rolldown / Vite | Executes 28 component test suites in headless JSDOM environments concurrently.                        |
| **Oxlint**            | Rust            | Lints JavaScript, TypeScript, JSX, and Vue 3 SFCs in **< 600ms**.                                     |
| **Oxfmt**             | Rust            | High-speed formatting for JS, JSX, TS, Vue, SCSS, JSON, and Markdown.                                 |
| **Vite Task**         | Rust / C++      | Topologically executes monorepo tasks (`vp run -r <task>`) respecting workspace dependencies.         |
| **pnpm 11**           | Hardlink store  | Resolves and stores physical packages; manages workspace symlink graph.                               |

---

## 3. Repository Configuration

Central toolchain configuration lives in the monorepo root at [`vite.config.ts`](file:///Users/nelo/proyectos/components-kit/vite.config.ts):

```typescript
import { defineConfig } from "vite-plus";

export default defineConfig({
  // Oxfmt formatting options
  fmt: {},

  // Oxlint rules and type-aware options
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },

  // Staged files hook for Git commits (replaces lint-staged)
  staged: {
    "*.{js,mjs,ts,vue,jsx}": "vp check --fix",
  },
});
```

### Component Workspace Configuration

Each individual UI component package relies on the central build runner defined in [`packages/tooling/vite.config.mjs`](file:///Users/nelo/proyectos/components-kit/packages/tooling/vite.config.mjs):

- Uses `defineConfig` and `lazyPlugins` imported from `'vite-plus'`.
- Dynamically loads `@vitejs/plugin-vue` for Vue 3 packages or `@vitejs/plugin-react` for React 19 packages based on package dependencies.
- Configures `vite-plugin-css-injected-by-js` and `vite-svg-loader`.
- Uses modern Dart Sass (`api: 'modern-compiler'`) to compile SCSS tokens and mixins.
- Generates pure tree-shakeable ES modules with externalized `vue`, `react`, `react-dom`, and `@components-kit/assets`.

---

## 4. Developer Workflows & CLI Commands

You can run commands using either `pnpm <script>` or directly through the native `vp` CLI (`npx vp <command>`).

### Development & Storybook Composition

Starts the Storybook 10 interactive component workbenches:

```bash
# Launch ALL Storybooks in parallel (Portal at 6005, Vue at 6006, React at 6007)
pnpm storybook:dev

# Or launch independently:
pnpm storybook:portal:dev    # Unified Composition Portal (Port 6005)
pnpm storybook:vue:dev       # Vue 3 Storybook (Port 6006)
pnpm storybook:react:dev     # React 19 Storybook (Port 6007)
```

Access the unified Composition Portal at: `http://localhost:6005`

### Linting & Code Quality (`vp lint`)

Oxlint runs in Rust, scanning the entire monorepo in **~580ms**:

```bash
# Lint the entire monorepo
pnpm lint
# or via CLI:
npx vp lint

# Lint a specific component package or directory:
npx vp lint packages/vue/ckl-tooltip/src
npx vp lint packages/react/ckl-tooltip/src

# Automatically fix fixable rule violations:
npx vp lint --fix
```

### Code Formatting (`vp fmt`)

Oxfmt formats code in place at Rust speed without Node.js overhead:

```bash
# Format all repository files in place:
pnpm fmt
# or via CLI:
npx vp fmt --write

# Verify code formatting without modifying files (ideal for CI pipelines):
pnpm fmt:check
# or via CLI:
npx vp fmt --check
```

### Unified Gate (`vp check`)

Runs formatting check, linting, and type checking in a single high-performance pass:

```bash
# Run the complete check
pnpm check
# or via CLI with auto-fix:
npx vp check --fix
```

### Unit Testing (`vp run -r test`)

Executes all 28 Vitest 5 unit test suites in parallel:

```bash
# Run all tests across the monorepo
pnpm test
# or via Vite Task:
npx vp run -r test

# Run tests for a single package:
pnpm --filter @components-kit/vue-ckl-badge test

# Run tests in active watch mode:
pnpm --filter @components-kit/vue-ckl-badge test:watch
```

### Production Builds (`vp run -r build`)

Builds all component distribution bundles (`dist/index.js`) and the static Storybook application:

```bash
# Build all packages topologically
pnpm build
# or via Vite Task:
npx vp run -r build

# Build a single package:
pnpm --filter @components-kit/vue-ckl-badge build
```

### Package Management & Dependencies

Vite+ provides a unified wrapper around your underlying package manager (**pnpm**):

```bash
# Install all workspace dependencies
npx vp install
# or:
pnpm install

# Add a runtime dependency to a specific package
npx vp add lodash-es --filter @components-kit/vue-ckl-badge

# Add a development dependency to the monorepo root
npx vp add -D -w @types/node
```

### Git Hooks & Staged Files (`vp staged` & `vp hooks`)

Vite+ provides a built-in Git hook dispatcher (`vp hooks`) that replaces third-party tools like Husky, combined with staged file checks (`vp staged`) that replace `lint-staged`:

- **Pre-commit Hook** (`.vite-hooks/pre-commit`): Runs `vp staged` (auto-fixing formatting/linting on staged files) and `vp run -r test` (verifying all unit tests pass before a commit is created).
- **Commit Message Hook** (`.vite-hooks/commit-msg`): Validates commit messages with **Commitlint** against the Conventional Commits specification. See [Conventional Commits in MONOREPO_GUIDE.md](./MONOREPO_GUIDE.md#conventional-commits-specification--rules) for full rules, allowed types, scopes, and examples.

```bash
# Run checks against staged files manually
npx vp staged

# Check the active Git hook dispatcher status
npx vp hooks status

# Reinstall or refresh native Vite+ hooks in .vite-hooks/
npx vp hooks enable
```

---

## 5. Monorepo Task Orchestration (`Vite Task`)

Vite+ contains a native monorepo task runner called **Vite Task**. It provides:

1. **Dependency Topology**: Understands the workspace dependency graph automatically. If `ckl-horizontal-tabs` depends on `ckl-tooltip`, Vite Task ensures `ckl-tooltip` is built before `ckl-horizontal-tabs`.
2. **Parallel Concurrency**: Automatically distributes independent tasks across all available CPU cores.
3. **Powerful Filtering Patterns**:
   - `vp run -r <task>`: Runs recursively across all packages in the workspace.
   - `vp run -F @components-kit/vue-ckl-* build`: Targets only packages matching the glob.
   - `vp run -F ./packages/vue/ckl-icon... test`: Targets `ckl-icon` and all packages that depend on it.
   - `vp run --last-details`: Displays a detailed timing summary of the previous run.

---

## 6. Migration from Legacy ESLint / Stylelint / Prettier

### Problems in the Legacy Architecture:

1. **Tooling Redundancy**: 16 separate `.eslintrc.json` files and an internal package (`packages/eslint-config-components`).
2. **Slow Execution**: Traditional ESLint took 5–10 seconds to spin up multiple Node.js worker processes across the monorepo.
3. **Ghost Stylelint**: Stylelint was listed in dependencies but had no configuration file (`.stylelintrc`), causing errors when run independently.
4. **Heavy Lockfile**: Over 240 transitive dependencies existed solely to support legacy ESLint AST parsers and Prettier bridges.

### Improvements with Native Vite+:

- **240 Obsolete Packages Removed**: Purged AST plugins, Stylelint configurations, and Prettier wrappers from `pnpm-lock.yaml` and `node_modules`.
- **Instant Linting**: Monorepo linting dropped from ~8 seconds to **~580ms** with Oxlint in Rust.
- **Zero Duplicated Configs**: Removed all 16 `.eslintrc.json` files. Quality settings are maintained centrally in [`vite.config.ts`](file:///Users/nelo/proyectos/components-kit/vite.config.ts).
- **Native CSS Validation**: Modern Dart Sass (`sass-embedded`) validates SCSS syntax and variables at build time, and Oxfmt enforces formatting without extra linters.

---

## 7. Engineering Best Practices

1. **Keep Linting Frictionless**: Run `pnpm lint` before pushing; it completes in under a second and ensures 0 warnings and 0 errors.
2. **Use `void` for Reflow Triggers**: When forcing browser reflows for CSS height transitions (e.g., in Vue transition hooks), use `void getComputedStyle(el).height;` to explicitly state intent and avoid unused expression warnings.
3. **Keep Shared Dependencies in the Catalog**: Maintain version alignment across packages using `"catalog:"` in `package.json` for tools like `vite`, `vitest`, and `vite-plus`.
4. **Leverage Native Pre-commit Hooks**: The `.vite-hooks/pre-commit` hook automatically runs `vp staged` (fixing formatting and linting errors on staged files) and `vp run -r test` (verifying all unit tests pass before committing).
