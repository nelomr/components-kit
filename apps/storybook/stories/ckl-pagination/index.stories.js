import { CklPagination } from "@components-kit/ckl-pagination/src";

export default {
  title: "components/ckl-pagination",
  component: CklPagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    numPages: 10,
    current: 1,
    itemToShow: 7,
  },
  argTypes: {
    numPages: {
      control: "number",
      description: "Total number of pages",
    },
    current: {
      control: "number",
      description: "Current active page (1-based)",
    },
    itemToShow: {
      control: "number",
      description: "Number of pagination items shown",
    },
    "page-updated": {
      action: "page-updated",
      description: "Emitted when a page is selected",
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklPagination },
    setup() {
      return { args };
    },
    template: `
      <ckl-pagination 
        v-bind="args" 
        @page-updated="(page) => { args.current = page; args['page-updated']?.(page); }" 
      />
    `,
  }),
};

export const Interactive = {
  render: (args) => ({
    components: { CklPagination },
    setup() {
      return { args };
    },
    template: `
      <div style="font-family: sans-serif; text-align: center;">
        <div style="margin-bottom: 16px;">
          Active Page: <strong>{{ args.current }}</strong> of {{ args.numPages }}
        </div>
        <ckl-pagination
          v-bind="args"
          @page-updated="(page) => { args.current = page; args['page-updated']?.(page); }"
        />
      </div>
    `,
  }),
  args: {
    numPages: 20,
    current: 5,
    itemToShow: 7,
  },
};

export const SmallPageCount = {
  args: {
    numPages: 4,
    current: 2,
  },
  render: (args) => ({
    components: { CklPagination },
    setup() {
      return { args };
    },
    template: `
      <ckl-pagination 
        v-bind="args" 
        @page-updated="(page) => { args.current = page; args['page-updated']?.(page); }" 
      />
    `,
  }),
};

export const LargePageCount = {
  args: {
    numPages: 50,
    current: 25,
    itemToShow: 7,
  },
  render: (args) => ({
    components: { CklPagination },
    setup() {
      return { args };
    },
    template: `
      <ckl-pagination 
        v-bind="args" 
        @page-updated="(page) => { args.current = page; args['page-updated']?.(page); }" 
      />
    `,
  }),
};
