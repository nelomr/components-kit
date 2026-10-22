<script>
export default {
  name: "CklTooltip",
};
</script>

<script setup>
import { ref, computed, useSlots, nextTick, onUnmounted } from "vue";
import { onClickOutside } from "../../../helpers/on-click-outside";

const emit = defineEmits(["click-outside"]);
const slots = useSlots();
const props = defineProps({
  /**
   * Text of the tooltip.
   */
  text: {
    type: String,
    default: "",
  },
  /**
   * Color of the tooltip.
   * @values primary, success, error, warning, info
   */
  color: {
    type: String,
    default: "primary",
  },
  /**
   * Position of the tooltip.
   * @values top, bottom, left, right
   */
  position: {
    type: String,
    default: "bottom",
  },
  /**
   * Visible property when manual trigger is selected.
   */
  visible: {
    type: Boolean,
    default: false,
  },
  /**
   * Disabled tooltip.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Attach element to body with Teleport
   */
  attachToBody: {
    type: Boolean,
    default: false,
  },
  /**
   * Classes attached to tooltip element when is in body
   */
  inBodyClass: {
    type: String,
    default: "",
  },
  /**
   * Trigger when tooltip is visible.
   * @values hover, click, manual
   */
  trigger: {
    type: String,
    default: "hover",
  },
  /**
   * Remove tooltip padding.
   */
  noPadding: {
    type: Boolean,
    default: false,
  },
  /**
   * Data selector.
   */
  dataSelector: {
    type: String,
    default: "tooltip",
  },
});

const wrapperRef = ref(null);

const tooltipRef = ref(null);

const internalVisible = ref(false);

let cleanClickOutside = () => {};

const isVisible = computed(() => {
  if (props.trigger === "manual") {
    return props.visible;
  }
  return internalVisible.value;
});

const isDisabled = computed(() => {
  return props.disabled || (!props.text && !slots.tooltip);
});

const calculateTooltipPositionStyle = () => {
  const hostElement = wrapperRef.value?.getBoundingClientRect();
  const tooltipElement = tooltipRef.value?.getBoundingClientRect();
  let tooltipStyle = "";
  if (hostElement && tooltipElement) {
    switch (props.position) {
      case "top":
        tooltipStyle += `
                top: calc(${
                  hostElement.top - tooltipElement.height + window.scrollY
                }px - var(--total-offset));
                left: ${hostElement.left + hostElement.width / 2}px;
                bottom: unset`;
        break;
      case "bottom":
        tooltipStyle += `
                top: calc(${
                  hostElement.bottom + window.scrollY
                }px + var(--total-offset));
                left: ${hostElement.left + hostElement.width / 2}px;`;
        break;
      case "left":
        tooltipStyle += `
                top: ${
                  hostElement.top + window.scrollY + hostElement.height / 2
                }px;
                left: calc(${
                  hostElement.left - tooltipElement.width
                }px - var(--total-offset));`;
        break;
      case "right":
        tooltipStyle += `
                top: ${
                  hostElement.top + window.scrollY + hostElement.height / 2
                }px;
                left: calc(${hostElement.right}px + var(--total-offset));`;
        break;
    }
  }
  return tooltipStyle;
};

const setTooltipPositionStyle = () => {
  tooltipRef.value.setAttribute("style", calculateTooltipPositionStyle());
};

const onMouseOver = async () => {
  if (
    props.trigger === "hover" &&
    !internalVisible.value &&
    !isDisabled.value
  ) {
    internalVisible.value = true;
    if (props.attachToBody) {
      await nextTick();
      setTooltipPositionStyle();
    }
  }
};

const onMouseLeave = () => {
  if (props.trigger === "hover" && internalVisible.value && !isDisabled.value) {
    internalVisible.value = false;
  }
};

const onClick = async () => {
  if (
    props.trigger === "click" &&
    !internalVisible.value &&
    !isDisabled.value
  ) {
    internalVisible.value = true;
    addClickOutsideListener();
    if (props.attachToBody) {
      await nextTick();
      setTooltipPositionStyle();
    }
  }
};

const addClickOutsideListener = () => {
  cleanClickOutside();
  let elemToListen = wrapperRef;
  let elemsToIgnore = [];
  if (props.attachToBody) {
    elemToListen = tooltipRef;
    elemsToIgnore = [wrapperRef];
  }
  cleanClickOutside = onClickOutside({
    target: elemToListen,
    handler: () => {
      internalVisible.value = false;
      emit("click-outside");
      cleanClickOutside();
    },
    ignore: elemsToIgnore,
  });
};

onUnmounted(() => {
  cleanClickOutside();
});
</script>

<template>
  <div
    ref="wrapperRef"
    class="ckl-tooltip"
    :data-selector="`${dataSelector}-wrapper`"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <!--
      @slot Slot for the trigger component
    -->
    <slot></slot>
    <Teleport to="body" :disabled="!attachToBody">
      <transition name="ckl-tooltip-transition">
        <div
          v-show="isVisible"
          ref="tooltipRef"
          class="ckl-tooltip__container"
          :class="[
            `ckl-tooltip__container--color-${color}`,
            `ckl-tooltip__container--position-${position}`,
            {
              'ckl-tooltip__container--visible': isVisible,
              'ckl-tooltip__container--no-padding': noPadding,
              'ckl-tooltip__container--is-in-body': attachToBody,
              [inBodyClass]: attachToBody,
            },
          ]"
          :data-selector="`${dataSelector}-element`"
        >
          <!--
            @slot Slot for the tooltip content
          -->
          <slot name="tooltip">{{ text }}</slot>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style lang="scss" src="./ckl-tooltip.scss"></style>
