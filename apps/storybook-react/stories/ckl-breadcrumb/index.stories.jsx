import React from "react";
import { CklBreadcrumb } from "@components-kit/react-ckl-breadcrumb";

export default {
  title: "components/ckl-breadcrumb",
  component: CklBreadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    path: [
      {
        name: "home",
        text: "home",
        params: { id: "1" },
      },
      {
        name: "detail",
        text: "detail",
        params: { id: "2" },
      },
      {
        name: "contact",
        text: "contact",
        params: { id: "3" },
      },
    ],
    size: "",
  },
  argTypes: {
    onClick: {
      control: false,
      description: "Click handler for the breadcrumb root element",
      action: "onClick",
    },
    path: {
      control: "object",
      description: "Array of breadcrumb items with name, text, and params",
    },
    size: {
      control: "text",
      description: "CSS class or sizing class applied to nodes",
    },
    onNodeClick: {
      action: "onNodeClick",
      description: "Emitted when a breadcrumb node is clicked",
    },
  },
};

export const Primary = {
  render: (args) => <CklBreadcrumb {...args} />,
};

export const Sizes = {
  render: () => {
    const path = [
      { name: "home", text: "Home" },
      { name: "components", text: "Components" },
      { name: "breadcrumb", text: "Breadcrumb" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <CklBreadcrumb path={path} size="small" />
        <CklBreadcrumb path={path} />
        <CklBreadcrumb path={path} size="large" />
      </div>
    );
  },
};

export const Interactive = {
  render: (args) => {
    const [lastClicked, setLastClicked] = React.useState(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
        <CklBreadcrumb
          {...args}
          onNodeClick={(node) => {
            setLastClicked(node);
            args.onNodeClick?.(node);
          }}
        />
        {lastClicked && (
          <div style={{ fontSize: "14px", color: "#64748b" }}>
            Navigated to: <strong>{lastClicked.name}</strong> (ID: {lastClicked.params?.id})
          </div>
        )}
      </div>
    );
  },
};
