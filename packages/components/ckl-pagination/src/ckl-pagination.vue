<script>
export default { name: "CklPagination" };
</script>

<script setup>
import { IalIcon } from "@components-kit/assets";
import { computed } from "vue";

const emit = defineEmits(["page-updated"]);

const props = defineProps({
  /**
   * Total number of pages to be shown.
   */
  numPages: {
    type: Number,
    required: true,
    default: 1,
  },
  /**
   * The current page selected, should be the page's value attribute.
   */
  current: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * The number of items to show in the component such as pages and three dots.
   */
  itemToShow: {
    type: Number,
    required: false,
    default: 7,
  },
});

const maxItemsToShow = computed(() => {
  let item = Math.max(props.itemToShow, 7);

  if (item % 2) {
    return item;
  }

  return Math.ceil(item / 2) * 2 + 1;
});

const itemToSum = computed(() => (maxItemsToShow.value - 5) / 2);

const specialItemNumber = computed(() => Math.min(4, props.numPages));

const rangeLength = computed(() => {
  return Math.max(
    Math.min(itemToSum.value * 2 + 1, props.numPages - specialItemNumber.value),
    0
  );
});

const rangeStart = computed(() => {
  return Math.min(
    Math.max(props.current - itemToSum.value, 3),
    Math.max(props.numPages - rangeLength.value - 1, 3)
  );
});

const buildRange = (start, length) => Array(length).fill(start).map((x, y) => x + y);

const floatingRange = computed(() => {
  if (!rangeLength.value) {
    return [];
  }

  return buildRange(rangeStart.value, rangeLength.value);
});

const leftGlue = computed(() => {
  if (props.numPages - 2 <= 0) {
    return [];
  }

  if (rangeStart.value <= 3) {
    return 2;
  }

  return "...";
});

const rightGlue = computed(() => {
  if (props.numPages - 2 <= 1) {
    return [];
  }

  if (
    props.current + itemToSum.value >= props.numPages - 2 ||
    props.numPages <= maxItemsToShow.value
  ) {
    return props.numPages - 1;
  }

  return "...";
});

const lastItem = computed(() => {
  if (props.numPages <= 1) {
    return [];
  }

  return props.numPages;
});

const range = computed(() =>
  [1].concat(
    leftGlue.value,
    floatingRange.value,
    rightGlue.value,
    lastItem.value
  )
);

const selector = (index) => `table-page-${index}`;

const goToPage = (page) => {
  if (page !== props.current && page !== "...") {
    emit("page-updated", page);
  }
};

const goToNextPage = () => {
  if (props.current < props.numPages) {
    emit("page-updated", props.current + 1);
  }
};

const goToPrevPage = () => {
  if (props.current > 1) {
    emit("page-updated", props.current - 1);
  }
};
</script>

<template>
  <div v-show="numPages > 0" class="ckl-pagination">
    <ial-icon
      class="ckl-pagination__btn ckl-pagination__btn-prev"
      icon="ial-arrow"
      :class="{ 'ckl-pagination__btn--disabled': current <= 1 }"
      :disabled="current === 1"
      @click="goToPrevPage"
    />
    <ul class="ckl-pagination__list">
      <li
        v-for="(page, index) in range"
        :key="`item-list-${index}`"
        :data-selector="selector(index)"
        class="ckl-pagination__list-item"
        :class="[
          { 'ckl-pagination__list-item--active': page === current },
          { 'ckl-pagination__list-item-dots': page === '...' },
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </li>
    </ul>
    <ial-icon
      class="ckl-pagination__btn ckl-pagination__btn-next"
      :class="{ 'ckl-pagination__btn--disabled': current === numPages }"
      icon="ial-arrow"
      :disabled="current === numPages"
      @click="goToNextPage"
    />
  </div>
</template>
<style lang="scss" src="./ckl-pagination.scss"></style>
