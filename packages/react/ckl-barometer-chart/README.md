<div align="center">

# CklBarometerChart

### Animated SVG Speedometer and Gauge Chart for React 19

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props)

---

</div>

## Overview

`CklBarometerChart` renders an SVG semi-circular gauge or barometer with animated needle rotation based on minimum, maximum, and current values.

---

## Quick Start

```jsx
import React from "react";
import { CklBarometerChart } from "@components-kit/react-ckl-barometer-chart";

export function Example() {
  return (
    <CklBarometerChart
      min={0}
      max={100}
      value={75}
      ranges={[
        { min: 0, max: 50, color: "success" },
        { min: 50, max: 80, color: "warning" },
        { min: 80, max: 100, color: "error" },
      ]}
    />
  );
}
```

---

## Props

| Prop     | Type     | Default | Accepted Values       | Description                           |
| :------- | :------- | :------ | :-------------------- | :------------------------------------ |
| `min`    | `number` | `0`     | Any integer / float   | Lower boundary of the gauge           |
| `max`    | `number` | `100`   | Greater than min      | Upper boundary of the gauge           |
| `value`  | `number` | `0`     | Between min and max   | Current reading to display            |
| `ranges` | `Array`  | `[]`    | Range segment objects | Colored zones representing thresholds |

---

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-barometer-chart.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
