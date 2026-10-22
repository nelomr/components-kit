<script>
export default {
  name: "CklHorizontalTabs",
};
</script>

<script setup>
import { CklTooltip } from "@components-kit/ckl-tooltip";
import { IalIcon } from "@components-kit/assets";

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
  if (!disabledTab(tab)) {
    emit("select-tab", tab.id);
  }
};

const getTabText = (tab) => {
  return tab.text instanceof Function ? tab.text() : tab.text;
};

const hasIcon = (tab) => {
  return !!tab.icon;
};

const isActiveTab = (tab) => {
  return props.selected === tab.id;
};

const disabledTab = (tab) => {
  return tab.disabled instanceof Function ? tab.disabled() : tab.disabled;
};

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

const selector = (item, index) => {
  let selector;

  if (item.selector instanceof Function) {
    selector = item.selector();
  } else if (item.selector) {
    selector = item.selector;
  } else {
    selector = `tab-${item.id || ""}-${index}`;
  }
  return selector;
};

const iconSelector = (icon, index) => {
  let selector = icon.selector || null;

  if (selector && selector instanceof Function) {
    selector = selector();
  }

  return `tab-icon-${selector || "selector"}-${index}`;
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
        :data-selector="selector(tab, index)"
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
            :data-selector="iconSelector(tab.icon, index)"
          />
        </ckl-tooltip>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" src="./ckl-horizontal-tabs.scss"></style>
