<div align="center">

# Storybook Composition Portal

### Unified Documentation Hub & Composition Host for Components Kit

[![Storybook 10](https://img.shields.io/badge/Storybook-10.6.3-FF4785?style=flat-square&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Vite+](https://img.shields.io/badge/Vite+-1.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://viteplus.dev/)
[![Composition](https://img.shields.io/badge/Composition-Vue3%20%7C%20React19-6366F1?style=flat-square)](./)
[![Port](https://img.shields.io/badge/Port-6005-blue?style=flat-square)](http://localhost:6005)

<br/>

[**Quick Start**](#quick-start) •
[**Architecture**](#architecture) •
[**Composition Refs**](#composition-refs) •
[**Production Build**](#production-build)

---

</div>

## Overview

`apps/storybook-portal` is the **Unified Storybook Composition Host**. It acts as the central portal published to **GitHub Pages**, connecting the independent Vue 3 and React 19 Storybook workbenches via Storybook's native **Composition** engine.

Through Composition, developers and design system consumers can explore, test, and compare components from both frameworks in a single unified interface without switching servers or URLs.

---

## Quick Start

### 1. Launch All Storybooks Simultaneously

```bash
# From repository root: starts Portal (6005), Vue (6006), and React (6007)
pnpm storybook:dev
```

Open your browser to:

```
http://localhost:6005
```

### 2. Launch Only the Composition Portal

```bash
# Starts only the composition host
pnpm storybook:portal:dev
```

---

## Architecture & Composition Refs

In [apps/storybook-portal/.storybook/main.js](file:///Users/nelo/proyectos/components-kit/apps/storybook-portal/.storybook/main.js), the composition `refs` dynamically switch between local dev servers and relative static paths:

```javascript
refs: (config, { configType }) => {
  if (configType === "DEVELOPMENT") {
    return {
      "vue-components": {
        title: "Vue 3 Components",
        url: "http://localhost:6006",
      },
      "react-components": {
        title: "React 19 Components",
        url: "http://localhost:6007",
      },
    };
  }
  return {
    "vue-components": {
      title: "Vue 3 Components",
      url: "./vue",
    },
    "react-components": {
      title: "React 19 Components",
      url: "./react",
    },
  };
};
```

---

## Production Build & GitHub Pages

To compile the entire composition portal into a self-contained static bundle ready for GitHub Pages:

```bash
# Builds Vue, React, Portal and nests ./vue and ./react into storybook-static/
pnpm storybook:build
```

The resulting `apps/storybook-portal/storybook-static/` contains:

- `index.html` (The Composition Host)
- `vue/` (Vue 3 static Storybook with `iframe.html` and `index.json`)
- `react/` (React 19 static Storybook with `iframe.html` and `index.json`)

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
