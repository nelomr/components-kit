<div align="center">

# 🍞 CklBreadcrumb

### Hierarchical Trail Navigation for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#-quick-start) •
[**Props & API**](#-props) •
[**Events**](#-events)

---

</div>

## ✦ Overview

`CklBreadcrumb` displays the current location within a site or app hierarchy, allowing users to navigate up to parent levels.

---

## 🚀 Quick Start

```vue
<script setup>
import { CklBreadcrumb } from '@components-kit/ckl-breadcrumb';

const breadcrumbs = [
  { name: 'home', text: 'Home' },
  { name: 'settings', text: 'Settings' },
  { name: 'profile', text: 'User Profile' },
];

const handleNodeClick = ({ name, params }) => {
  console.log('Navigate to:', name, params);
};
</script>

<template>
  <ckl-breadcrumb :path="breadcrumbs" @node-click="handleNodeClick" />
</template>
```

---

## 🛠 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `path` | `Array` | `[]` | Array of path nodes: `[{ name: string, text: string, params?: object }]` |

---

## ⚡ Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `node-click` | `{ name: string, params: object }` | Triggered when clicking a breadcrumb item |

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
