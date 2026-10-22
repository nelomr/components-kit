<div align="center">

# ⏳ CklLoader

### Minimalist Animated Activity Indicator for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#-quick-start) •
[**Styling & Theming**](#-styling--theming)

---

</div>

## ✦ Overview

`CklLoader` is a lightweight, CSS-animated loader spinner indicator designed for asynchronous operations, data fetching states, and page transitions.

---

## 🚀 Quick Start

```vue
<script setup>
import { CklLoader } from '@components-kit/ckl-loader';
</script>

<template>
  <div v-if="isLoading" class="loading-overlay">
    <ckl-loader />
  </div>
</template>
```

---

## 🎨 Styling & Theming

The loader inherits brand colors and animation timing from the theme tokens:

```scss
.ckl-loader {
  // Customizable CSS variables
  --ckl-loader-color: var(--ckl-primary-color, #1d3056);
}
```

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
