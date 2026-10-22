<script>
export default {
  name: "CklBreadcrumb",
};
</script>
<script setup>
const props = defineProps({
  path: {
    type: Array,
    default() {
      return [];
    },
  },
  size: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["node-click"]);

const goToNode = (node) => {
  emit("node-click", { name: node.name, params: node.params || {} });
};

const getNodeClass = (node) => {
  const index = props.path.indexOf(node);

  if (index === props.path.length - 1) {
    return `current-node ${props.size}`;
  }

  return props.size;
};
</script>
<template>
  <div class="ckl-breadcrumb">
    <div
      v-for="(node, index) in path"
      :key="index"
      class="ckl-breadcrumb__node"
      :class="getNodeClass(node)"
    >
      <span
        :data-selector="`breadcrumb-item-${index}`"
        class="node-name"
        @click="goToNode(node)"
        >{{ node.text }}</span
      >
      <span class="next-sibling"> / </span>
    </div>
  </div>
</template>

<style lang="scss" src="./ckl-breadcrumb.scss"></style>
