<div align="center">

# CklPagination

### Responsive Page Navigation with Direct Jumping and Ellipses for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props) •
[**Events**](#events)

---

</div>

## Overview

`CklPagination` delivers pagination controls for tables, product grids, and search results. It dynamically calculates surrounding page ranges and ellipses based on total pages.

---

## Quick Start

```vue
<script setup>
import { ref } from "vue";
import { CklPagination } from "@components-kit/vue-ckl-pagination";

const currentPage = ref(1);
const totalPages = ref(20);
</script>

<template>
  <ckl-pagination
    :num-pages="totalPages"
    :current="currentPage"
    @page-updated="(page) => (currentPage = page)"
  />
</template>
```

---

## Props

| Prop         | Type     | Default | Required | Description                                        |
| :----------- | :------- | :------ | :------: | :------------------------------------------------- |
| `numPages`   | `Number` | `1`     | **Yes**  | Total number of available pages                    |
| `current`    | `Number` | `0`     |    No    | Active page index (1-based)                        |
| `itemToShow` | `Number` | `7`     |    No    | Target number of navigation slots (numbers + dots) |

---

## Events

| Event          | Payload        | Description                                                                |
| :------------- | :------------- | :------------------------------------------------------------------------- |
| `page-updated` | `page: number` | Emitted when a user selects a page or navigates with next/previous buttons |

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-pagination.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
