<div align="center">

# 🎞️ CklSlides

### Viewport Slide Bullet & Indicator Controls for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#-quick-start) •
[**Props & API**](#-props) •
[**Events**](#-events)

---

</div>

## ✦ Overview

`CklSlides` provides navigation dots (bullets) and directional arrows for step wizards, multi-page carousels, and onboarding flows.

---

## 🚀 Quick Start

```vue
<script setup>
import { ref } from 'vue';
import { CklSlides } from '@components-kit/ckl-slides';

const activeSlide = ref('slide-1');
const slideList = ['slide-1', 'slide-2', 'slide-3'];
</script>

<template>
  <ckl-slides
    :slides="slideList"
    :selected="activeSlide"
    @select-slide="(slide) => (activeSlide = slide)"
  />
</template>
```

---

## 🛠 Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `slides` | `Array` | `[]` | **Yes** | Array of slide identifiers |
| `selected` | `String` \| `Number` | `''` | **Yes** | Identifier of the active slide |

---

## ⚡ Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `select-slide` | `slide: string \| number` | Emitted when clicking a bullet or navigation arrow |

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
