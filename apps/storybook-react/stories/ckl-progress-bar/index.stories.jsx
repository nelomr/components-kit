import React from "react";
import { CklProgressBar } from "@components-kit/react-ckl-progress-bar";

export default {
  title: "components/ckl-progress-bar",
  component: CklProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    value: 22,
  },
  argTypes: {
    renderText: {
      control: false,
      description: "Render prop for custom text; receives the adjusted progress value",
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress percentage value (0-100)",
    },
  },
};

export const Primary = {
  render: (args) => (
    <div style={{ width: "320px" }}>
      <CklProgressBar {...args} />
    </div>
  ),
};

export const UsingSlots = {
  render: (args) => (
    <div style={{ width: "320px" }}>
      <CklProgressBar {...args}>{(val) => `${val}% Completed`}</CklProgressBar>
    </div>
  ),
};

export const StatusStages = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <div>
        <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "sans-serif" }}>
          Error (0-25%)
        </span>
        <CklProgressBar value={15} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "sans-serif" }}>
          Warning (26-74%)
        </span>
        <CklProgressBar value={50} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "sans-serif" }}>
          Acceptable (75-99%)
        </span>
        <CklProgressBar value={85} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "sans-serif" }}>
          Success (100%)
        </span>
        <CklProgressBar value={100} />
      </div>
    </div>
  ),
};

export const CustomRenderText = {
  render: () => (
    <div style={{ width: "320px" }}>
      <CklProgressBar value={42} renderText={(val) => `Step ${val} of 100`} />
    </div>
  ),
};
