<script>
export default {
  name: "CklSideNavItem",
};
</script>

<script setup>
import { computed, ref } from "vue";
import { IalIcon } from "@components-kit/assets";

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

const submenuItems = computed(() => props.item.items || []);
const submenuIsVisible = computed(
  () => submenuItems.value.length && props.extended
);

const activeNavItem = (item) => {
  return (
    item.id === props.currentNavItem ||
    (item.items || []).some((item) => {
      if (item.id === props.currentNavItem) {
        return true;
      }
      if (item.items) {
        return activeNavItem(item);
      }
    })
  );
};

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

const itemIsDisabled = (item) => {
  if (item.disabled instanceof Function) {
    return item.disabled();
  }

  return !!item.disabled;
};
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
  >
    <div class="ckl-side-nav-item__link" @click="clickEvent(item)">
      <ial-icon
        v-if="item.icon"
        class="ckl-side-nav-item__icon"
        size="default"
        cursor="pointer"
        :icon="item.icon?.icon || item.icon"
        :color="item.icon?.iconColor || 'white'"
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
      color="white"
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

<style lang="scss">
.ckl-side-nav-item {
  display: flex;
  border-radius: 8px;
  margin: 16px 12px;
  padding-right: 0;
  background-color: transparent;
  transition: background-color 0.1s ease-in;

  &__expand-enter-active,
  &__expand-leave-active {
    transition: height 0.3s ease-in-out;
    overflow: hidden;
  }

  &__expand-enter,
  &__expand-leave-to {
    height: 0;
  }

  &:first-child {
    margin-top: 0;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  &:hover {
    background-color: var(--item-background-color);
  }

  &--active {
    background-color: var(--item-background-color-active);

    &:hover {
      background-color: var(--item-background-color-active);
    }
  }

  &__text {
    width: 0;
    color: var(--item-color);
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    transition: width 0.3s ease;
  }

  &__sub-item {
    display: flex;
    margin: 4px 10px 8px 0;
    padding: 0 0 0 28px;
    color: var(--item-color);
    cursor: pointer;
    border-radius: 8px;
    text-align: left;

    .ckl-side-nav-item__text {
      font-size: var(--subitem-font-size);
      font-weight: 400;
      line-height: 1em;
    }
  }

  &__link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex: 1;
    padding: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: var(--item-font-size);
    color: var(--item-color);
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__icon,
  &__submenu-icon {
    margin-right: 0;
    color: var(--item-color);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: margin-right 0.6s ease;
  }

  &__submenu-icon {
    &--open {
      transform: rotate(180deg);
    }
  }

  &__submenu {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    color: var(--item-color);
    transition: all 0.4s ease;

    &--open {
      display: block;
      margin-left: 16px;
    }
  }

  &--extended {
    padding-right: 10px;

    .ckl-side-nav-item__icon {
      margin-right: 8px;
    }

    .ckl-side-nav-item__text {
      width: 200px;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
