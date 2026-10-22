import { CklLoader } from "@components-kit/ckl-loader/src";

export default {
  title: "components/ckl-loader",
  component: CklLoader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklLoader },
    setup() {
      return { args };
    },
    template: `<ckl-loader 
                v-bind="args" v-on="args"
              />`,
  }),
};
