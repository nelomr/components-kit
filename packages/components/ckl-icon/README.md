<div align="center">

# 💎 CklIcon

### Base SVG Icon Wrapper & Styler for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#-quick-start) •
[**Props & API**](#-props) •
[**Size Scale**](#-size-scale)

---

</div>

## ✦ Overview

`CklIcon` serves as the base presentational container for raw SVG components, applying theme colors, standardized dimension scales, and interactive states.

---

## 🚀 Quick Start

```vue
<script setup>
import { CklIcon } from '@components-kit/ckl-icon';
import MyCustomSvg from './assets/custom-icon.svg';
</script>

<template>
  <ckl-icon
    :icon="MyCustomSvg"
    size="large"
    color="primary"
    cursor="pointer"
    @click="handleClick"
  />
</template>
```

---

## 🛠 Props

| Prop | Type | Default | Accepted Values | Description |
| :--- | :--- | :--- | :--- | :--- |
| `icon` | `Object` | `{}` | Any SVG component | Raw Vue SVG component to render |
| `color` | `String` | `'primary'` | `'primary'`, `'secondary'`, `'grey'`, `'info'`, `'success'`, `'warning'`, `'error'`, `'clear'`, `'white'` | Color token |
| `size` | `String` | `'default'` | `'default'`, `'small'`, `'medium'`, `'large'`, `'xlarge'`, `'big'` | Size scaling token |
| `cursor` | `String` | `'default'` | `'default'`, `'pointer'` | Hover cursor style |
| `disabled` | `Boolean` \| `Function` | `false` | `true`, `false`, `() => boolean` | Disabled state |
| `dataSelector`| `String` | `''` | Any string | Test attribute selector |

---

## ⚡ Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `click` | — | Emitted on click when the icon is not disabled |

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
