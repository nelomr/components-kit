<script setup>
import { computed } from "vue";
import { IalIcon } from "@components-kit/assets";
import BarometerBoth from "./assets/barometer-charter-both.svg";

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
    default: () => [
      { min: 0, max: 25, label: "Very Low" },
      { min: 25, max: 50, label: "Low" },
      { min: 50, max: 75, label: "Mid" },
      { min: 75, max: 95, label: "High" },
      { min: 95, max: 100, label: "Very High" },
    ],
    validator: (value) => {
      return value.every(
        (range) =>
          typeof range.min === "number" &&
          typeof range.max === "number" &&
          typeof range.label === "string"
      );
    },
  },
});

const barometerBoth = BarometerBoth;

const normalizedValue = computed(() =>
  Math.min(Math.max(props.percentage, 0), 100)
);

const containerStyle = computed(() => ({
  width: props.size,
}));

const currentRangeLabel = computed(() => {
  const current = normalizedValue.value;
  const match = props.ranges.find(
    (range) => current >= range.min && current <= range.max
  );
  return match ? match.label : "";
});

const arrowRotation = computed(() => {
  return (normalizedValue.value / 100) * 179.9 - 90;
});

const barometerStyle = computed(() => ({
  "--ckl-barometer-chart-arrow-rotation": `${arrowRotation.value}deg`,
}));
</script>

<template>
  <div class="ckl-barometer-chart">
    <div class="ckl-barometer-chart__container" :style="containerStyle">
      <div class="ckl-barometer-chart__visual">
        <ial-icon
          :icon="barometerBoth"
          class="ckl-barometer-chart__icon"
          :style="barometerStyle"
        />
      </div>

      <div class="ckl-barometer-chart__labels">
        <div class="ckl-barometer-chart__range-label">
          {{ currentRangeLabel }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./ckl-barometer-chart.scss"></style>
