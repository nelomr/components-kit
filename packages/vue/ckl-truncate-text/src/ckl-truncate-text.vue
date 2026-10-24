<script setup>
import { computed } from "vue";
import { calculateTruncateText } from "@components-kit/core";

defineOptions({
  name: "CklTruncateText",
});

const props = defineProps({
  text: {
    type: [String, Array],
    default: "",
  },
  separator: {
    type: String,
    default: "",
  },
  characterLimit: {
    type: Number,
    default: 0,
  },
});

const result = computed(() =>
  calculateTruncateText({
    text: props.text,
    separator: props.separator,
    characterLimit: props.characterLimit,
  }),
);

const arrayValues = computed(() => result.value.arrayValues);
const itemLeftCount = computed(() => result.value.itemLeftCount);
const truncateText = computed(() => result.value.truncateText);
const isTruncated = computed(() => result.value.isTruncated);
</script>
<template>
  <span class="ckl-truncate-text">
    {{ truncateText }}
    <span v-if="isTruncated && !arrayValues" class="ckl-truncate-text__ellipsis">...</span>
    <span v-if="itemLeftCount" class="ckl-truncate-text__more"> and {{ itemLeftCount }} more</span>
  </span>
</template>
