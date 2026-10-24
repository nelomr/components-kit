<div align="center">

# CklSideNav

### Multi-Level Collapsible Side Navigation for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#quick-start) •
[**Props & API**](#props) •
[**Events**](#events) •
[**Navigation Schema**](#navigation-item-structure)

---

</div>

## Overview

`CklSideNav` is a collapsible vertical sidebar navigation bar featuring nested submenu support, top/bottom item partitioning, and smooth expand/collapse transitions.

---

## Quick Start

```vue
<script setup>
import { ref } from "vue";
import { CklSideNav } from "@components-kit/vue-ckl-side-nav";

const activeItem = ref("dashboard");

const topNavItems = [
  { id: "dashboard", text: "Dashboard", icon: "ial-home" },
  { id: "settings", text: "Settings", icon: "ial-settings" },
];

const bottomNavItems = [{ id: "profile", text: "My Profile", icon: "ial-user" }];

const handleItemClick = (item) => {
  activeItem.value = item.id;
};
</script>

<template>
  <ckl-side-nav
    :items="topNavItems"
    :bottom-items="bottomNavItems"
    :selected-nav-item="activeItem"
    @handle-click="handleItemClick"
  />
</template>
```

---

## Props

| Prop                  | Type      | Default | Required | Description                                 |
| :-------------------- | :-------- | :------ | :------: | :------------------------------------------ |
| `items`               | `Array`   | `[]`    | **Yes**  | Primary navigation items                    |
| `bottomItems`         | `Array`   | `[]`    |    No    | Secondary navigation items pinned to bottom |
| `selectedNavItem`     | `String`  | `null`  | **Yes**  | ID of the currently active item             |
| `initialExtendedMenu` | `Boolean` | `false` |    No    | Initial expanded sidebar state              |

---

## Events

| Event          | Payload        | Description                             |
| :------------- | :------------- | :-------------------------------------- |
| `handle-click` | `item: object` | Emitted when clicking a navigation item |

## Styling

This component ships **zero bundled CSS**. To apply the visual styling, import either the global stylesheet or this component's scoped stylesheet in your application:

```javascript
// Global stylesheet (all components):
import "@components-kit/styles/css";

// Or scoped component stylesheet:
import "@components-kit/styles/css/components/ckl-side-nav.css";
```

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
