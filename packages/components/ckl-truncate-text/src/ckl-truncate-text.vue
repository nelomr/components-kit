<script setup>
import { computed } from "vue";

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
const arrayValues = computed(() => {
  let txt = props.text;
  if (!Array.isArray(txt)) {
    return null;
  }
  let separator = props.separator || "";
  let currentArrayValue = [];
  for (let t of txt) {
    let nextValueArray = currentArrayValue.concat(t);
    if (nextValueArray.join(separator).length > props.characterLimit) {
      return currentArrayValue;
    }
    currentArrayValue = currentArrayValue.concat(t);
  }
  return currentArrayValue;
});
const itemLeftCount = computed(() => {
  if (!arrayValues.value) {
    return null;
  }
  return props.text.length - arrayValues.value.length;
});
const truncateText = computed(() => {
  let separator = props.separator || "";
  if (arrayValues.value) {
    return arrayValues.value.join(separator);
  }
  let txt = props.text;
  return String(txt || "").slice(0, props.characterLimit);
});
const isTruncated = computed(() => {
  return String(props.text || "").length > props.characterLimit;
});
</script>
<template>
  <span class="ckl-truncate-text">
    {{ truncateText }}
    <span v-if="isTruncated && !arrayValues" class="ckl-truncate-text__ellipsis"
      >...</span
    >
    <span v-if="itemLeftCount" class="ckl-truncate-text__more">
      and {{ itemLeftCount }} more</span
    >
  </span>
</template>
