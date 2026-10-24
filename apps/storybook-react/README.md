<div align="center">

# React 19 Storybook Workbench

### Interactive Component Explorer & Living Documentation for React 19

[![Storybook 10](https://img.shields.io/badge/Storybook-10.6.3-FF4785?style=flat-square&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Vite+](https://img.shields.io/badge/Vite+-1.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://viteplus.dev/)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Port](https://img.shields.io/badge/Port-6007-blue?style=flat-square)](http://localhost:6007)

<br/>

[**Quick Start**](#quick-start) •
[**Story Authoring**](#story-authoring-csf-3) •
[**Configuration**](#configuration--addons) •
[**Build & Deploy**](#build--production)

---

</div>

## Overview

`apps/storybook-react` is the isolated component workbench for all 14 **React 19 UI components** (`@components-kit/react-ckl-*`). Powered by **Storybook 10**, **Vite+**, and `@storybook/react-vite`, it provides instant HMR, full CSF 3 interactive stories, and accessibility verification.

---

## Quick Start

### 1. Launch Dev Server

```bash
# From repository root
pnpm storybook:react:dev

# Or directly in this directory
pnpm dev
```

Open your browser to:

```
http://localhost:6007
```

---

## Story Authoring (CSF 3)

We use modern **Component Story Format 3 (CSF 3)** for all React component stories:

```jsx
// apps/storybook-react/stories/ckl-badge/index.stories.jsx
import React from "react";
import { CklBadge } from "@components-kit/react-ckl-badge";

export default {
  title: "Components/CklBadge",
  component: CklBadge,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error"],
    },
    shape: {
      control: "select",
      options: ["square", "oval", "circle"],
    },
  },
};

export const Default = {
  args: {
    children: "Active Badge",
    color: "primary",
    shape: "oval",
  },
};
```

---

## Configuration & Addons

Configured under `apps/storybook-react/.storybook/`:

- **Framework**: `@storybook/react-vite` with React 19 JSX support
- **Port**: `6007`
- **Addons**: `@storybook/addon-docs`, `@storybook/addon-designs`

---

## Build & Production

Generate a static, production-ready documentation site:

```bash
pnpm build
```

Build output is written to `storybook-static/`.

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
