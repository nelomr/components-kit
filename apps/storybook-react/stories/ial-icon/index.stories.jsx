import React from "react";
import { IalIcon } from "@components-kit/assets/react";

const iconList = [
  "ial-alert",
  "ial-arrow",
  "ial-arrow-down",
  "ial-arrow-pointer-down",
  "ial-arrow-pointer-left",
  "ial-arrow-pointer-right",
  "ial-download",
  "ial-home",
  "ial-settings",
  "ial-user",
];

const colorList = [
  "primary",
  "secondary",
  "grey",
  "info",
  "success",
  "warning",
  "error",
  "clear",
  "white",
];
const sizeList = ["small", "default", "medium", "large", "xlarge", "big"];

export default {
  title: "assets/ial-icon",
  component: IalIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    icon: "ial-home",
    size: "medium",
    color: "primary",
    cursor: "default",
    disabled: false,
  },
  argTypes: {
    icon: {
      control: "select",
      options: iconList,
      description: "Icon name from the active icon registry",
    },
    size: {
      control: "select",
      options: sizeList,
      description: "Size scaling of the icon",
    },
    color: {
      control: "select",
      options: colorList,
      description: "Color theme of the icon",
    },
    cursor: {
      control: "select",
      options: ["default", "pointer"],
      description: "Hover cursor type",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    dataSelector: {
      control: "text",
      description: "`data-selector` attribute for testing",
    },
    onClick: { action: "onClick", description: "Click handler (not fired while disabled)" },
  },
};

export const Primary = {
  render: (args) => <IalIcon {...args} />,
};

export const CuratedIconGallery = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 20,
        fontFamily: "sans-serif",
      }}
    >
      {iconList.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 16,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            minWidth: 120,
          }}
        >
          <IalIcon icon={name} size="large" color="primary" />
          <span
            style={{
              marginTop: 10,
              fontSize: 11,
              color: "#475569",
              wordBreak: "break-all",
              textAlign: "center",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center", fontFamily: "sans-serif" }}>
      {sizeList.map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <IalIcon icon="ial-settings" size={size} color="primary" />
          <div style={{ marginTop: 8, fontSize: 11, color: "#64748b" }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};

export const Colors = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center", fontFamily: "sans-serif" }}>
      {["primary", "secondary", "success", "warning", "error", "info", "grey"].map((color) => (
        <div key={color} style={{ textAlign: "center" }}>
          <IalIcon icon="ial-user" size="large" color={color} />
          <div style={{ marginTop: 8, fontSize: 11, color: "#64748b" }}>{color}</div>
        </div>
      ))}
    </div>
  ),
};
