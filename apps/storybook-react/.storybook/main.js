/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-designs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@components-kit/styles/scss/all": new URL(
            "../../../packages/styles/src/all.scss",
            import.meta.url,
          ).pathname,
          "@components-kit/styles/scss": new URL(
            "../../../packages/styles/src/index.scss",
            import.meta.url,
          ).pathname,
        },
      },
      server: {
        cors: true,
      },
    });
  },
};

export default config;
