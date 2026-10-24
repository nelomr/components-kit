import { CklHorizontalTabs } from "@components-kit/vue-ckl-horizontal-tabs";

export default {
  title: "components/ckl-horizontal-tabs",
  component: CklHorizontalTabs,
  tags: ["autodocs"],
  args: {
    tabs: [
      {
        id: "1",
        text: "tab 1",
        icon: {
          icon: "ial-download",
          text: "I am a tooltip",
        },
      },
      {
        id: "2",
        text: "tab 2",
        disabled: true,
      },
      {
        id: "3",
        text: "tab 3",
        icon: {
          icon: "ial-download",
          text: "I am a tooltip",
          tooltipPosition: "right",
        },
      },
    ],
    selected: "1",
  },
  argTypes: {
    tabs: {
      control: "object",
      description: "Array of tab items with id, text, icon, and disabled properties",
    },
    selected: {
      control: "text",
      description: "Currently selected tab id",
    },
    "select-tab": {
      action: "select-tab",
      table: {
        type: {
          summary: "Event emitted when selecting a tab",
        },
        defaultValue: { summary: "(id) => void" },
      },
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklHorizontalTabs },
    setup() {
      return { args };
    },
    template: `<ckl-horizontal-tabs 
                v-bind="args"
                @select-tab="(tab) => { args.selected = tab; args['select-tab']?.(tab); }"
              />`,
  }),
};

export const Playground = {
  render: (args) => ({
    components: { CklHorizontalTabs },
    setup() {
      return { args };
    },
    template: `<ckl-horizontal-tabs 
                v-bind="args"
                @select-tab="(tab) => { args.selected = tab; args['select-tab']?.(tab); }"
              />`,
  }),
};
