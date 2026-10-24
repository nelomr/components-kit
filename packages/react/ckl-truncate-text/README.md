<div align="center">

# CklTruncateText

### Intelligent Text & Array Clamping with Ellipses for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklTruncateText` clamps long text or array of strings to a specified limit, appending a customizable ellipsis or "+X more" counter.

---

## Quick Start

```jsx
import React from "react";
import { CklTruncateText } from "@components-kit/react-ckl-truncate-text";

export function Example() {
  return <CklTruncateText text="This is a very long text string that will be clamped" limit={20} />;
}
```

---

## Props

| Prop       | Type     | Default | Description                                        |
| :--------- | :------- | :------ | :------------------------------------------------- |
| `text`     | `string  | Array`  | `''`                                               | Text string or array of strings to truncate |
| `limit`    | `number` | `30`    | Maximum character or item length before truncation |
| `ellipsis` | `string` | '...'   | Suffix string appended when truncated              |

---

## Styling

This component ships **zero bundled CSS**. To apply the global design system styles and CSS variables, import the stylesheet in your application root:

```javascript
import "@components-kit/styles/css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
