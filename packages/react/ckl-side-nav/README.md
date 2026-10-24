<div align="center">

# CklSideNav

### Multi-Level Collapsible Side Navigation for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklSideNav` renders a collapsible vertical navigation bar with support for nested children, badge counters, icons, and active state tracking.

---

## Quick Start

```jsx
import React, { useState } from "react";
import { CklSideNav } from "@components-kit/react-ckl-side-nav";

export function Example() {
  const [selectedId, setSelectedId] = useState("dashboard");

  const items = [
    { id: "dashboard", title: "Dashboard", icon: "ial-home" },
    {
      id: "analytics",
      title: "Analytics",
      icon: "ial-arrow",
      children: [
        { id: "reports", title: "Reports" },
        { id: "realtime", title: "Realtime" },
      ],
    },
  ];

  return <CklSideNav items={items} value={selectedId} onChange={setSelectedId} />;
}
```

---

## Props

| Prop         | Type       | Default     | Description                                                     |
| :----------- | :--------- | :---------- | :-------------------------------------------------------------- |
| `items`      | `Array`    | `[]`        | Navigation item tree with `id`, `title`, `icon`, and `children` |
| `value`      | `string`   | `''`        | Identifier of the currently selected navigation item            |
| `onChange`   | `Function` | `undefined` | Callback fired when a navigation item is selected               |
| `isExtended` | `boolean`  | `true`      | Controls expanded vs collapsed sidebar width                    |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-side-nav.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
