<div align="center">

# CklPagination

### Responsive Page Navigation with Direct Jumping and Ellipses for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklPagination` renders numbered page controls with previous/next triggers, direct jumping, and ellipsis compaction for large page lists.

---

## Quick Start

```jsx
import React, { useState } from "react";
import { CklPagination } from "@components-kit/react-ckl-pagination";

export function Example() {
  const [currentPage, setCurrentPage] = useState(1);

  return <CklPagination total={100} pageSize={10} value={currentPage} onChange={setCurrentPage} />;
}
```

---

## Props

| Prop       | Type       | Default     | Description                                 |
| :--------- | :--------- | :---------- | :------------------------------------------ |
| `total`    | `number`   | `0`         | Total count of items across all pages       |
| `pageSize` | `number`   | `10`        | Number of items per page                    |
| `value`    | `number`   | `1`         | Current 1-based page number                 |
| `onChange` | `Function` | `undefined` | Callback fired when the active page changes |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-pagination.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
