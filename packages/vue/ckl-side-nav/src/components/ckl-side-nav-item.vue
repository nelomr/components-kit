<script>
export default {
  name: "CklSideNavItem",
};
</script>

<script setup>
import { computed, ref } from "vue";
import { IalIcon } from "@components-kit/assets/vue";
import {
  isSideNavItemActive,
  isSideNavItemDisabled,
  getSideNavSubmenuItems,
  resolveSideNavColor,
} from "@components-kit/core";

const emit = defineEmits(["handle-click"]);
const props = defineProps({
  /**
   * item in the nav
   */
  item: {
    required: true,
    type: Object,
  },
  /**
   * Prop to know if menu is expanded or not and show the complete item info
   */
  extended: {
    type: Boolean,
    default: false,
  },
  /**
   * Current item selected
   */
  currentNavItem: {
    type: String,
    default: "",
  },
  /**
   * Data selector for testing
   */
  dataSelector: {
    type: String,
    default: "",
  },
  /**
   * Prop to know is a submenu item
   */
  isSubItem: {
    type: Boolean,
    default: false,
  },
});

const navItems = ref(null);
const submenuIsOpen = ref(false);

const submenuItems = computed(() => getSideNavSubmenuItems(props.item));
const submenuIsVisible = computed(() => submenuItems.value.length && props.extended);

// Optional per-item override; otherwise the nav-level CSS variables apply.
const itemStyle = computed(() => {
  const item = props.item;
  const color = resolveSideNavColor(
    item.iconColor || item.icon?.iconColor || item.icon?.color || item.color,
  );
  return color ? { "--icon-color": color, "--submenu-icon-color": color } : undefined;
});

const activeNavItem = (item) => isSideNavItemActive(item, props.currentNavItem);

const enter = (element) => {
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "auto";

  const height = getComputedStyle(element).height;

  element.style.position = null;
  element.style.visibility = null;
  element.style.height = 0;

  // Force browser reflow to apply initial height before animating
  void getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = height;
  });
};

const afterEnter = (element) => {
  element.style.height = "auto";
};

const leave = (element) => {
  const height = getComputedStyle(element).height;

  element.style.height = height;
  // Force browser reflow
  void getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = 0;
    element.style.width = 0;
  });
};

const closeSubmenu = () => (submenuIsOpen.value = false);

const itemIsDisabled = (item) => isSideNavItemDisabled(item);
const clickEvent = (item) => {
  if (!itemIsDisabled(item)) {
    emit("handle-click", item);
    closeSubmenu();
  }
};

defineExpose({
  closeSubmenu,
});
</script>

<template>
  <div
    class="ckl-side-nav-item"
    :class="{
      'ckl-side-nav-item--disabled': itemIsDisabled(item),
      'ckl-side-nav-item--active': activeNavItem(item),
      'ckl-side-nav-item--extended': props.extended,
      'ckl-side-nav-item__sub-item': props.isSubItem,
    }"
    :data-selector="dataSelector"
    :style="itemStyle"
  >
    <div class="ckl-side-nav-item__link" @click="clickEvent(item)">
      <ial-icon
        v-if="item.icon"
        class="ckl-side-nav-item__icon"
        size="default"
        cursor="pointer"
        :icon="item.icon?.icon || item.icon"
        color=""
      />
      <div v-if="item.text" class="ckl-side-nav-item__text">
        {{ item.text }}
      </div>
    </div>
    <ial-icon
      v-if="submenuIsVisible"
      ref="ckl-side-nav-item__submenu-icon"
      class="ckl-side-nav-item__submenu-icon"
      :class="{ 'ckl-side-nav-item__submenu-icon--open': submenuIsOpen }"
      cursor="pointer"
      size="small"
      icon="ial-arrow-pointer-down"
      color=""
      @click="submenuIsOpen = !submenuIsOpen"
    />
  </div>
  <transition
    name="ckl-side-nav-item__expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <div
      v-if="submenuIsOpen"
      class="ckl-side-nav-item__submenu"
      :class="{
        'ckl-side-nav-item__submenu--open': submenuIsOpen,
      }"
    >
      <ckl-side-nav-item
        v-for="subItem in submenuItems"
        ref="navItems"
        :key="subItem.id"
        :item="subItem"
        :data-selector="`ckl-nav-item-subitem-${subItem.id}`"
        :extended="extended"
        :current-nav-item="currentNavItem"
        is-sub-item
        @handle-click="clickEvent"
      />
    </div>
  </transition>
</template>
