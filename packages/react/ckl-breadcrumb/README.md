<div align="center">

# CklBreadcrumb

### Hierarchical Trail Navigation for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklBreadcrumb` displays a trail of route crumbs indicating the current page location within a site hierarchy.

---

## Quick Start

```jsx
import React from "react";
import { CklBreadcrumb } from "@components-kit/react-ckl-breadcrumb";

export function Example() {
  const crumbs = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Detail", path: "/products/123" },
  ];

  return (
    <CklBreadcrumb crumbs={crumbs} onNavigate={(crumb) => console.log("Navigate to:", crumb)} />
  );
}
```

---

## Props

| Prop         | Type       | Default     | Description                                             |
| :----------- | :--------- | :---------- | :------------------------------------------------------ |
| `crumbs`     | `Array`    | `[]`        | Array of crumb objects with `title` and optional `path` |
| `onNavigate` | `Function` | `undefined` | Callback fired when a crumb link is clicked             |
| `separator`  | `string`   | `'/'`       | Separator icon or character between crumbs              |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-breadcrumb.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
