<div align="center">

# 💬 CklTooltip

### Dynamic Floating Tooltips & Popovers with Teleport for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#-quick-start) •
[**Props & API**](#-props) •
[**Events**](#-events) •
[**Slots**](#-slots) •
[**Teleport to Body**](#-teleport-to-body)

---

</div>

## ✦ Overview

`CklTooltip` is a versatile floating popover and tooltip component for Vue 3. It supports hover, click, and programmatic manual triggers, four-direction viewport alignment, and native Vue 3 `Teleport` to prevent clipping inside overflow-hidden parent containers.

---

## 🚀 Quick Start

```vue
<script setup>
import { CklTooltip } from '@components-kit/ckl-tooltip';
</script>

<template>
  <div class="tooltip-demo">
    <!-- Hover Tooltip on Button -->
    <ckl-tooltip text="Export current dataset to CSV" position="top">
      <button class="btn">Export</button>
    </ckl-tooltip>

    <!-- Click-Triggered Rich Tooltip -->
    <ckl-tooltip trigger="click" position="bottom" attach-to-body>
      <button class="btn">Help Details</button>
      <template #tooltip>
        <div class="rich-content">
          <h4>Need assistance?</h4>
          <p>Contact your workspace administrator for elevated permissions.</p>
        </div>
      </template>
    </ckl-tooltip>
  </div>
</template>
```

---

## 🛠 Props

| Prop | Type | Default | Accepted Values | Description |
| :--- | :--- | :--- | :--- | :--- |
| `text` | `String` | `''` | Any string | Plain text displayed inside the tooltip |
| `color` | `String` | `'primary'` | `'primary'`, `'success'`, `'error'`, `'warning'`, `'info'` | Color scheme token |
| `position` | `String` | `'bottom'` | `'top'`, `'bottom'`, `'left'`, `'right'` | Floating alignment position |
| `trigger` | `String` | `'hover'` | `'hover'`, `'click'`, `'manual'` | Interaction trigger mode |
| `visible` | `Boolean` | `false` | `true`, `false` | Visibility state when `trigger="manual"` |
| `disabled` | `Boolean` | `false` | `true`, `false` | When true, tooltip does not appear |
| `attachToBody`| `Boolean` | `false` | `true`, `false` | Renders tooltip in `<body>` via Vue 3 `<Teleport>` |
| `inBodyClass` | `String` | `''` | Any class name | Additional CSS class applied when teleported to body |
| `noPadding` | `Boolean` | `false` | `true`, `false` | Removes default inner container padding |
| `dataSelector`| `String` | `'tooltip'` | Any string | Testing identifier selector |

---

## ⚡ Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `click-outside` | — | Emitted when clicking outside a visible click-triggered tooltip |

---

## 🧩 Slots

| Slot | Description |
| :--- | :--- |
| `default` | Trigger host element (button, link, icon, or text) |
| `#tooltip` | Rich HTML/Vue template content to render inside the tooltip popup |

---

## 🌐 Teleport to Body

When nesting tooltips inside tables, sidebars, or modal dialogs with `overflow: hidden`, set `attach-to-body`:

```vue
<ckl-tooltip text="Teleported outside clipped bounds" attach-to-body position="right">
  <span>Hover me</span>
</ckl-tooltip>
```

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
