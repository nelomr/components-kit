<div align="center">

# 📑 CklVerticalTabs

### Stacked Vertical Tab List with Error Indicators & Dual Icons for Vue 3

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Stable-brightgreen?style=flat-square)](./)

<br/>

[**Quick Start**](#-quick-start) •
[**Props & API**](#-props) •
[**Events**](#-events) •
[**Error State Highlighting**](#-error-indicators)

---

</div>

## ✦ Overview

`CklVerticalTabs` renders a stacked vertical navigation list ideal for multi-step wizards, account settings pages, and form section routing. It natively supports left error alert badges and right status icons.

---

## 🚀 Quick Start

```vue
<script setup>
import { ref } from 'vue';
import { CklVerticalTabs } from '@components-kit/ckl-vertical-tabs';

const currentTab = ref('personal');

const tabs = [
  { value: 'personal', name: 'Personal Details' },
  { value: 'billing', name: 'Billing & Invoices' },
  { value: 'security', name: 'Security & 2FA' },
];

const formErrors = ref({
  billing: true, // Shows error alert icon next to Billing
});
</script>

<template>
  <ckl-vertical-tabs
    :tabs="tabs"
    :selected-tab="currentTab"
    :tab-errors="formErrors"
    @select-tab="(val) => (currentTab = val)"
  />
</template>
```

---

## 🛠 Props

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `tabs` | `Array` | — | **Yes** | Tab definitions `[{ value: string, name: string, disabled?: boolean }]` |
| `selectedTab` | `String` | `''` | No | Identifier value of the active tab |
| `tabErrors` | `Object` | `null` | No | Map of tab values to boolean error indicators (`{ [tabValue]: boolean }`) |
| `primaryIcon` | `Object` \| `String` | `'ial-alert'` | No | Icon rendered when an error is present |
| `primaryIconColor`| `String` | `'error'` | No | Color token for the primary error icon |
| `secondaryIcons`| `Object` | `null` | No | Map of secondary right-side icons per tab |

---

## ⚡ Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `select-tab` | `tabValue: string` | Emitted when clicking or activating a tab via keyboard |

---

## 📄 License

Internal workspace package licensed under [MIT](../../LICENSE).
