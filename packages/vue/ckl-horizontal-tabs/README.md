<div align="center">

# CklHorizontalTabs

### Accessible Tab Bar Navigation with Tooltips and Icons for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props) •
[**Events**](#events) •
[**Tab Model**](#tab-object-structure)

---

</div>

## Overview

`CklHorizontalTabs` renders an interactive horizontal tab bar with keyboard cycling (Enter / Space), optional icon slots with embedded tooltips, and disabled states.

---

## Quick Start

```vue
<script setup>
import { ref } from "vue";
import { CklHorizontalTabs } from "@components-kit/vue-ckl-horizontal-tabs";

const activeTab = ref("overview");

const tabItems = [
  { id: "overview", text: "Overview" },
  { id: "analytics", text: "Analytics" },
  { id: "settings", text: "Settings", disabled: false },
];
</script>

<template>
  <ckl-horizontal-tabs
    :tabs="tabItems"
    :selected="activeTab"
    @select-tab="(id) => (activeTab = id)"
  />
</template>
```

---

## Props

| Prop       | Type                 | Default | Required | Description                                   |
| :--------- | :------------------- | :------ | :------: | :-------------------------------------------- |
| `tabs`     | `Array`              | `[]`    | **Yes**  | Array of tab items (see Tab Object Structure) |
| `selected` | `String` \| `Number` | `''`    |    No    | ID of currently active tab                    |

---

## Events

| Event        | Payload                   | Description                    |
| :----------- | :------------------------ | :----------------------------- |
| `select-tab` | `tabId: string \| number` | Emitted when a tab is selected |

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-horizontal-tabs.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
