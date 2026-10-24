# @components-kit/styles

> Centralized Design Tokens and Global CSS Engine for Components Kit.

`@components-kit/styles` is the single source of truth for all styles, design tokens, mixins, and component CSS in the monorepo.

In accordance with our architecture, **all Vue 3 and React 19 components ship zero bundled CSS**. Consumers import either the unified design system stylesheet or individual component stylesheets directly from this package.

---

## Installation

```bash
pnpm add @components-kit/styles
```

---

## Consumption Patterns

### 1. Unified Global Stylesheet (Recommended)

Import the complete compiled CSS bundle once in your application root (e.g. `main.js`, `index.jsx`, or `App.vue`):

```javascript
import "@components-kit/styles/css";
```

This includes all base resets, typography, color tokens, animations, and styles for all 14 UI components.

### 2. Component-Specific Scoped Stylesheets (Micro-frontends / Code Splitting)

For optimal bundle size in code-split applications, import only the stylesheets for the components you render:

```javascript
// Base tokens and resets
import "@components-kit/styles/css/components/ckl-badge.css";
import "@components-kit/styles/css/components/ckl-tooltip.css";
```

### 3. SCSS Integration (Direct Token Access)

If your build pipeline uses SCSS (Vite, Webpack, etc.), you can consume design tokens, mixins, and variables directly:

```scss
// Import all tokens and mixins
@use "@components-kit/styles/scss" as *;

.my-custom-card {
  background-color: var(--ckl-bg-primary, #ffffff);
  border-radius: var(--ckl-radius-md, 8px);
  padding: 16px;
}
```

---

## Package Architecture

```text
packages/styles/
├── scripts/
│   └── build.mjs                 # Sass compilation build script
├── src/
│   ├── index.scss                # Main SCSS entrypoint
│   ├── tokens/                   # Core design tokens
│   │   ├── _colors.scss          # Color palette & variables
│   │   ├── _typography.scss      # Fonts & scale
│   │   ├── _variables.scss       # Global layout & spacing
│   │   ├── _mixins.scss          # SCSS mixins
│   │   └── _animations.scss      # Keyframes & transitions
│   └── components/               # Component-level SCSS modules
│       ├── _ckl-badge.scss
│       ├── _ckl-barometer-chart.scss
│       ├── _ckl-calendar.scss
│       ├── _ckl-carousel.scss
│       ├── _ckl-custom-text.scss
│       ├── _ckl-horizontal-tabs.scss
│       ├── _ckl-icon.scss
│       ├── _ckl-loader.scss
│       ├── _ckl-pagination.scss
│       ├── _ckl-progress-bar.scss
│       ├── _ckl-side-nav.scss
│       ├── _ckl-slides.scss
│       ├── _ckl-tooltip.scss
│       └── _ckl-truncate-text.scss
└── dist/                         # Compiled CSS distribution
    ├── ckl.css                   # Unified bundle
    └── components/               # Individual component CSS
        └── ckl-*.css
```

---

## Build Scripts

```bash
# Compile SCSS to dist/
pnpm --filter @components-kit/styles build
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
