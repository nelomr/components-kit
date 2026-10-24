<div align="center">

# CklCarousel

### Responsive, Accessible Multi-Item Track Carousel for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklCarousel` provides an accessible, responsive track carousel supporting touch gestures, keyboard controls, multi-item pagination, and custom step transitions.

---

## Quick Start

```jsx
import React, { useState } from "react";
import { CklCarousel } from "@components-kit/react-ckl-carousel";

export function Example() {
  const [activePage, setActivePage] = useState(0);

  return (
    <CklCarousel value={activePage} onChange={setActivePage} visibleItems={3}>
      <div className="card">Slide 1</div>
      <div className="card">Slide 2</div>
      <div className="card">Slide 3</div>
      <div className="card">Slide 4</div>
    </CklCarousel>
  );
}
```

---

## Props

| Prop           | Type        | Default     | Description                                   |
| :------------- | :---------- | :---------- | :-------------------------------------------- |
| `value`        | `number`    | `0`         | Active page or slide index                    |
| `onChange`     | `Function`  | `undefined` | Callback fired on slide navigation            |
| `visibleItems` | `number`    | `1`         | Number of visible items in the track viewport |
| `gap`          | `number`    | `16`        | Pixel gap spacing between items               |
| `children`     | `ReactNode` | `undefined` | Child elements representing carousel slides   |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-carousel.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
