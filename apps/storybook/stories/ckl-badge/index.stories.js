import { CklBadge } from '@components-kit/ckl-badge/src';

export default {
  title: 'components/ckl-badge',
  component: CklBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 🏷️ CklBadge

Flexible status indicators, notification pills, count tags, and outline badges for Vue 3 applications.

#### 📦 Installation
\`\`\`bash
yarn add @components-kit/ckl-badge
\`\`\`

#### 🚀 Quick Example
\`\`\`vue
<script setup>
import { CklBadge } from '@components-kit/ckl-badge';
</script>

<template>
  <ckl-badge color="primary" shape="oval">Active</ckl-badge>
</template>
\`\`\`

#### 🎨 CSS Variable Customization & Theming
Customize appearance using scoped CSS custom properties:
\`\`\`css
.my-custom-badge {
  --ckl-badge-background-color: var(--primary);
  --ckl-badge-border-color: var(--primary);
  --ckl-badge-title-color: #ffffff;
  --ckl-badge-border-radius: 28px;
  --ckl-badge-padding: 8px 12px;
}
\`\`\`
`,
      },
    },
  },
  args: {
    color: 'primary',
    size: 'large',
    shape: 'oval',
    outlined: false,
    defaultSlot: 'Badge',
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'error',
        'success',
        'warning',
        'info',
        'purple',
        'mid-blue',
        'transparent',
      ],
      description: 'Color theme of the badge',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'x-small'],
      description: 'Size of the badge',
      table: {
        category: 'Dimensions',
        defaultValue: { summary: 'large' },
      },
    },
    shape: {
      control: 'select',
      options: ['oval', 'square', 'circle'],
      description: 'Shape of the badge container',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'oval' },
      },
    },
    outlined: {
      control: 'boolean',
      description: 'Renders badge in outlined style',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    defaultSlot: {
      control: 'text',
      description: 'Badge content rendered in default slot',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Badge' },
      },
    },
  },
};

export const Primary = {
  parameters: {
    docs: {
      description: {
        story: 'Standard interactive badge controlled via Storybook Controls table below.',
      },
    },
  },
  render: (args) => ({
    components: { CklBadge },
    setup() {
      return { args };
    },
    template: `
      <ckl-badge v-bind="args">
        {{ args.defaultSlot }}
      </ckl-badge>
    `,
  }),
};

export const Colors = {
  parameters: {
    docs: {
      description: {
        story: 'Full palette of brand and semantic color tokens: `primary`, `secondary`, `success`, `warning`, `error`, `info`, `purple`, and `mid-blue`.',
      },
    },
  },
  render: () => ({
    components: { CklBadge },
    setup() {
      const colors = [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'purple',
        'mid-blue',
      ];
      return { colors };
    },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <ckl-badge v-for="color in colors" :key="color" :color="color">
          {{ color }}
        </ckl-badge>
      </div>
    `,
  }),
};

export const Outlined = {
  parameters: {
    docs: {
      description: {
        story: 'Outlined badge variants with transparent backgrounds and colored borders for subtle status indicators.',
      },
    },
  },
  render: () => ({
    components: { CklBadge },
    setup() {
      const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'purple'];
      return { colors };
    },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <ckl-badge v-for="color in colors" :key="color" :color="color" outlined>
          {{ color }}
        </ckl-badge>
      </div>
    `,
  }),
};

export const Sizes = {
  parameters: {
    docs: {
      description: {
        story: 'Standard size scale: `large`, `medium`, `small`, and `x-small`.',
      },
    },
  },
  render: () => ({
    components: { CklBadge },
    setup() {
      const sizes = ['large', 'medium', 'small', 'x-small'];
      return { sizes };
    },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <ckl-badge v-for="size in sizes" :key="size" :size="size" color="primary">
          {{ size }}
        </ckl-badge>
      </div>
    `,
  }),
};

export const Shapes = {
  parameters: {
    docs: {
      description: {
        story: 'Three geometric boundary shapes: `oval` (pill), `square` (rounded box), and `circle` (compact count indicator).',
      },
    },
  },
  render: () => ({
    components: { CklBadge },
    setup() {
      const shapes = ['oval', 'square', 'circle'];
      return { shapes };
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <ckl-badge shape="oval" color="primary">Oval Pill</ckl-badge>
        <ckl-badge shape="square" color="primary">Square</ckl-badge>
        <ckl-badge shape="circle" color="error">5</ckl-badge>
      </div>
    `,
  }),
};
