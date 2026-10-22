<div align="center">

# 🎨 @components-kit/assets

### Curated SVG Icon Registry & Dynamic Resolver for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tree Shakeable](https://img.shields.io/badge/Tree--Shakeable-Yes-brightgreen?style=flat-square)](https://vite.dev/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-blue?style=flat-square)](./)

<br/>

[**Icon Gallery**](#-icon-gallery) •
[**Quick Start**](#-quick-start) •
[**Component API**](#-ialicon-component-api) •
[**Dynamic Registration**](#-dynamic-icon-registration) •
[**Styling & Themes**](#-styling--themes)

---

</div>

## ✦ Overview

`@components-kit/assets` is the centralized asset and icon delivery system for Components Kit. It features:

- 🎯 **Curated Asset Footprint**: Strictly maintains only actively utilized vector icons, eliminating bundle bloat.
- ⚡ **Asynchronous Dynamic Resolution**: Resolves and renders SVGs on demand using `defineAsyncComponent`.
- 🔌 **Extensible Icon Registry**: Register custom SVGs at runtime via `registerIcons`.
- 🎨 **Themeable Icons**: Out-of-the-box support for color classes and customizable sizes.

---

## 🖼 Icon Gallery

The package includes **10 actively curated icons**:

| Icon Name | Category | Primary Use Case | Preview Token |
| :--- | :--- | :--- | :--- |
| `ial-alert` | System | Warnings, critical alerts, and validation messages | `⚠ alert` |
| `ial-arrow` | Navigation | Directional indicators and trail pointers | `→ arrow` |
| `ial-arrow-down` | Navigation | Dropdown toggles, accordions, and selectors | `↓ arrow-down` |
| `ial-arrow-pointer-down`| Navigation | Pointer navigation (downward action) | `▼ pointer-down` |
| `ial-arrow-pointer-left`| Navigation | Pagination previous and back navigation | `◀ pointer-left` |
| `ial-arrow-pointer-right`| Navigation | Pagination next and forward navigation | `▶ pointer-right` |
| `ial-download` | Action | File export, report download, and asset saving | `⤓ download` |
| `ial-home` | Navigation | Root navigation, dashboard, and home link | `⌂ home` |
| `ial-settings` | System | Configuration, preferences, and admin tools | `⚙ settings` |
| `ial-user` | Identity | User profiles, account settings, and avatars | `👤 user` |

---

## 🚀 Quick Start

### 1. Installation

Install the package within your workspace:

```bash
yarn add @components-kit/assets
```

### 2. Basic Usage

Import `IalIcon` and use any registered icon name:

```vue
<script setup>
import { IalIcon } from '@components-kit/assets';
</script>

<template>
  <div class="icon-group">
    <!-- Standard Primary Icon -->
    <ial-icon icon="ial-home" size="medium" color="primary" />

    <!-- Action Icon with Pointer Cursor -->
    <ial-icon
      icon="ial-download"
      size="large"
      color="success"
      cursor="pointer"
      @click="handleDownload"
    />

    <!-- Warning State with Custom Size -->
    <ial-icon icon="ial-alert" size="xlarge" color="warning" />
  </div>
</template>
```

---

## 🛠 `IalIcon` Component API

### Props

| Prop | Type | Default | Accepted Values | Description |
| :--- | :--- | :--- | :--- | :--- |
| `icon` | `String` \| `Object` | `''` *(required)* | Any registered icon name or SVG component | Name of the icon or raw component object |
| `color` | `String` | `'primary'` | `'primary'`, `'secondary'`, `'grey'`, `'info'`, `'success'`, `'warning'`, `'error'`, `'clear'`, `'white'` | Color variant token |
| `size` | `String` | `'default'` | `'default'`, `'small'`, `'medium'`, `'large'`, `'xlarge'`, `'big'` | Size scaling token |
| `cursor` | `String` | `'default'` | `'default'`, `'pointer'` | Hover cursor style |
| `disabled` | `Boolean` \| `Function` | `false` | `true`, `false`, `() => boolean` | Applies disabled opacity and disables interaction |
| `dataSelector`| `String` | `''` | Any string | Testing attribute selector (`data-selector`) |

### Size Matrix

| Size Token | Rendered Dimensions | Usage |
| :--- | :--- | :--- |
| `small` | `12px × 12px` | Badges, inline metadata, and tags |
| `default` | `16px × 16px` | Compact lists and secondary actions |
| `medium` | `24px × 24px` | Standard button and navigation icons |
| `large` | `32px × 32px` | Card headers and prominent actions |
| `xlarge` | `48px × 48px` | Empty states and hero banners |
| `big` | `64px × 64px` | Splash screens and modal illustrations |

---

## 🔌 Dynamic Icon Registration

Extend the registry at application startup with project-specific SVG icons:

```javascript
import { registerIcons, getIconList } from '@components-kit/assets';
import CustomLogo from './assets/custom-logo.svg';

// Register custom icons
registerIcons({
  'my-custom-logo': CustomLogo,
});

// Retrieve all available icon names
const availableIcons = getIconList();
console.log(availableIcons);
// ['ial-alert', 'ial-arrow', ..., 'my-custom-logo']
```

---

## 🎨 Styling & Themes

`IalIcon` ships with companion SCSS styles adhering to BEM naming:

```scss
// Optional: import default styling directly
@use '@components-kit/assets/style';
```

Classes applied dynamically:
- `.ial-icon--color-[variant]`
- `.ial-icon--size-[token]`
- `.ial-icon--cursor-[type]`
- `.ial-icon--disabled`

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
