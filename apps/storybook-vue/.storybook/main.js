import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
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
          vue: fileURLToPath(import.meta.resolve("vue/dist/vue.esm-bundler.js")),
        },
      },
      server: {
        cors: true,
      },
      plugins: [vue(), svgLoader()],
    });
  },
};

export default config;
