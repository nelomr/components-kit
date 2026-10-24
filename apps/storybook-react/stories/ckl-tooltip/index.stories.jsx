import React from "react";
import { CklTooltip } from "@components-kit/react-ckl-tooltip";

export default {
  title: "components/ckl-tooltip",
  component: CklTooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    text: "This is a helpful tooltip message",
    position: "bottom",
    color: "primary",
    trigger: "hover",
    attachToBody: false,
    noPadding: false,
    disabled: false,
    visible: false,
  },
  argTypes: {
    inBodyClass: {
      control: "text",
      description: "Extra class(es) applied to the tooltip element when attached to the body",
    },
    dataSelector: {
      control: "text",
      description: "`data-selector` attribute for testing",
    },
    renderTooltip: {
      control: false,
      description: "Render prop for rich tooltip content (replaces `text`)",
    },
    text: {
      control: "text",
      description: "Text displayed in the tooltip",
    },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Position relative to trigger element",
    },
    color: {
      control: "select",
      options: ["primary", "success", "error", "warning", "info"],
      description: "Color theme of the tooltip",
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "manual"],
      description: "Interaction trigger mode",
    },
    visible: {
      control: "boolean",
      description: "Controls tooltip visibility when trigger is manual",
    },
    attachToBody: {
      control: "boolean",
      description: "Teleports tooltip to body to prevent overflow clipping",
    },
    noPadding: {
      control: "boolean",
      description: "Removes internal padding from tooltip",
    },
    disabled: {
      control: "boolean",
      description: "Disables tooltip visibility",
    },
  },
};

export const Primary = {
  args: {
    text: "This is a helpful tooltip message",
    position: "top",
    color: "primary",
    trigger: "manual",
    visible: true,
  },
  render: (args) => (
    <div
      style={{ padding: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CklTooltip {...args}>
        <button
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            background: "#244A8A",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0 2px 4px rgba(36, 74, 138, 0.2)",
          }}
        >
          Target Element
        </button>
      </CklTooltip>
    </div>
  ),
};

export const Positions = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "48px",
        padding: "120px 60px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <CklTooltip text="Tooltip on Top" position="top" trigger="manual" visible>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Top
        </button>
      </CklTooltip>
      <CklTooltip text="Tooltip on Bottom" position="bottom" trigger="manual" visible>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Bottom
        </button>
      </CklTooltip>
      <CklTooltip text="Tooltip on Left" position="left" trigger="manual" visible>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Left
        </button>
      </CklTooltip>
      <CklTooltip text="Tooltip on Right" position="right" trigger="manual" visible>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Right
        </button>
      </CklTooltip>
    </div>
  ),
};

export const Colors = {
  render: () => {
    const colors = [
      { name: "primary", hex: "#244A8A" },
      { name: "success", hex: "#10B981" },
      { name: "error", hex: "#EF4444" },
      { name: "warning", hex: "#F59E0B" },
      { name: "info", hex: "#38BDF8" },
    ];
    return (
      <div
        style={{
          display: "flex",
          gap: "36px",
          padding: "120px 40px 60px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {colors.map((item) => (
          <CklTooltip
            key={item.name}
            text={`Tooltip ${item.name}`}
            color={item.name}
            position="top"
            trigger="manual"
            visible
          >
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: `2px solid ${item.hex}`,
                background: "#ffffff",
                color: item.hex,
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                textTransform: "capitalize",
                boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
              }}
            >
              {item.name}
            </button>
          </CklTooltip>
        ))}
      </div>
    );
  },
};

export const ClickTrigger = {
  args: {
    text: "Click outside to dismiss",
    trigger: "click",
    position: "top",
    color: "success",
  },
  render: (args) => (
    <div
      style={{ padding: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CklTooltip {...args}>
        <button
          style={{
            padding: "10px 20px",
            background: "#10B981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
          }}
        >
          Click Me
        </button>
      </CklTooltip>
    </div>
  ),
};

export const RichContentSlot = {
  args: {
    color: "primary",
    position: "bottom",
    trigger: "hover",
  },
  render: (args) => (
    <div
      style={{ padding: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CklTooltip
        {...args}
        renderTooltip={() => (
          <div style={{ padding: "6px", textAlign: "left", maxWidth: "240px" }}>
            <strong style={{ display: "block", marginBottom: "4px", fontSize: "13px" }}>
              Important Notice
            </strong>
            <span style={{ fontSize: "12px", opacity: 0.95 }}>
              Custom HTML with links, icons, and styling inside the tooltip.
            </span>
          </div>
        )}
      >
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            background: "#244A8A",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0 2px 4px rgba(36, 74, 138, 0.2)",
          }}
        >
          Rich Content
        </button>
      </CklTooltip>
    </div>
  ),
};
