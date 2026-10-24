<div align="center">

# CklVerticalTabs

### Stacked Vertical Tab List with Error Indicators & Dual Icons for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklVerticalTabs` displays a vertical column of selectable tabs with support for leading/trailing icons, error state styling, and badge alerts.

---

## Quick Start

```jsx
import React, { useState } from "react";
import { CklVerticalTabs } from "@components-kit/react-ckl-vertical-tabs";

export function Example() {
  const [selectedId, setSelectedId] = useState("account");

  const tabs = [
    { id: "account", title: "Account Settings", icon: "ial-user" },
    { id: "billing", title: "Billing & Invoices", icon: "ial-home" },
    { id: "security", title: "Security", hasError: true },
  ];

  return <CklVerticalTabs tabs={tabs} value={selectedId} onChange={setSelectedId} />;
}
```

---

## Props

| Prop       | Type       | Default     | Description                                                  |
| :--------- | :--------- | :---------- | :----------------------------------------------------------- |
| `tabs`     | `Array`    | `[]`        | Tab items with `id`, `title`, optional `icon` and `hasError` |
| `value`    | `string`   | `''`        | Identifier of the active tab                                 |
| `onChange` | `Function` | `undefined` | Callback fired when a tab is selected                        |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-vertical-tabs.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
