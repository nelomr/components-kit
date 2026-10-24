import React, { useState } from "react";
import { CklVerticalTabs } from "@components-kit/react-ckl-vertical-tabs";

export default {
  title: "components/ckl-vertical-tabs",
  component: CklVerticalTabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    tabs: [
      { value: "profile", name: "Profile Information" },
      { value: "security", name: "Security & 2FA" },
      { value: "billing", name: "Billing & Plans" },
      { value: "notifications", name: "Notification Preferences" },
      { value: "advanced", name: "Advanced Settings", disabled: true },
    ],
    selectedTab: "profile",
  },
  argTypes: {
    tabErrors: {
      control: "object",
      description: "Object keyed by tab value; `true` shows the error indicator on that tab",
    },
    primaryIcon: {
      control: "object",
      description: "Custom left icon component (defaults to the error alert icon)",
    },
    primaryIconColor: {
      control: "select",
      description: "Color token applied to the primary icon",
      options: ["error", "primary", "secondary", "success", "warning", "info", "grey"],
    },
    secondaryIcons: {
      control: "object",
      description: "Icons shown on the right side of the tabs",
    },
    tabs: {
      control: "object",
      description: "Array of tab definitions",
    },
    selectedTab: {
      control: "text",
      description: "Active tab value",
    },
    onSelectTab: {
      action: "onSelectTab",
      description: "Emitted when a tab is selected",
    },
  },
};

function ControlledVerticalTabs(args) {
  const [selected, setSelected] = useState(args.selectedTab || "profile");

  const handleSelect = (tabValue) => {
    setSelected(tabValue);
    args.onSelectTab?.(tabValue);
  };

  return <CklVerticalTabs {...args} selectedTab={selected} onSelectTab={handleSelect} />;
}

export const Primary = {
  render: (args) => (
    <div style={{ width: "280px" }}>
      <ControlledVerticalTabs {...args} />
    </div>
  ),
};

export const Interactive = {
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedTab || "profile");

    return (
      <div style={{ width: "500px", display: "flex", gap: "24px", fontFamily: "sans-serif" }}>
        <div style={{ width: "240px", borderRight: "1px solid #e2e8f0", paddingRight: "16px" }}>
          <CklVerticalTabs
            {...args}
            selectedTab={selected}
            onSelectTab={(tab) => {
              setSelected(tab);
              args.onSelectTab?.(tab);
            }}
          />
        </div>
        <div style={{ flex: 1, padding: "16px", background: "#f8fafc", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0, textTransform: "capitalize", color: "#1e293b" }}>
            {selected} Panel
          </h3>
          <p style={{ color: "#64748b" }}>Content corresponding to selected vertical step.</p>
        </div>
      </div>
    );
  },
};

export const WithErrorIndicators = {
  args: {
    tabs: [
      { value: "step-1", name: "Step 1: Account Info" },
      { value: "step-2", name: "Step 2: Payment Details" },
      { value: "step-3", name: "Step 3: Review & Submit" },
    ],
    selectedTab: "step-2",
    tabErrors: {
      "step-2": true,
    },
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <ControlledVerticalTabs {...args} />
    </div>
  ),
};
