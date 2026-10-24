<div align="center">

# CklTooltip

### Dynamic Floating Tooltips & Popovers with Portal for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklTooltip` displays accessible floating tooltip overlays positioned relative to a trigger element with viewport collision detection and outside-click dismissal.

---

## Quick Start

```jsx
import React from "react";
import { CklTooltip } from "@components-kit/react-ckl-tooltip";

export function Example() {
  return (
    <CklTooltip content="Helpful information tooltip" position="top">
      <button type="button">Hover me</button>
    </CklTooltip>
  );
}
```

---

## Props

| Prop       | Type        | Default     | Description                                                              |
| :--------- | :---------- | :---------- | :----------------------------------------------------------------------- |
| `content`  | `ReactNode` | `''`        | Content displayed inside the tooltip bubble                              |
| `position` | `string`    | `'top'`     | Placement relative to trigger (`'top'`, `'bottom'`, `'left'`, `'right'`) |
| `children` | `ReactNode` | `undefined` | Trigger element wrapped by the tooltip                                   |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-tooltip.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
