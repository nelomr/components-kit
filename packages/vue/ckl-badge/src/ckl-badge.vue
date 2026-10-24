<script>
export default {
  name: "CklBadge",
};
</script>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * Type of the badge.
   * @values primary, secondary, error, success, warning, info, purple, mid-blue, transparent
   */
  color: {
    type: String,
    default: "primary",
    validator(value) {
      return [
        "primary",
        "secondary",
        "error",
        "success",
        "warning",
        "info",
        "purple",
        "mid-blue",
        "transparent",
      ].includes(value);
    },
  },
  /**
   * Size of the badge.
   * @values large, medium, small, x-small
   */
  size: {
    type: String,
    default: "large",
    validator(value) {
      return ["large", "medium", "small", "x-small"].includes(value);
    },
  },
  /**
   * Badge shape.
   * @values square, oval, circle
   */
  shape: {
    type: String,
    default: "oval",
    validator(value) {
      return ["square", "oval", "circle"].includes(value);
    },
  },
  /**
   * Outlined border.
   * @values true, false
   */
  outlined: {
    type: Boolean,
    default: false,
  },
});

const componentClasses = computed(() => [
  `ckl-badge--size-${props.size}`,
  `ckl-badge--shape-${props.shape}`,
  `ckl-badge--color-${props.color}`,
  {
    [`ckl-badge--color-${props.color}-outlined`]: props.outlined,
  },
]);
</script>

<template>
  <div class="ckl-badge" :class="componentClasses">
    <span class="ckl-badge__content">
      <slot></slot>
    </span>
  </div>
</template>
