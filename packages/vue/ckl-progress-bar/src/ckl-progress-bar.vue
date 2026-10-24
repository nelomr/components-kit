<script>
export default {
  name: "CklProgressBar",
};
</script>

<script setup>
import { computed } from "vue";
import { getProgressBarStatus, formatProgressValue } from "@components-kit/core";

const props = defineProps({
  /**
   * Progress of the bar.
   */
  value: {
    type: Number,
    default: 0,
  },
});

const colorBarClass = computed(
  () => `ckl-progress-bar__value--color-${getProgressBarStatus(props.value)}`,
);

const progressWidth = computed(() => `width:${props.value}%`);

const progressValueAdjusted = computed(() => formatProgressValue(props.value));
</script>

<template>
  <div class="ckl-progress-bar">
    <div class="ckl-progress-bar__bar">
      <div class="ckl-progress-bar__value" :class="colorBarClass" :style="progressWidth"></div>
    </div>
    <div class="ckl-progress-bar__text">
      <!--
        @slot Slot for the text
          @binding {string} value progress of the bar
      -->
      <slot :value="progressValueAdjusted"> {{ progressValueAdjusted }}% </slot>
    </div>
  </div>
</template>
