import React, { useState } from "react";
import { CklHorizontalTabs } from "@components-kit/react-ckl-horizontal-tabs";

export default {
  title: "components/ckl-horizontal-tabs",
  component: CklHorizontalTabs,
  tags: ["autodocs"],
  args: {
    tabs: [
      {
        id: "1",
        text: "tab 1",
        icon: {
          icon: "ial-download",
          text: "I am a tooltip",
        },
      },
      {
        id: "2",
        text: "tab 2",
        disabled: true,
      },
      {
        id: "3",
        text: "tab 3",
        icon: {
          icon: "ial-download",
          text: "I am a tooltip",
          tooltipPosition: "right",
        },
      },
    ],
    selected: "1",
  },
  argTypes: {
    tabs: {
      control: "object",
      description: "Array of tab items with id, text, icon, and disabled properties",
    },
    selected: {
      control: "text",
      description: "Currently selected tab id",
    },
    onSelectTab: {
      action: "onSelectTab",
      table: {
        type: { summary: "Event emitted when selecting a tab" },
        defaultValue: { summary: "(id) => void" },
      },
    },
  },
};

function ControlledTabs(args) {
  const [selected, setSelected] = useState(args.selected || "1");

  const handleSelect = (tabId) => {
    setSelected(tabId);
    args.onSelectTab?.(tabId);
  };

  return <CklHorizontalTabs {...args} selected={selected} onSelectTab={handleSelect} />;
}

export const Primary = {
  render: (args) => <ControlledTabs {...args} />,
};

export const Playground = {
  render: (args) => <ControlledTabs {...args} />,
};
