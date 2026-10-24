import "@components-kit/storybook-shared/styles/style.scss";

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
};

export default preview;
