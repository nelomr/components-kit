import { CklTooltip } from "@components-kit/ckl-tooltip/src";

export default {
  title: "components/ckl-tooltip",
  component: CklTooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    text: "This is a helpful tooltip message",
    position: "bottom",
    color: "primary",
    trigger: "hover",
    attachToBody: false,
    noPadding: false,
    disabled: false,
    visible: false,
  },
  argTypes: {
    text: {
      control: "text",
      description: "Text displayed in the tooltip",
    },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Position relative to trigger element",
    },
    color: {
      control: "select",
      options: ["primary", "success", "error", "warning", "info"],
      description: "Color theme of the tooltip",
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "manual"],
      description: "Interaction trigger mode",
    },
    visible: {
      control: "boolean",
      description: "Controls tooltip visibility when trigger is manual",
    },
    attachToBody: {
      control: "boolean",
      description: "Teleports tooltip to body to prevent overflow clipping",
    },
    noPadding: {
      control: "boolean",
      description: "Removes internal padding from tooltip",
    },
    disabled: {
      control: "boolean",
      description: "Disables tooltip visibility",
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklTooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 80px; display: flex; justify-content: center; align-items: center;">
        <ckl-tooltip v-bind="args">
          <button style="padding: 10px 20px; border-radius: 6px; background: #244A8A; color: white; border: none; cursor: pointer; font-size: 14px;">
            Target Element
          </button>
        </ckl-tooltip>
      </div>
    `,
  }),
};

export const Positions = {
  render: () => ({
    components: { CklTooltip },
    template: `
      <div style="display: flex; gap: 32px; padding: 60px; justify-content: center;">
        <ckl-tooltip text="Tooltip Top" position="top">
          <button style="padding: 8px 16px; cursor: pointer;">Top</button>
        </ckl-tooltip>
        <ckl-tooltip text="Tooltip Bottom" position="bottom">
          <button style="padding: 8px 16px; cursor: pointer;">Bottom</button>
        </ckl-tooltip>
        <ckl-tooltip text="Tooltip Left" position="left">
          <button style="padding: 8px 16px; cursor: pointer;">Left</button>
        </ckl-tooltip>
        <ckl-tooltip text="Tooltip Right" position="right">
          <button style="padding: 8px 16px; cursor: pointer;">Right</button>
        </ckl-tooltip>
      </div>
    `,
  }),
};

export const Colors = {
  render: () => ({
    components: { CklTooltip },
    setup() {
      const colors = ["primary", "success", "error", "warning", "info"];
      return { colors };
    },
    template: `
      <div style="display: flex; gap: 24px; padding: 60px; flex-wrap: wrap; justify-content: center;">
        <ckl-tooltip v-for="color in colors" :key="color" :text="'Color: ' + color" :color="color" position="top">
          <button style="padding: 8px 16px; cursor: pointer; text-transform: capitalize;">{{ color }}</button>
        </ckl-tooltip>
      </div>
    `,
  }),
};

export const ClickTrigger = {
  render: () => ({
    components: { CklTooltip },
    template: `
      <div style="padding: 60px;">
        <ckl-tooltip text="Click outside to dismiss" trigger="click" position="top">
          <button style="padding: 8px 16px; background: #00a884; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Click Me
          </button>
        </ckl-tooltip>
      </div>
    `,
  }),
};

export const RichContentSlot = {
  render: () => ({
    components: { CklTooltip },
    template: `
      <div style="padding: 60px;">
        <ckl-tooltip position="bottom">
          <button style="padding: 8px 16px; cursor: pointer;">Rich Content</button>
          <template #tooltip>
            <div style="padding: 4px; text-align: left;">
              <strong style="display: block; margin-bottom: 4px;">Important Notice</strong>
              <span>Custom HTML with links, icons, and styling inside the tooltip.</span>
            </div>
          </template>
        </ckl-tooltip>
      </div>
    `,
  }),
};
