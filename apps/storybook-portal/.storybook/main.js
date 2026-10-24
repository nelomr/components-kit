import vue from "@vitejs/plugin-vue";

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.mdx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-designs"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  features: {
    experimentalDocgenServer: true,
  },
  docs: {
    autodocs: "tag",
  },
  refs: (_config, { configType }) => {
    const isDev = configType === "DEVELOPMENT";
    return {
      "vue-components": {
        title: "Vue 3 Components",
        url: isDev ? "http://localhost:6006" : "./vue",
        type: "server-checked",
        expanded: true,
      },
      "react-components": {
        title: "React 19 Components",
        url: isDev ? "http://localhost:6007" : "./react",
        type: "server-checked",
        expanded: true,
      },
    };
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [vue()],
    });
  },
};

export default config;
