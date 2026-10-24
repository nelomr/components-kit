<div align="center">

# CklProgressBar

### Linear Progress Indicator with Dynamic State Colors for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklProgressBar` displays a horizontal completion bar with animated fill, percentage labels, and configurable color states.

---

## Quick Start

```jsx
import React from "react";
import { CklProgressBar } from "@components-kit/react-ckl-progress-bar";

export function Example() {
  return <CklProgressBar value={65} max={100} color="success" showLabel />;
}
```

---

## Props

| Prop        | Type      | Default     | Description                                                    |
| :---------- | :-------- | :---------- | :------------------------------------------------------------- |
| `value`     | `number`  | `0`         | Current progress value                                         |
| `max`       | `number`  | `100`       | Maximum progress value                                         |
| `color`     | `string`  | `'primary'` | Color token (`'primary'`, `'success'`, `'warning'`, `'error'`) |
| `showLabel` | `boolean` | `false`     | Displays numerical percentage label                            |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-progress-bar.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
