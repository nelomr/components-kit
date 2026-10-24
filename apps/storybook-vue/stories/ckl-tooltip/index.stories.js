import { CklTooltip } from "@components-kit/vue-ckl-tooltip";

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
    inBodyClass: {
      control: "text",
      description: "Extra class(es) applied to the tooltip element when attached to the body",
    },
    dataSelector: {
      control: "text",
      description: "`data-selector` attribute for testing",
    },
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
  args: {
    text: "This is a helpful tooltip message",
    position: "top",
    color: "primary",
    trigger: "manual",
    visible: true,
  },
  render: (args) => ({
    components: { CklTooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center; align-items: center;">
        <ckl-tooltip v-bind="args">
          <button style="padding: 12px 24px; border-radius: 8px; background: #244A8A; color: white; border: none; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(36, 74, 138, 0.2);">
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
      <div style="display: flex; gap: 48px; padding: 120px 60px; justify-content: center; flex-wrap: wrap;">
        <ckl-tooltip text="Tooltip on Top" position="top" trigger="manual" :visible="true">
          <button style="padding: 10px 20px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; font-weight: 600;">Top</button>
        </ckl-tooltip>
        <ckl-tooltip text="Tooltip on Bottom" position="bottom" trigger="manual" :visible="true">
          <button style="padding: 10px 20px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; font-weight: 600;">Bottom</button>
        </ckl-tooltip>
        <ckl-tooltip text="Tooltip on Left" position="left" trigger="manual" :visible="true">
          <button style="padding: 10px 20px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; font-weight: 600;">Left</button>
        </ckl-tooltip>
        <ckl-tooltip text="Tooltip on Right" position="right" trigger="manual" :visible="true">
          <button style="padding: 10px 20px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; font-weight: 600;">Right</button>
        </ckl-tooltip>
      </div>
    `,
  }),
};

export const Colors = {
  render: () => ({
    components: { CklTooltip },
    setup() {
      const colors = [
        { name: "primary", hex: "#244A8A" },
        { name: "success", hex: "#10B981" },
        { name: "error", hex: "#EF4444" },
        { name: "warning", hex: "#F59E0B" },
        { name: "info", hex: "#38BDF8" },
      ];
      return { colors };
    },
    template: `
      <div style="display: flex; gap: 36px; padding: 120px 40px 60px; flex-wrap: wrap; justify-content: center; align-items: center;">
        <ckl-tooltip
          v-for="item in colors"
          :key="item.name"
          :text="'Tooltip ' + item.name"
          :color="item.name"
          position="top"
          trigger="manual"
          :visible="true"
        >
          <button
            :style="{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '2px solid ' + item.hex,
              background: '#ffffff',
              color: item.hex,
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
            }"
          >
            {{ item.name }}
          </button>
        </ckl-tooltip>
      </div>
    `,
  }),
};

export const ClickTrigger = {
  args: {
    text: "Click outside to dismiss",
    trigger: "click",
    position: "top",
    color: "success",
    attachToBody: false,
    noPadding: false,
    disabled: false,
  },
  render: (args) => ({
    components: { CklTooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 80px; display: flex; justify-content: center; align-items: center;">
        <ckl-tooltip v-bind="args">
          <button style="padding: 10px 20px; background: #10B981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);">
            Click Me
          </button>
        </ckl-tooltip>
      </div>
    `,
  }),
};

export const RichContentSlot = {
  args: {
    color: "primary",
    position: "bottom",
    trigger: "hover",
    attachToBody: false,
    noPadding: false,
    disabled: false,
  },
  render: (args) => ({
    components: { CklTooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 80px; display: flex; justify-content: center; align-items: center;">
        <ckl-tooltip v-bind="args">
          <button style="padding: 10px 20px; border-radius: 8px; background: #244A8A; color: white; border: none; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(36, 74, 138, 0.2);">
            Rich Content
          </button>
          <template #tooltip>
            <div style="padding: 6px; text-align: left; max-width: 240px;">
              <strong style="display: block; margin-bottom: 4px; font-size: 13px;">Important Notice</strong>
              <span style="font-size: 12px; opacity: 0.95;">Custom HTML with links, icons, and styling inside the tooltip.</span>
            </div>
          </template>
        </ckl-tooltip>
      </div>
    `,
  }),
};
