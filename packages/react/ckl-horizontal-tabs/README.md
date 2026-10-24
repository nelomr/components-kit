<div align="center">

# CklHorizontalTabs

### Accessible Tab Bar Navigation with Tooltips and Icons for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklHorizontalTabs` renders an accessible horizontal tab bar with keyboard cycling, icons, badge counters, and selection indicators.

---

## Quick Start

```jsx
import React, { useState } from "react";
import { CklHorizontalTabs } from "@components-kit/react-ckl-horizontal-tabs";

export function Example() {
  const [selectedId, setSelectedId] = useState("tab-1");

  const tabs = [
    { id: "tab-1", title: "General", icon: "ial-home" },
    { id: "tab-2", title: "Settings", icon: "ial-settings" },
    { id: "tab-3", title: "Alerts", badge: 4 },
  ];

  return <CklHorizontalTabs tabs={tabs} value={selectedId} onChange={setSelectedId} />;
}
```

---

## Props

| Prop       | Type       | Default     | Description                                               |
| :--------- | :--------- | :---------- | :-------------------------------------------------------- |
| `tabs`     | `Array`    | `[]`        | Tab items with `id`, `title`, optional `icon` and `badge` |
| `value`    | `string`   | `''`        | Identifier of the currently active tab                    |
| `onChange` | `Function` | `undefined` | Callback fired when a tab is selected                     |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-horizontal-tabs.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
