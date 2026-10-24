import React from "react";
import { CklIcon } from "@components-kit/react-ckl-icon";

const iconOptions = [
  "ial-home",
  "ial-user",
  "ial-settings",
  "ial-alert",
  "ial-download",
  "ial-arrow",
  "ial-arrow-down",
  "ial-arrow-pointer-down",
  "ial-arrow-pointer-left",
  "ial-arrow-pointer-right",
];

export default {
  title: "components/ckl-icon",
  component: CklIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    icon: "ial-home",
    color: "primary",
    size: "medium",
    cursor: "default",
    disabled: false,
  },
  argTypes: {
    name: {
      control: "text",
      description: "Alias of `icon` (icon name from the registry)",
    },
    dataSelector: {
      control: "text",
      description: "`data-selector` attribute for testing",
    },
    icon: {
      control: "select",
      options: iconOptions,
      description: "Icon identifier to render",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "grey",
        "info",
        "success",
        "warning",
        "error",
        "clear",
        "white",
      ],
      description: "Color token applied to the icon",
    },
    size: {
      control: "select",
      options: ["small", "default", "medium", "large", "xlarge", "big"],
      description: "Size preset for the icon",
    },
    cursor: {
      control: "select",
      options: ["default", "pointer"],
      description: "Cursor type on hover",
    },
    disabled: {
      control: "boolean",
      description: "Disabled appearance and interactions",
    },
    onClick: {
      action: "onClick",
      description: "Callback invoked when icon is clicked",
    },
  },
};

export const Primary = {
  args: {
    icon: "ial-settings",
    color: "success",
  },
  render: (args) => <CklIcon {...args} />,
};

export const Sizes = {
  render: () => {
    const sizes = ["small", "default", "medium", "large", "xlarge", "big"];
    return (
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {sizes.map((size) => (
          <div
            key={size}
            style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "12px" }}
          >
            <CklIcon icon="ial-settings" size={size} color="primary" />
            <div style={{ marginTop: "8px", color: "#64748b" }}>{size}</div>
          </div>
        ))}
      </div>
    );
  },
};

export const Colors = {
  render: () => {
    const colors = ["primary", "secondary", "success", "warning", "error", "info", "grey"];
    return (
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "12px" }}
          >
            <CklIcon icon="ial-user" size="medium" color={color} />
            <div style={{ marginTop: "8px", color: "#64748b" }}>{color}</div>
          </div>
        ))}
      </div>
    );
  },
};

export const Interactive = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <CklIcon icon="ial-settings" size="large" cursor="pointer" color="primary" />
      <CklIcon icon="ial-settings" size="large" cursor="pointer" color="primary" disabled />
    </div>
  ),
};
