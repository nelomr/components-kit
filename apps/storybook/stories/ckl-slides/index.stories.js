import { CklSlides } from "@components-kit/ckl-slides/src";

export default {
  title: "components/ckl-slides",
  component: CklSlides,
  decorators: [() => ({ template: '<div style="width:50%;"><story /></div>' })],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    slides: ["one", "two", "three"],
    selected: "one",
  },
  argTypes: {
    slides: {
      control: "object",
      description: "Array of slide names or identifiers",
    },
    selected: {
      control: "text",
      description: "Currently selected slide",
    },
    "select-slide": {
      action: "select-slide",
      table: {
        type: {
          summary: "Event emitted on selecting a slide",
        },
        defaultValue: { summary: "() => void" },
      },
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklSlides },
    setup() {
      return { args };
    },
    template: `
      <ckl-slides 
        v-bind="args" 
        @select-slide="(slide) => { args.selected = slide; args['select-slide']?.(slide); }"
      />`,
  }),
};

export const Playground = {
  render: (args) => ({
    components: { CklSlides },
    setup() {
      return { args };
    },
    template: `
      <ckl-slides 
        v-bind="args" 
        @select-slide="(slide) => { args.selected = slide; args['select-slide']?.(slide); }"
      />`,
  }),
};
