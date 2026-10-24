<div align="center">

# CklBadge

### Flexible Status Indicators, Pills, and Notification Badges for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklBadge` is a compact, customizable badge component used for counts, tags, status alerts, and categorization pills across the application.

---

## Quick Start

```jsx
import React from "react";
import { CklBadge } from "@components-kit/react-ckl-badge";

export function Example() {
  return (
    <div className="badges-row">
      {/* Standard Primary Badge */}
      <CklBadge color="primary">Active</CklBadge>

      {/* Outlined Success Pill */}
      <CklBadge color="success" shape="oval" outlined>
        Verified
      </CklBadge>

      {/* Small Circular Counter */}
      <CklBadge color="error" size="small" shape="circle">
        9
      </CklBadge>
    </div>
  );
}
```

---

## Props

| Prop        | Type        | Default     | Accepted Values                                                                                                      | Description                                                        |
| :---------- | :---------- | :---------- | :------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `color`     | `string`    | `'primary'` | `'primary'`, `'secondary'`, `'error'`, `'success'`, `'warning'`, `'info'`, `'purple'`, `'mid-blue'`, `'transparent'` | Brand or semantic color token                                      |
| `size`      | `string`    | `'large'`   | `'large'`, `'medium'`, `'small'`, `'x-small'`                                                                        | Dimensional scale of the badge                                     |
| `shape`     | `string`    | `'oval'`    | `'square'`, `'oval'`, `'circle'`                                                                                     | Geometric boundary shape                                           |
| `outlined`  | `boolean`   | `false`     | `true`, `false`                                                                                                      | When true, renders with transparent background and colored outline |
| `children`  | `ReactNode` | `undefined` | Any valid React child                                                                                                | Text, numeric counter, or icon contents                            |
| `className` | `string`    | `''`        | Any CSS class string                                                                                                 | Additional class names applied to root element                     |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-badge.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
