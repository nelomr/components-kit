<script>
export default {
  name: "CklIcon",
};
</script>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * Icon component used.
   */
  icon: {
    required: true,
    type: Object,
    default: () => {},
  },
  /**
   * Color of the icon.
   * @values primary, secondary, grey, info, success, warning, error, clear, white
   */
  color: {
    type: String,
    default: "primary",
  },
  /**
   * Size of the icon.
   * @values default, small, medium, large, xlarge, big
   */
  size: {
    type: String,
    default: "default",
  },
  /**
   * Cursor on hover.
   * @values default, pointer
   */
  cursor: {
    type: String,
    default: "default",
  },
  /**
   * Icon disabled.
   */
  disabled: {
    type: [Function, Boolean],
    default: false,
  },
  /**
   * Data selector used for testing.
   */
  dataSelector: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["click"]);

const isDisabled = computed(() => {
  if (props.disabled instanceof Function) {
    return props.disabled();
  }
  return !!props.disabled;
});

const clickEvent = () => {
  if (!isDisabled.value) {
    emit("click");
  }
};
</script>

<template>
  <div
    class="ckl-icon"
    :class="[
      `ckl-icon--color-${color}`,
      `ckl-icon--size-${size}`,
      `ckl-icon--cursor-${cursor}`,
      { 'ckl-icon--disabled': isDisabled },
    ]"
    :data-selector="dataSelector"
    @click="clickEvent"
  >
    <component :is="icon" />
  </div>
</template>

<style lang="scss" src="./ckl-icon.scss"></style>
