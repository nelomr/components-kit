<script>
export default {
  name: "CklSlides",
};
</script>

<script setup>
import { IalIcon } from "@components-kit/assets";
import { computed } from "vue";

const props = defineProps({
  /**
   * Array of slides.
   */
  slides: {
    required: true,
    type: Array,
    default: () => [],
  },
  /**
   * Selected slide.
   */
  selected: {
    required: true,
    type: [Number, String],
    default: "",
  },
});

const emit = defineEmits(["select-slide"]);

const selectedIndex = computed(() => props.slides.indexOf(props.selected));

const selectSlide = (slide) => {
  emit("select-slide", slide);
};
const goToPrevious = () => {
  if (selectedIndex.value > 0) {
    emit("select-slide", props.slides[selectedIndex.value - 1]);
  }
};
const goToNext = () => {
  if (selectedIndex.value < props.slides.length - 1) {
    emit("select-slide", props.slides[selectedIndex.value + 1]);
  }
};
</script>

<template>
  <div class="ckl-slides">
    <div class="ckl-slides__controls">
      <ial-icon
        class="ckl-slides__arrow ckl-slides__arrow--back"
        icon="ial-arrow"
        cursor="pointer"
        :disabled="selectedIndex === 0"
        @click="goToPrevious"
      />
      <span
        v-for="bullet in slides"
        :key="`bullet-${bullet}`"
        class="ckl-slides__bullet"
        :class="{ 'ckl-slides__bullet--active': bullet === selected }"
        @click="selectSlide(bullet)"
      />
      <ial-icon
        class="ckl-slides__arrow ckl-slides__arrow--next"
        icon="ial-arrow"
        cursor="pointer"
        :disabled="selectedIndex === slides.length - 1"
        @click="goToNext"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./ckl-slides.scss"></style>
