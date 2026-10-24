<script>
export default {
  name: "CklHorizontalTabs",
};
</script>

<script setup>
import { CklTooltip } from "@components-kit/vue-ckl-tooltip";
import { IalIcon } from "@components-kit/assets/vue";
import {
  isTabDisabled,
  getTabText,
  getTabSelector,
  getTabIconSelector,
} from "@components-kit/core";

const emit = defineEmits(["select-tab"]);
const props = defineProps({
  /**
   * Array of tabs.
   */
  tabs: {
    required: true,
    type: Array,
    default: () => [],
  },
  /**
   * Selected tab.
   */
  selected: {
    type: [String, Number],
    default: "",
  },
});

const changeTab = (tab) => {
  if (!isTabDisabled(tab)) {
    emit("select-tab", tab.id);
  }
};

const hasIcon = (tab) => {
  return !!tab.icon;
};

const isActiveTab = (tab) => {
  return props.selected === tab.id;
};

const disabledTab = (tab) => isTabDisabled(tab);

const isFocusable = (item) => {
  return disabledTab(item) ? null : "0";
};

const getClassesTab = (tab) => {
  let tabClasses = [
    {
      "ckl-horizontal-tabs__title--active": isActiveTab(tab),
      "ckl-horizontal-tabs__title--disabled": disabledTab(tab),
    },
  ];

  if (tab.class) {
    tabClasses = tabClasses.concat(tab.class);
  }

  return tabClasses;
};
</script>

<template>
  <div class="ckl-horizontal-tabs">
    <ul class="ckl-horizontal-tabs__list">
      <li
        v-for="(tab, index) in tabs"
        :key="`tab-${tab.id}`"
        class="ckl-horizontal-tabs__title"
        :class="getClassesTab(tab)"
        :tabindex="isFocusable(tab)"
        :data-selector="getTabSelector(tab, index)"
        @click="changeTab(tab)"
        @keyup.enter="changeTab(tab)"
        @keyup.space="changeTab(tab)"
      >
        <span class="ckl-horizontal-tabs__title-label">
          {{ getTabText(tab) }}
        </span>
        <ckl-tooltip
          v-if="hasIcon(tab)"
          :text="tab.icon.tooltipText"
          :position="tab.icon.tooltipPosition"
          class="ckl-horizontal-tabs__icon"
        >
          <ial-icon
            :class="tab.icon.class"
            size="small"
            cursor="pointer"
            :icon="tab.icon.icon"
            :color="tab.icon.color"
            :disabled="disabledTab(tab)"
            :data-selector="getTabIconSelector(tab.icon, index)"
          />
        </ckl-tooltip>
      </li>
    </ul>
  </div>
</template>
