<script>
export default {
  name: "CklProgressBar",
};
</script>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * Progress of the bar.
   */
  value: {
    type: Number,
    default: 0,
  },
});

const colorBarClass = computed(() => {
  let className;
  if (props.value <= 25) {
    className = "error";
  } else if (props.value > 25 && props.value < 75) {
    className = "warning";
  } else if (props.value >= 75 && props.value < 100) {
    className = "acceptable";
  } else {
    className = "success";
  }
  return `ckl-progress-bar__value--color-${className}`;
});

const progressWidth = computed(() => `width:${props.value}%`);

const progressValueAdjusted = computed(() => props.value.toFixed());
</script>

<template>
  <div class="ckl-progress-bar">
    <div class="ckl-progress-bar__bar">
      <div
        class="ckl-progress-bar__value"
        :class="colorBarClass"
        :style="progressWidth"
      ></div>
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

<style lang="scss" src="./ckl-progress-bar.scss"></style>
