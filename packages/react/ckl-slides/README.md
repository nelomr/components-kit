<div align="center">

# CklSlides

### Viewport Slide Bullet & Indicator Controls for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklSlides` provides pagination dots and arrow controls for multi-slide viewports and banners.

---

## Quick Start

```jsx
import React, { useState } from "react";
import { CklSlides } from "@components-kit/react-ckl-slides";

export function Example() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return <CklSlides total={5} value={currentSlide} onChange={setCurrentSlide} />;
}
```

---

## Props

| Prop       | Type       | Default     | Description                        |
| :--------- | :--------- | :---------- | :--------------------------------- |
| `total`    | `number`   | `1`         | Total number of slide indicators   |
| `value`    | `number`   | `0`         | Active 0-based slide index         |
| `onChange` | `Function` | `undefined` | Callback fired on slide navigation |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-slides.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
