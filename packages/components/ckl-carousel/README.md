<div align="center">

# 🎠 CklCarousel

### Responsive, Accessible Multi-Item Track Carousel for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-brightgreen?style=flat-square)](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
[![Touch & Keyboard](https://img.shields.io/badge/Nav-Touch%20%7C%20Drag%20%7C%20Keyboard-blue?style=flat-square)](./)

<br/>

[**Live Demo**](#-storybook-demo) •
[**Quick Start**](#-quick-start) •
[**Props & API**](#-props) •
[**Events**](#-events) •
[**Slots**](#-slots) •
[**Accessibility**](#-accessibility)

---

</div>

## ✦ Overview

`CklCarousel` is an carousel and slider component engineered for Vue 3. It provides seamless multi-item track sliding, responsive container width calculation, full touch/drag support, and strict compliance with the **W3C ARIA Carousel Pattern**.

### Key Highlights

- 📱 **Fluid Responsiveness**: Automatically recalculates visible items and track translation based on viewport and container width.
- 🎛️ **Two-Way Binding**: Full `v-model` support for external synchronization of the active slide index.
- 🎨 **Slot-Driven Content**: Render any custom card, image, or dynamic component within the `#slide` slot.
- ♿ **W3C ARIA Accessible**: Includes `role="region"`, `role="group"`, `aria-roledescription="slide"`, and `aria-hidden` attributes for off-screen items.
- ⌨️ **Keyboard Navigation**: Native arrow key cycling and accessible navigation buttons.

---

## 🚀 Quick Start

### 1. Installation

```bash
yarn add @components-kit/ckl-carousel
```

### 2. Basic Example

```vue
<script setup>
import { ref } from 'vue';
import { CklCarousel } from '@components-kit/ckl-carousel';

const currentSlide = ref(0);

const items = [
  { id: 1, title: 'Slide Alpha', description: 'Modular frontend solutions' },
  { id: 2, title: 'Slide Beta', description: 'CSS variable theming' },
  { id: 3, title: 'Slide Gamma', description: 'Zero-config build pipelines' },
  { id: 4, title: 'Slide Delta', description: 'WCAG accessible UI patterns' },
];
</script>

<template>
  <div class="carousel-container">
    <ckl-carousel
      v-model="currentSlide"
      :items="items"
      :item-width="280"
      :gap="20"
      :slides-to-scroll="1"
      :transition-duration="350"
    >
      <template #slide="{ item, index }">
        <div class="slide-card">
          <span class="slide-badge">#{{ index + 1 }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </template>
    </ckl-carousel>
  </div>
</template>

<style scoped>
.carousel-container {
  max-width: 900px;
  margin: 0 auto;
}
.slide-card {
  padding: 24px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
</style>
```

---

## 🛠 Props

| Prop                 | Type     | Default | Required | Description                                                      |
| :------------------- | :------- | :------ | :------: | :--------------------------------------------------------------- |
| `items`              | `Array`  | `[]`    | **Yes**  | Array of data objects to render within slides.                   |
| `itemWidth`          | `Number` | —       | **Yes**  | Fixed width (in pixels) for each individual slide item.          |
| `gap`                | `Number` | `16`    |    No    | Spacing between adjacent slides (in pixels).                     |
| `slidesToScroll`     | `Number` | `1`     |    No    | Number of slide items advanced per navigation trigger.           |
| `transitionDuration` | `Number` | `300`   |    No    | Slide transition animation duration (in milliseconds).           |
| `itemKey`            | `String` | `'id'`  |    No    | Key identifier on each item used for Vue's `:key`.               |
| `visibleItems`       | `Number` | `null`  |    No    | Explicit override for number of visible items (skips auto-calc). |
| `modelValue`         | `Number` | `0`     |    No    | Two-way bound active slide index (`v-model`).                    |

---

## ⚡ Events

| Event               | Payload           | Description                                                                         |
| :------------------ | :---------------- | :---------------------------------------------------------------------------------- |
| `update:modelValue` | `(index: number)` | Emitted whenever the active slide index changes via navigation or user interaction. |

---

## 🧩 Slots

| Slot Name | Scoped Props                   | Description                                                        |
| :-------- | :----------------------------- | :----------------------------------------------------------------- |
| `#slide`  | `{ item: any, index: number }` | Scoped slot to render custom template content for each slide item. |

---

## ♿ Accessibility (A11y)

The carousel is engineered to conform to the **W3C WAI-ARIA Carousel Pattern**:

- **Region Role**: The root container uses `role="region"` and `aria-roledescription="carousel"`.
- **Slide Groups**: Individual items use `role="group"` and `aria-roledescription="slide"`.
- **Offscreen Hidden**: Slides outside the visible viewport automatically receive `aria-hidden="true"`.
- **Navigation Controls**: Next and Previous controls feature explicit `aria-label` tags for screen readers.

---

## 🧪 Testing

```bash
# Run Vitest test suite for ckl-carousel
yarn --cwd packages/components/ckl-carousel test
```

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
