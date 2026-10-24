export const sharedPreviewParameters = {
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
};

export const createPreview = (overrides = {}) => ({
  parameters: {
    ...sharedPreviewParameters,
    ...overrides.parameters,
  },
  ...overrides,
});
