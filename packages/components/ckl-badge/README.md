<div align="center">

# 🏷️ CklBadge

### Flexible Status Indicators, Pills, and Notification Badges for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#-quick-start) •
[**Props & API**](#-props) •
[**Variants & Shapes**](#-variants--shapes) •
[**Color Tokens**](#-color-tokens)

---

</div>

## ✦ Overview

`CklBadge` is a compact, customizable badge component used for counts, tags, status alerts, and categorization pills across the application.

---

## 🚀 Quick Start

```vue
<script setup>
import { CklBadge } from '@components-kit/ckl-badge';
</script>

<template>
  <div class="badges-row">
    <!-- Standard Primary Badge -->
    <ckl-badge color="primary">Active</ckl-badge>

    <!-- Outlined Success Pill -->
    <ckl-badge color="success" shape="oval" outlined>Verified</ckl-badge>

    <!-- Small Circular Counter -->
    <ckl-badge color="error" size="small" shape="circle">9</ckl-badge>
  </div>
</template>
```

---

## 🛠 Props

| Prop | Type | Default | Accepted Values | Description |
| :--- | :--- | :--- | :--- | :--- |
| `color` | `String` | `'primary'` | `'primary'`, `'secondary'`, `'error'`, `'success'`, `'warning'`, `'info'`, `'purple'`, `'mid-blue'`, `'transparent'` | Brand or semantic color token |
| `size` | `String` | `'large'` | `'large'`, `'medium'`, `'small'`, `'x-small'` | Dimensional scale of the badge |
| `shape` | `String` | `'oval'` | `'square'`, `'oval'`, `'circle'` | Geometric boundary shape |
| `outlined` | `Boolean` | `false` | `true`, `false` | When true, renders with transparent background and colored outline |

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
