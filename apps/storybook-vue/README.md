<div align="center">

# Vue 3 Storybook Workbench

### Interactive Component Explorer & Living Documentation for Vue 3

[![Storybook 10](https://img.shields.io/badge/Storybook-10.6.3-FF4785?style=flat-square&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Vite+](https://img.shields.io/badge/Vite+-1.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://viteplus.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Port](https://img.shields.io/badge/Port-6006-blue?style=flat-square)](http://localhost:6006)

<br/>

[**Quick Start**](#quick-start) •
[**Story Authoring**](#story-authoring-csf-3) •
[**Configuration**](#configuration--addons) •
[**Color Palette**](#color-palette) •
[**Build & Deploy**](#build--production)

---

</div>

## Overview

`apps/storybook-vue` is the isolated component workbench for all 14 **Vue 3 UI components** (`@components-kit/vue-ckl-*`). Powered by **Storybook 10**, **Vite+**, and `@storybook/vue3-vite`, it provides an ultra-fast feedback loop for UI development, accessibility auditing, and design QA.

### Core Features

- **Instant HMR**: Cold start in ~300ms powered by Vite+ and Rolldown's native ES module pipeline.
- **Storybook Color Palette**: SCSS and CSS custom property color palette (`colors.scss`).
- **Automated Docs**: Auto-generated prop tables, slot interfaces, and event emitters via Vue docgen.
- **Zero AppleScript Popups**: Configured with `--no-open` to avoid macOS permission dialogs (`-1743`).
- **Node 24 Ready**: Completely clean startup with zero deprecation warnings (`DEP0190` resolved natively).

---

## Quick Start

### 1. Launch Dev Server

```bash
# From repository root
pnpm storybook:vue:dev

# Or directly in this directory
pnpm dev
```

Open your browser to:

```
http://localhost:6006
```

---

## Story Authoring (CSF 3)

We use modern **Component Story Format 3 (CSF 3)** for all component stories:

```javascript
// apps/storybook-vue/stories/ckl-badge/index.stories.js
import { CklBadge } from "@components-kit/vue-ckl-badge";

export default {
  title: "Components/CklBadge",
  component: CklBadge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "pill", "outline"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error"],
    },
  },
};

// Default Story
export const Default = {
  args: {
    text: "New Feature",
    variant: "pill",
    color: "primary",
  },
};

// Outlined Variant Story
export const Outline = {
  args: {
    text: "Beta",
    variant: "outline",
    color: "warning",
  },
};
```

---

## Configuration & Addons

Configured under `apps/storybook-vue/.storybook/`:

- **Framework**: `@storybook/vue3-vite` with Vue 3 SFC compiler
- **Port**: `6006`
- **Addons**: `@storybook/addon-docs`, `@storybook/addon-designs`

---

<a id="color-palette"></a>

## Storybook Color Palette

Color variables configured for documentation and stories are loaded globally from `styles/colors.scss` into the Storybook preview iframe:

```scss
// Available CSS custom properties in all stories
--primary: #244a8a;
--secondary: #647b99;
--grey-400: #94a3b8;
--info: #38bdf8;
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
```

---

## Build & Production

Generate a static, production-ready documentation site:

```bash
pnpm build
```

The output bundle is generated at `storybook-static/`.

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
