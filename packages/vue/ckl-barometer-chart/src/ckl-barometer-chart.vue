<script setup>
import { computed } from "vue";
import {
  clampPercentage,
  calculateBarometerRotation,
  getBarometerRangeLabel,
  DEFAULT_BAROMETER_RANGES,
} from "@components-kit/core";
import { IalIcon } from "@components-kit/assets/vue";
import BarometerBoth from "@components-kit/assets/illustrations/barometer-charter-both.svg";

const props = defineProps({
  /**
   * Current percentage value (0-100)
   */
  percentage: {
    type: Number,
    required: true,
  },
  /**
   * Size of the gauge (width)
   */
  size: {
    type: String,
    default: "100%",
  },
  /**
   * Configuration for ranges and labels
   * Array of objects with: min, max, label, color (optional)
   */
  ranges: {
    type: Array,
    default: () => DEFAULT_BAROMETER_RANGES,
    validator: (value) => {
      return value.every(
        (range) =>
          typeof range.min === "number" &&
          typeof range.max === "number" &&
          typeof range.label === "string",
      );
    },
  },
});

const barometerBoth = BarometerBoth;

const normalizedValue = computed(() => clampPercentage(props.percentage));

const containerStyle = computed(() => ({
  width: props.size,
}));

const currentRangeLabel = computed(() => getBarometerRangeLabel(props.percentage, props.ranges));

const arrowRotation = computed(() => calculateBarometerRotation(props.percentage));

const barometerStyle = computed(() => ({
  "--ckl-barometer-chart-arrow-rotation": `${arrowRotation.value}deg`,
}));
</script>

<template>
  <div class="ckl-barometer-chart">
    <div class="ckl-barometer-chart__container" :style="containerStyle">
      <div class="ckl-barometer-chart__visual">
        <ial-icon :icon="barometerBoth" class="ckl-barometer-chart__icon" :style="barometerStyle" />
      </div>

      <div class="ckl-barometer-chart__labels">
        <div class="ckl-barometer-chart__range-label">
          {{ currentRangeLabel }}
        </div>
      </div>
    </div>
  </div>
</template>
