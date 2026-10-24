import { IalIcon } from "@components-kit/assets/vue";

export default {
  title: "assets/ial-icon",
  component: IalIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    icon: "ial-home",
    size: "medium",
    color: "primary",
    cursor: "default",
    disabled: false,
  },
  argTypes: {
    icon: {
      control: "select",
      options: [
        "ial-alert",
        "ial-arrow",
        "ial-arrow-down",
        "ial-arrow-pointer-down",
        "ial-arrow-pointer-left",
        "ial-arrow-pointer-right",
        "ial-download",
        "ial-home",
        "ial-settings",
        "ial-user",
      ],
      description: "Icon name from the active icon registry",
    },
    size: {
      control: "select",
      options: ["small", "default", "medium", "large", "xlarge", "big"],
      description: "Size scaling of the icon",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "grey",
        "info",
        "success",
        "warning",
        "error",
        "clear",
        "white",
      ],
      description: "Color theme of the icon",
    },
    cursor: {
      control: "select",
      options: ["default", "pointer"],
      description: "Hover cursor type",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    dataSelector: {
      control: "text",
      description: "`data-selector` attribute for testing",
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { IalIcon },
    setup() {
      return { args };
    },
    template: `
      <ial-icon v-bind="args" />
    `,
  }),
};

export const CuratedIconGallery = {
  render: () => ({
    components: { IalIcon },
    setup() {
      const iconList = [
        "ial-alert",
        "ial-arrow",
        "ial-arrow-down",
        "ial-arrow-pointer-down",
        "ial-arrow-pointer-left",
        "ial-arrow-pointer-right",
        "ial-download",
        "ial-home",
        "ial-settings",
        "ial-user",
      ];
      return { iconList };
    },
    template: `
      <div style="
        display: grid; 
        grid-template-columns: repeat(5, 1fr); 
        gap: 20px; 
        font-family: sans-serif;
      ">
        <div 
          v-for="name in iconList" 
          :key="name" 
          style="
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            padding: 16px; 
            background: #f8fafc; 
            border: 1px solid #e2e8f0; 
            border-radius: 8px;
            min-width: 120px;
          "
        >
          <ial-icon :icon="name" size="large" color="primary" />
          <span style="margin-top: 10px; font-size: 11px; color: #475569; word-break: break-all; text-align: center;">
            {{ name }}
          </span>
        </div>
      </div>
    `,
  }),
};

export const Sizes = {
  render: () => ({
    components: { IalIcon },
    setup() {
      const sizes = ["small", "default", "medium", "large", "xlarge", "big"];
      return { sizes };
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: center; font-family: sans-serif;">
        <div v-for="size in sizes" :key="size" style="text-align: center;">
          <ial-icon icon="ial-settings" :size="size" color="primary" />
          <div style="margin-top: 8px; font-size: 11px; color: #64748b;">{{ size }}</div>
        </div>
      </div>
    `,
  }),
};

export const Colors = {
  render: () => ({
    components: { IalIcon },
    setup() {
      const colors = ["primary", "secondary", "success", "warning", "error", "info", "grey"];
      return { colors };
    },
    template: `
      <div style="display: flex; gap: 20px; align-items: center; font-family: sans-serif;">
        <div v-for="color in colors" :key="color" style="text-align: center;">
          <ial-icon icon="ial-user" size="large" :color="color" />
          <div style="margin-top: 8px; font-size: 11px; color: #64748b;">{{ color }}</div>
        </div>
      </div>
    `,
  }),
};
