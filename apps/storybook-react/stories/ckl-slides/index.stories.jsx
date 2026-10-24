import React, { useState } from "react";
import { CklSlides } from "@components-kit/react-ckl-slides";

export default {
  title: "components/ckl-slides",
  component: CklSlides,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    slides: ["one", "two", "three"],
    selected: "one",
  },
  argTypes: {
    slides: {
      control: "object",
      description: "Array of slide names or identifiers",
    },
    selected: {
      control: "text",
      description: "Currently selected slide",
    },
    onSelectSlide: {
      action: "onSelectSlide",
      table: {
        type: { summary: "Event emitted on selecting a slide" },
        defaultValue: { summary: "() => void" },
      },
    },
  },
};

function ControlledSlides(args) {
  const [selected, setSelected] = useState(args.selected || "one");

  const handleSelect = (slide) => {
    setSelected(slide);
    args.onSelectSlide?.(slide);
  };

  return (
    <div style={{ width: "240px" }}>
      <CklSlides {...args} selected={selected} onSelectSlide={handleSelect} />
    </div>
  );
}

export const Primary = {
  render: (args) => <ControlledSlides {...args} />,
};

export const Playground = {
  render: (args) => <ControlledSlides {...args} />,
};

export const Interactive = {
  render: () => {
    const slides = ["step-1", "step-2", "step-3", "step-4"];
    const [active, setActive] = useState("step-1");
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: "300px",
            height: "160px",
            background: "#f1f5f9",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 600,
            color: "#334155",
            fontFamily: "sans-serif",
          }}
        >
          Content for {active}
        </div>
        <CklSlides slides={slides} selected={active} onSelectSlide={setActive} />
      </div>
    );
  },
};
