<script>
export default {
  name: "CklSideNav",
};
</script>

<script setup>
import { computed, ref, watch } from "vue";
import CklSideNavItem from "./components/ckl-side-nav-item.vue";
import { IalIcon } from "@components-kit/assets/vue";
import { groupSideNavItems, getSideNavStyleVars } from "@components-kit/core";

const emit = defineEmits(["handle-click"]);

const props = defineProps({
  /**
   * Array of items, must have id's.
   */
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
  /**
   * Array of bottoms items, must have id's.
   */
  bottomItems: {
    type: Array,
    default: () => [],
  },
  /**
   * Current item selected
   */
  selectedNavItem: {
    type: String,
    default: () => {
      return null;
    },
    required: true,
  },
  /**
   * Open state menu
   */
  initialExtendedMenu: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  /**
   * Background color of the menu. Design token (e.g. `primary`) or any CSS color.
   */
  backgroundColor: {
    type: String,
    default: "",
  },
  /**
   * Background color of the submenus. Design token or any CSS color.
   */
  submenuBackgroundColor: {
    type: String,
    default: "",
  },
  /**
   * Color of the menu item icons. Ignored (falls back) if equal to the background.
   */
  iconColor: {
    type: String,
    default: "",
  },
  /**
   * Color of the submenu item icons.
   */
  submenuIconColor: {
    type: String,
    default: "",
  },
  /**
   * Color of the toggle and expand arrows.
   */
  arrowColor: {
    type: String,
    default: "",
  },
});

const styleVars = computed(() =>
  getSideNavStyleVars({
    backgroundColor: props.backgroundColor,
    submenuBackgroundColor: props.submenuBackgroundColor,
    iconColor: props.iconColor,
    submenuIconColor: props.submenuIconColor,
    arrowColor: props.arrowColor,
  }),
);

const isExtended = ref(props.initialExtendedMenu);
const navItems = ref(null);

/**
 * To be grouped the item needs to have an attribute group inside
 */
const itemsGrouped = computed(() => groupSideNavItems(props.items));
const hasBottomItems = computed(() => props.bottomItems.length);

watch(
  () => props.initialExtendedMenu,
  (val) => {
    isExtended.value = val;
  },
);

watch(
  () => props.selectedNavItem,
  () => {
    isExtended.value = false;
  },
);

const getSelector = (group, index, prefix = "") => {
  return `${prefix}-menu-item-${group}-${index}`;
};
const toggleMenu = () => {
  isExtended.value = !isExtended.value;
  closeSubmenus();
};

const closeSubmenus = () => {
  navItems.value.forEach((item) => {
    item.closeSubmenu();
  });
};

const handleClick = (item) => {
  emit("handle-click", item);
  closeSubmenus();
};
</script>

<template>
  <nav class="ckl-side-nav" :class="{ 'ckl-side-nav--active': isExtended }" :style="styleVars">
    <div class="ckl-side-nav__items-block">
      <div
        class="ckl-side-nav__toggle-button"
        :class="{
          'ckl-side-nav__toggle-button--extended': isExtended,
        }"
        data-selector="ckl-side-nav-toggle-button"
        @click="toggleMenu"
      >
        <!--
          @slot Slot for change default expand menu icon
        -->
        <slot name="expand-button" :extended="isExtended">
          <ial-icon
            class="ckl-side-nav__toggle-button-icon"
            size="medium"
            cursor="pointer"
            icon="ial-arrow-pointer-down"
            color=""
          />
        </slot>
      </div>

      <div class="ckl-side-nav__items-container">
        <div class="ckl-side-nav__top-items">
          <div
            v-for="(group, groupName) in itemsGrouped"
            :key="groupName"
            class="ckl-side-nav__main-items"
          >
            <ckl-side-nav-item
              v-for="(item, itemIndex) in group"
              ref="navItems"
              :key="item.id"
              :item="item"
              :data-selector="getSelector(groupName, itemIndex, 'ckl-nav-item')"
              :extended="isExtended"
              :current-nav-item="selectedNavItem"
              @handle-click="handleClick"
            />
          </div>
        </div>

        <div v-if="hasBottomItems" class="ckl-side-nav__bottom-items">
          <ckl-side-nav-item
            v-for="(item, itemIndex) in bottomItems"
            :key="item.id"
            :item="item"
            :data-selector="getSelector(item.group || 'no-group', itemIndex, 'ckl-nav-item-bottom')"
            :extended="isExtended"
            @handle-click="handleClick"
          />
        </div>
      </div>
    </div>
  </nav>
</template>
