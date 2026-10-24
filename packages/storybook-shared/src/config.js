export function createStorybookConfig({
  framework = "vue",
  stories = ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  refs,
  plugins = [],
  aliases = {},
  features = {},
  viteConfig = {},
} = {}) {
  const frameworkName = framework === "react" ? "@storybook/react-vite" : "@storybook/vue3-vite";

  const config = {
    stories,
    addons: ["@storybook/addon-docs", "@storybook/addon-designs"],
    framework: {
      name: frameworkName,
      options: {},
    },
    core: {
      disableTelemetry: true,
    },
    features: {
      ...(framework === "vue" ? { experimentalDocgenServer: true } : {}),
      ...features,
    },
    docs: {
      autodocs: "tag",
    },
    ...(refs ? { refs } : {}),
    async viteFinal(baseConfig) {
      const { mergeConfig } = await import("vite");
      const resolvedPlugins = typeof plugins === "function" ? await plugins() : plugins;
      return mergeConfig(baseConfig, {
        resolve: {
          alias: {
            ...aliases,
          },
        },
        server: {
          cors: true,
        },
        plugins: resolvedPlugins,
        css: {
          preprocessorOptions: {
            scss: {
              api: "modern-compiler",
              additionalData: '@use "@components-kit/styles/scss" as *;\n',
            },
          },
        },
        ...viteConfig,
      });
    },
  };

  return config;
}
