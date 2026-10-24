<script>
export default {
  name: "CklCarousel",
};
</script>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { IalIcon } from "@components-kit/assets/vue";
import {
  calculateVisibleSlides,
  calculateMaxIndex,
  calculateTrackOffset,
} from "@components-kit/core";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemKey: {
    type: String,
    default: "id",
  },
  transitionDuration: {
    type: Number,
    default: 300,
  },
  itemWidth: {
    type: Number,
    required: true,
  },
  gap: {
    type: Number,
    default: 16,
  },
  slidesToScroll: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Number,
    default: undefined,
  },
  visibleItems: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["update:model-value"]);

const containerRef = ref(null);
const internalIndex = ref(0);

const currentIndex = computed({
  get: () => (props.modelValue !== undefined ? props.modelValue : internalIndex.value),
  set: (value) => {
    internalIndex.value = value;
    emit("update:model-value", value);
  },
});

const transitioning = ref(false);
const visibleSlides = ref(3);

const updateVisibleSlides = () => {
  if (!containerRef.value) return;
  visibleSlides.value = calculateVisibleSlides(
    containerRef.value.offsetWidth,
    props.itemWidth,
    props.gap,
  );
};

const maxIndex = computed(() => {
  return calculateMaxIndex(props.items.length, visibleSlides.value);
});

const canGoPrevious = computed(() => currentIndex.value > 0);

const canGoNext = computed(() => currentIndex.value < maxIndex.value);

const trackStyle = computed(() => {
  const offset = calculateTrackOffset(currentIndex.value, props.itemWidth, props.gap);
  return {
    transform: `translateX(-${offset}px)`,
    transition: transitioning.value
      ? `transform ${props.transitionDuration}ms ease-in-out`
      : "none",
  };
});

const showControls = computed(() => {
  if (props.items.length === 1) {
    return false;
  }
  return props.items.length > visibleSlides.value;
});

const containerStyle = computed(() => {
  if (props.visibleItems) {
    const width = props.visibleItems * props.itemWidth + (props.visibleItems - 1) * props.gap;
    return {
      flex: "none",
      width: `${width}px`,
      maxWidth: "100%",
    };
  }
  return {};
});

const next = () => {
  if (!canGoNext.value || transitioning.value) return;

  transitioning.value = true;
  currentIndex.value = Math.min(currentIndex.value + props.slidesToScroll, maxIndex.value);

  setTimeout(() => {
    transitioning.value = false;
  }, props.transitionDuration);
};

const previous = () => {
  if (!canGoPrevious.value || transitioning.value) return;

  transitioning.value = true;
  currentIndex.value = Math.max(currentIndex.value - props.slidesToScroll, 0);

  setTimeout(() => {
    transitioning.value = false;
  }, props.transitionDuration);
};

onMounted(() => {
  updateVisibleSlides();
  window.addEventListener("resize", updateVisibleSlides);
});

watch(() => [props.itemWidth, props.gap], updateVisibleSlides);

watch(maxIndex, (newMax) => {
  if (currentIndex.value > newMax) {
    currentIndex.value = newMax;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateVisibleSlides);
});

defineExpose({
  next,
  previous,
  currentIndex,
});
</script>

<template>
  <div class="ckl-carousel" role="region" aria-roledescription="carousel" aria-label="Carousel">
    <button
      v-if="showControls"
      class="ckl-carousel__btn ckl-carousel__btn--prev"
      :class="{ 'ckl-carousel__btn--disabled': !canGoPrevious }"
      :disabled="!canGoPrevious"
      aria-label="Previous slide"
      @click="previous"
    >
      <ial-icon
        icon="ial-arrow-pointer-left"
        :color="canGoPrevious ? 'primary' : 'grey-300'"
        :cursor="canGoPrevious ? 'pointer' : 'default'"
        size="small"
      />
    </button>

    <div
      ref="containerRef"
      class="ckl-carousel__container"
      :class="{ 'ckl-carousel__container--no-controls': !showControls }"
      :style="containerStyle"
    >
      <div class="ckl-carousel__track" :style="trackStyle">
        <div
          v-for="(item, index) in items"
          :key="item[itemKey]"
          class="ckl-carousel__slide"
          :style="{
            width: `${itemWidth}px`,
            marginRight: index < items.length - 1 ? `${gap}px` : '0',
          }"
          role="group"
          aria-roledescription="slide"
          :aria-hidden="index < currentIndex || index >= currentIndex + visibleSlides"
        >
          <slot name="slide" :item="item" :index="index">
            {{ item }}
          </slot>
        </div>
      </div>
    </div>

    <button
      v-if="showControls"
      class="ckl-carousel__btn ckl-carousel__btn--next"
      :class="{ 'ckl-carousel__btn--disabled': !canGoNext }"
      :disabled="!canGoNext"
      aria-label="Next slide"
      @click="next"
    >
      <ial-icon
        icon="ial-arrow-pointer-right"
        :color="canGoNext ? 'primary' : 'grey-300'"
        :cursor="canGoNext ? 'pointer' : 'default'"
        size="small"
      />
    </button>
  </div>
</template>
