<script>
export default { name: "CklVerticalTabs" };
</script>
<script setup>
import { computed } from "vue";
import { IalIcon } from "@components-kit/assets";
const emit = defineEmits(["select-tab"]);

const props = defineProps({
  /**
   * Array of tabs to be shown.
   */
  tabs: {
    required: true,
    type: Array,
  },
  /**
   * The current tab selected, should be the tab's value attribute.
   */
  selectedTab: {
    type: String,
    default: "",
  },
  /**
   * Object with the tab names(keys), with value to true, that should show an alert icon.
   */
  tabErrors: {
    type: Object,
    default: () => null,
  },
  /**
   * The icon to be shown on the left side, by default is an error alert icon.
   */
  primaryIcon: {
    type: Object,
    default: () => null,
  },
  /**
   * The class or classes to be applied to the icon to define color
   */
  primaryIconColor: {
    type: String,
    default: "error",
  },
  /**
   * The icon to be shown on the right side.
   */
  secondaryIcons: {
    type: Object,
    default: () => null,
  },
});
const selector = (tabValue) => `vertical-tab-${tabValue}`;

const isActiveTab = (tab) => props.selectedTab === tab.value;

const getClassesTab = (tab) => {
  let tabClasses = [
    {
      "ckl-vertical-tabs__element--active": isActiveTab(tab),
      "ckl-vertical-tabs__element--disabled": disabledItem(tab),
    },
  ];

  if (tab.class) {
    return tabClasses.concat(tab.class);
  }

  return tabClasses;
};

const goToVirtualStep = (tab) => {
  if (!disabledItem(tab)) {
    emit("select-tab", tab.value);
  }
};

const disabledItem = (item) => {
  if (item && item.disabled instanceof Function) {
    return item.disabled();
  }

  return !!item.disabled;
};

const isFocusable = (item) => {
  if (disabledItem(item)) {
    return null;
  }

  return "0";
};

const iconColor = (item) => item.color || null;

const stepPrimaryIcon = computed(() => {
  if (props.primaryIcon) {
    return props.primaryIcon;
  }
  return "ial-alert";
});
</script>

<template>
  <ul class="ckl-vertical-tabs">
    <li
      v-for="(tab, indexTab) in tabs"
      :key="`vertical-tab-${tab.value}`"
      :data-selector="selector(tab.value)"
      class="ckl-vertical-tabs__element"
      :class="getClassesTab(tab)"
      :tabindex="isFocusable(tab)"
      @click="goToVirtualStep(tab)"
      @keyup.enter="goToVirtualStep(tab)"
      @keyup.space="goToVirtualStep(tab)"
    >
      <ial-icon
        v-show="tabErrors && tabErrors[tab.value]"
        :icon="stepPrimaryIcon"
        size="small"
        :color="primaryIconColor || iconColor(stepPrimaryIcon)"
        :data-selector="`vertical-tab-primary-icon-${indexTab}`"
        class="ckl-vertical-tabs__primary-icon"
      ></ial-icon>
      <div class="ckl-vertical-tabs__name">{{ tab.name }}</div>
      <ial-icon
        v-if="secondaryIcons && secondaryIcons[tab.value]"
        :icon="secondaryIcons[tab.value].icon"
        :color="iconColor(secondaryIcons[tab.value])"
        :data-selector="`vertical-tab-secondary-icon-${indexTab}`"
        class="ckl-vertical-tabs__secondary-icon"
      ></ial-icon>
    </li>
  </ul>
</template>

<style lang="scss" src="./ckl-vertical-tabs.scss"></style>
