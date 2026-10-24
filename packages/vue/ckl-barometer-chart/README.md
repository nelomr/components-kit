<div align="center">

# CklBarometerChart

### Animated SVG Speedometer and Gauge Chart for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props) •
[**Custom Ranges**](#custom-ranges)

---

</div>

## Overview

`CklBarometerChart` is an animated gauge / speedometer component built for Vue 3. It calculates needle rotation angles in real time based on a normalized percentage (0–100%) and displays contextual threshold labels.

---

## Quick Start

```vue
<script setup>
import { ref } from "vue";
import { CklBarometerChart } from "@components-kit/vue-ckl-barometer-chart";

const score = ref(82);
</script>

<template>
  <div class="chart-wrapper">
    <ckl-barometer-chart :percentage="score" size="240px" />
  </div>
</template>
```

---

## Props

| Prop         | Type     | Default                | Required | Description                                 |
| :----------- | :------- | :--------------------- | :------: | :------------------------------------------ |
| `percentage` | `Number` | —                      | **Yes**  | Current gauge value from `0` to `100`       |
| `size`       | `String` | `'100%'`               |    No    | Width of the gauge container                |
| `ranges`     | `Array`  | _Default 5-band scale_ |    No    | Range label mapping `[{ min, max, label }]` |

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
