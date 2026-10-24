import "@components-kit/styles/scss/all";
import "@components-kit/storybook-shared/styles/style.scss";
import "@components-kit/storybook-shared/styles/side-nav-themes.scss";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
};

export default preview;
