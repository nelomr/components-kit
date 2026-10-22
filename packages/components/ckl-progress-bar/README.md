<div align="center">

# 📊 CklProgressBar

### Linear Progress Indicator with Dynamic State Colors for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#-quick-start) •
[**Props & API**](#-props) •
[**Color Thresholds**](#-color-thresholds)

---

</div>

## ✦ Overview

`CklProgressBar` displays completion status of workflows, uploads, and benchmarks with dynamic color transitions reflecting completion tiers.

---

## 🚀 Quick Start

```vue
<script setup>
import { CklProgressBar } from '@components-kit/ckl-progress-bar';
</script>

<template>
  <ckl-progress-bar :value="85" />
</template>
```

---

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `Number` | `0` | Progress percentage value (`0` to `100`) |

---

## 🎨 Color Thresholds

The indicator automatically transitions color variants:
- **`<= 25%`**: Error / Critical (`error`)
- **`26% - 74%`**: Warning (`warning`)
- **`75% - 99%`**: Acceptable (`acceptable`)
- **`100%`**: Success / Completed (`success`)

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
