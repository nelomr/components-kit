import React from "react";
import { CklLoader } from "@components-kit/react-ckl-loader";

export default {
  title: "components/ckl-loader",
  component: CklLoader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export const Primary = {
  render: (args) => <CklLoader {...args} />,
};

export const InContainer = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        border: "1px dashed #cbd5e1",
        borderRadius: "8px",
        minWidth: "240px",
        gap: "16px",
      }}
    >
      <CklLoader />
      <span style={{ fontSize: "14px", color: "#64748b", fontFamily: "sans-serif" }}>
        Loading data...
      </span>
    </div>
  ),
};
