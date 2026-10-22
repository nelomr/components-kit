<div align="center">

# 📖 Storybook Workbench

### Interactive Component Explorer & Living Documentation

[![Storybook 10](https://img.shields.io/badge/Storybook-10.6.3-FF4785?style=flat-square&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Vite+](https://img.shields.io/badge/Vite+-1.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://viteplus.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Port](https://img.shields.io/badge/Port-6006-blue?style=flat-square)](http://localhost:6006)

<br/>

[**Quick Start**](#-quick-start) •
[**Story Authoring**](#-story-authoring-csf-3) •
[**Configuration**](#-configuration--addons) •
[**Color Palette**](#-color-palette) •
[**Build & Deploy**](#-build--production)

---

</div>

## ✦ Overview

The Storybook workspace serves as the **isolated component workbench** and **visual living styleguide** for Components Kit. Powered by **Storybook 10** and **Vite+**, it provides an ultra-fast feedback loop for UI development, accessibility auditing, and design QA.

### Core Features

- ⚡ **Instant HMR**: Cold start in ~300ms powered by Vite+ and Rolldown's native ES module pipeline.
- 🎨 **Storybook Color Palette**: SCSS and CSS custom property color palette (`colors.scss`).
- 📚 **Automated Docs**: Auto-generated prop tables, slot interfaces, and event emitters via Vue docgen.
- 🛡️ **Zero AppleScript Popups**: Configured with `--no-open` to avoid macOS permission dialogs (`-1743`).
- 🧹 **Node 24 Ready**: Completely clean startup with zero deprecation warnings (`DEP0190` resolved natively).

---

## 🚀 Quick Start

### 1. Launch Dev Server

From the repository root or within `apps/storybook`:

```bash
# From repository root
pnpm storybook:dev

# Or directly in this directory
pnpm dev
```

Open your browser to:
```
http://localhost:6006
```

---

## ✍️ Story Authoring (CSF 3)

We use the modern **Component Story Format 3 (CSF 3)** for all component stories:

```javascript
// apps/storybook/stories/ckl-badge/index.stories.js
import { CklBadge } from '@components-kit/ckl-badge';

export default {
  title: 'Components/CklBadge',
  component: CklBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pill', 'outline'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
  },
};

// Default Story
export const Default = {
  args: {
    text: 'New Feature',
    variant: 'pill',
    color: 'primary',
  },
};

// Outlined Variant Story
export const Outline = {
  args: {
    text: 'Beta',
    variant: 'outline',
    color: 'warning',
  },
};
```

---

## ⚙️ Configuration & Addons

The Storybook architecture is structured under `.storybook/`:

```text
apps/storybook/.storybook/
├── main.js             # Core Vite & Storybook 10 configuration
├── preview.js          # Global decorators, viewports, and theme parameters
├── manager.js          # Storybook UI manager customization
└── theme/
    └── theme.js        # Components Kit branded UI theme
```

### Configured Addons

1. **`@storybook/addon-docs`**: Provides automated MDX documentation, prop tables, and code snippets.
2. **`@storybook/addon-designs`**: Design specs and token integration addon.

---

<a id="color-palette"></a>
## 🎨 Storybook Color Palette

Color variables configured for documentation and stories are loaded globally from `styles/colors.scss` into the Storybook preview iframe:

```scss
// Available CSS custom properties in all stories
--primary: #244A8A;
--secondary: #647B99;
--grey-400: #94A3B8;
--info: #38BDF8;
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
```

---

## 📦 Build & Production

Generate a static, production-ready documentation site:

```bash
pnpm build
```

The output bundle is generated at `storybook-static/`, ready for hosting on GitHub Pages, Vercel, or AWS S3.

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
