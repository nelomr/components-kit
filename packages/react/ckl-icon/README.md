<div align="center">

# CklIcon

### Base SVG Icon Wrapper & Styler for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklIcon` is a wrapper component that renders curated SVG icons with standardized sizing, colors, and accessibility attributes.

---

## Quick Start

```jsx
import React from "react";
import { CklIcon } from "@components-kit/react-ckl-icon";

export function Example() {
  return <CklIcon icon="ial-home" size="large" color="primary" />;
}
```

---

## Props

| Prop       | Type      | Default     | Description                                                |
| :--------- | :-------- | :---------- | :--------------------------------------------------------- |
| `icon`     | `string`  | `''`        | Icon identifier matching the global SVG registry           |
| `size`     | `string`  | `'medium'`  | Size scale (`'small'`, `'medium'`, `'large'`, `'x-large'`) |
| `color`    | `string`  | `'inherit'` | Semantic color token or CSS color                          |
| `disabled` | `boolean` | `false`     | Applies disabled styling state                             |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-icon.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
