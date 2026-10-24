<div align="center">

# CklTruncateText

### Intelligent Text & Array Clamping with Ellipses for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props) •
[**Array Clamping**](#array-clamping)

---

</div>

## Overview

`CklTruncateText` prevents text overflow in cramped UI spaces. It supports character limits for strings and smart item limits for arrays (e.g. tag lists) displaying `and N more`.

---

## Quick Start

```vue
<script setup>
import { CklTruncateText } from "@components-kit/vue-ckl-truncate-text";
</script>

<template>
  <div>
    <!-- String Clamping -->
    <ckl-truncate-text
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      :character-limit="20"
    />
    <!-- Renders: Lorem ipsum dolor si... -->

    <!-- Array Clamping -->
    <ckl-truncate-text
      :text="['Vue', 'Vite', 'Storybook', 'Vitest', 'TypeScript']"
      separator=", "
      :character-limit="15"
    />
    <!-- Renders: Vue, Vite and 3 more -->
  </div>
</template>
```

---

## Props

| Prop             | Type                | Default | Description                                   |
| :--------------- | :------------------ | :------ | :-------------------------------------------- |
| `text`           | `String` \| `Array` | `''`    | Input text string or array of tags            |
| `characterLimit` | `Number`            | `0`     | Maximum character length before truncation    |
| `separator`      | `String`            | `''`    | Separator string used when `text` is an array |

## Styling

This component ships **zero bundled CSS**. To apply the global design system styles and CSS variables, import the stylesheet in your application root:

```javascript
import "@components-kit/styles/css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
