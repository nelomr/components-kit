import { CklIcon } from "@components-kit/vue-ckl-icon";
import IalAlert from "../../../../packages/assets/src/icons/ial-alert.svg";
import IalArrowDown from "../../../../packages/assets/src/icons/ial-arrow-down.svg";
import IalArrowPointerDown from "../../../../packages/assets/src/icons/ial-arrow-pointer-down.svg";
import IalArrowPointerLeft from "../../../../packages/assets/src/icons/ial-arrow-pointer-left.svg";
import IalArrowPointerRight from "../../../../packages/assets/src/icons/ial-arrow-pointer-right.svg";
import IalArrow from "../../../../packages/assets/src/icons/ial-arrow.svg";
import IalDownload from "../../../../packages/assets/src/icons/ial-download.svg";
import IalHome from "../../../../packages/assets/src/icons/ial-home.svg";
import IalSettings from "../../../../packages/assets/src/icons/ial-settings.svg";
import IalUser from "../../../../packages/assets/src/icons/ial-user.svg";

const iconMap = {
  "ial-alert": IalAlert,
  "ial-arrow": IalArrow,
  "ial-arrow-down": IalArrowDown,
  "ial-arrow-pointer-down": IalArrowPointerDown,
  "ial-arrow-pointer-left": IalArrowPointerLeft,
  "ial-arrow-pointer-right": IalArrowPointerRight,
  "ial-download": IalDownload,
  "ial-home": IalHome,
  "ial-settings": IalSettings,
  "ial-user": IalUser,
};

export default {
  title: "components/ckl-icon",
  component: CklIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    icon: "ial-home",
    color: "primary",
    size: "medium",
    cursor: "default",
    disabled: false,
  },
  argTypes: {
    dataSelector: {
      control: "text",
      description: "`data-selector` attribute for testing",
    },
    icon: {
      control: "select",
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: "Icon component to render",
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
      description: "Color of the icon",
    },
    size: {
      control: "select",
      options: ["small", "default", "medium", "large", "xlarge", "big"],
      description: "Size of the icon",
    },
    cursor: {
      control: "select",
      options: ["default", "pointer"],
      description: "Cursor on hover",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    onClick: {
      action: "click",
      description: "Emitted when clicked and not disabled",
    },
  },
};

export const Primary = {
  args: {
    icon: "ial-settings",
    color: "success",
  },
  render: (args) => ({
    components: { CklIcon },
    setup() {
      return { args };
    },
    template: `
      <ckl-icon v-bind="args" @click="args.onClick" />
    `,
  }),
};

export const Sizes = {
  render: () => ({
    components: { CklIcon },
    setup() {
      const sizes = ["small", "default", "medium", "large", "xlarge", "big"];
      return { sizes, IalSettings };
    },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <div v-for="size in sizes" :key="size" style="text-align: center; font-family: sans-serif; font-size: 12px;">
          <ckl-icon :icon="IalSettings" :size="size" color="primary" />
          <div style="margin-top: 8px;">{{ size }}</div>
        </div>
      </div>
    `,
  }),
};

export const Colors = {
  render: () => ({
    components: { CklIcon },
    setup() {
      const colors = ["primary", "secondary", "success", "warning", "error", "info", "grey"];
      return { colors, IalUser };
    },
    template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <div v-for="color in colors" :key="color" style="text-align: center; font-family: sans-serif; font-size: 12px;">
          <ckl-icon :icon="IalUser" size="medium" :color="color" />
          <div style="margin-top: 8px;">{{ color }}</div>
        </div>
      </div>
    `,
  }),
};

export const Interactive = {
  render: () => ({
    components: { CklIcon },
    setup() {
      return { IalSettings };
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <ckl-icon :icon="IalSettings" size="large" cursor="pointer" color="primary" />
        <ckl-icon :icon="IalSettings" size="large" cursor="pointer" color="primary" disabled />
      </div>
    `,
  }),
};
