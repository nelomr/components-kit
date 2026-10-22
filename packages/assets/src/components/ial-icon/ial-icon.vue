<script>
export default {
  name: 'IalIcon'
};
</script>

<script setup>
import {computed, defineAsyncComponent} from 'vue';
import getIcon from '../../icon-factory';

const props = defineProps({
  /**
   * Icon component used.
   */
  icon: {
    required: true,
    type: [Object, String],
    default: ''
  },
  /**
   * Color of the icon.
   * @values primary, secondary, grey, info, success, warning, error, clear, white
   */
  color: {
    type: String,
    default: 'primary'
  },
  /**
   * Size of the icon.
   * @values default, small, medium, large, xlarge, big
   */
  size: {
    type: String,
    default: 'default'
  },
  /**
   * Cursor on hover.
   * @values default, pointer
   */
  cursor: {
    type: String,
    default: 'default'
  },
  /**
   * Icon disabled.
   */
  disabled: {
    type: [Function, Boolean],
    default: false
  },
  /**
   * Data selector used for testing.
   */
  dataSelector: {
    type: String,
    default: ''
  }
});

const iconComponent = computed(() => {
  if (typeof props.icon === 'object') {
    return props.icon;
  }

  const icon = getIcon(props.icon);

  if (typeof icon === 'function') {
    return defineAsyncComponent(icon);
  }
  return icon;
});

const isDisabled = computed(() => {
  if (props.disabled instanceof Function) {
    return props.disabled();
  }
  return !!props.disabled;
});

const classes = computed(() => {
  return [{'ial-icon--disabled': isDisabled.value}].concat(
    ...['color', 'size', 'cursor'].map((prop) => {
      if (props[prop]) {
        return `ial-icon--${prop}-${props[prop]}`;
      }

      return [];
    })
  );
});
</script>

<template>
  <div class="ial-icon" :class="classes" :data-selector="dataSelector">
    <component :is="iconComponent" />
  </div>
</template>

<style lang="scss" src="./ial-icon.scss"></style>
