import React from "react";
import { CklBadge } from "@components-kit/react-ckl-badge";

export default {
  title: "components/ckl-badge",
  component: CklBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
### CklBadge

Flexible status indicators, notification pills, count tags, and outline badges for React applications.

#### Installation
\`\`\`bash
pnpm add @components-kit/react-ckl-badge
\`\`\`

#### Quick Example
\`\`\`jsx
import { CklBadge } from '@components-kit/react-ckl-badge';

export default function Example() {
  return <CklBadge color="primary" shape="oval">Active</CklBadge>;
}
\`\`\`
`,
      },
    },
  },
  args: {
    color: "primary",
    size: "large",
    shape: "oval",
    outlined: false,
    children: "Badge",
  },
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "error",
        "success",
        "warning",
        "info",
        "purple",
        "mid-blue",
        "transparent",
      ],
      description: "Color theme of the badge",
      table: {
        category: "Appearance",
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["large", "medium", "small", "x-small"],
      description: "Size of the badge",
      table: {
        category: "Dimensions",
        defaultValue: { summary: "large" },
      },
    },
    shape: {
      control: "select",
      options: ["oval", "square", "circle"],
      description: "Shape of the badge container",
      table: {
        category: "Appearance",
        defaultValue: { summary: "oval" },
      },
    },
    outlined: {
      control: "boolean",
      description: "Renders badge in outlined style",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "Badge content rendered as child",
      table: {
        category: "Content",
        defaultValue: { summary: "Badge" },
      },
    },
  },
};

export const Primary = {
  parameters: {
    docs: {
      description: {
        story: "Standard interactive badge controlled via Storybook Controls table below.",
      },
    },
  },
  render: (args) => <CklBadge {...args}>{args.children}</CklBadge>,
};

export const Colors = {
  parameters: {
    docs: {
      description: {
        story:
          "Full palette of brand and semantic color tokens: `primary`, `secondary`, `success`, `warning`, `error`, `info`, `purple`, and `mid-blue`.",
      },
    },
  },
  render: () => {
    const colors = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "info",
      "purple",
      "mid-blue",
    ];
    return (
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        {colors.map((color) => (
          <CklBadge key={color} color={color}>
            {color}
          </CklBadge>
        ))}
      </div>
    );
  },
};

export const Outlined = {
  parameters: {
    docs: {
      description: {
        story:
          "Outlined badge variants with transparent backgrounds and colored borders for subtle status indicators.",
      },
    },
  },
  render: () => {
    const colors = ["primary", "secondary", "success", "warning", "error", "info", "purple"];
    return (
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        {colors.map((color) => (
          <CklBadge key={color} color={color} outlined>
            {color}
          </CklBadge>
        ))}
      </div>
    );
  },
};

export const Sizes = {
  parameters: {
    docs: {
      description: {
        story: "Standard size scale: `large`, `medium`, `small`, and `x-small`.",
      },
    },
  },
  render: () => {
    const sizes = ["large", "medium", "small", "x-small"];
    return (
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {sizes.map((size) => (
          <CklBadge key={size} size={size} color="primary">
            {size}
          </CklBadge>
        ))}
      </div>
    );
  },
};

export const Shapes = {
  parameters: {
    docs: {
      description: {
        story:
          "Three geometric boundary shapes: `oval` (pill), `square` (rounded box), and `circle` (compact count indicator).",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <CklBadge shape="oval" color="primary">
        Oval Pill
      </CklBadge>
      <CklBadge shape="square" color="primary">
        Square
      </CklBadge>
      <CklBadge shape="circle" color="error">
        5
      </CklBadge>
    </div>
  ),
};
