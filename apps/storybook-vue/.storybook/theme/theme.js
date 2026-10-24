import { create } from "storybook/theming";

export default create({
  base: "light",

  colorPrimary: "#244A8A",
  colorSecondary: "#244A8A",

  appBg: "#F8FAFC",
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",

  textColor: "#0F172A",
  textInverseColor: "#FFFFFF",

  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Open Sans", sans-serif',
  fontCode: 'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',

  brandTitle: "Components Kit",
});
