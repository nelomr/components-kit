<div align="center">

# CklLoader

### Minimalist Animated Activity Indicator for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklLoader` displays an accessible, lightweight SVG spinning activity indicator.

---

## Quick Start

```jsx
import React from "react";
import { CklLoader } from "@components-kit/react-ckl-loader";

export function Example() {
  return <CklLoader size="large" color="primary" />;
}
```

---

## Props

| Prop    | Type     | Default     | Description                                           |
| :------ | :------- | :---------- | :---------------------------------------------------- |
| `size`  | `string` | `'medium'`  | Spinner size scale (`'small'`, `'medium'`, `'large'`) |
| `color` | `string` | `'primary'` | Color token of the spinning track indicator           |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-loader.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
