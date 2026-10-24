import React, { useState } from "react";
import { CklCarousel } from "@components-kit/react-ckl-carousel";

export default {
  title: "components/ckl-carousel",
  component: CklCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    items: [
      { id: "1", content: "Slide 1" },
      { id: "2", content: "Slide 2" },
      { id: "3", content: "Slide 3" },
      { id: "4", content: "Slide 4" },
      { id: "5", content: "Slide 5" },
    ],
    itemWidth: 200,
    gap: 16,
    slidesToScroll: 1,
    transitionDuration: 300,
    itemKey: "id",
  },
  argTypes: {
    modelValue: {
      control: "number",
      description: "Controlled current index (Vue-style alias of `value`)",
    },
    defaultValue: {
      control: "number",
      description: "Initial index when uncontrolled",
    },
    renderSlide: {
      control: false,
      description: "Render prop for each slide: `(item, index) => node`",
    },
    onUpdateModelValue: {
      action: "onUpdateModelValue",
      description: "Called with the new index (Vue `update:model-value` equivalent)",
    },
    items: {
      control: "object",
      description: "Array of items to display in the carousel",
    },
    itemWidth: {
      control: "number",
      description: "Width of each slide in pixels",
    },
    gap: {
      control: "number",
      description: "Gap between slides in pixels",
    },
    slidesToScroll: {
      control: "number",
      description: "Number of slides to scroll at once",
    },
    transitionDuration: {
      control: "number",
      description: "Duration of the transition in milliseconds",
    },
    itemKey: {
      control: "text",
      description: "Key to identify unique items",
    },
    visibleItems: {
      control: "number",
      description:
        "Number of items visible at once. If set, overrides automatic width calculation.",
    },
    value: {
      control: "number",
      description: "Current slide index",
    },
    onChange: {
      action: "onChange",
      description: "Emitted when the current index changes",
    },
  },
};

export const Primary = {
  render: (args) => (
    <div style={{ width: "800px", maxWidth: "100%" }}>
      <CklCarousel
        {...args}
        renderSlide={(item) => (
          <div
            style={{
              height: "150px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "sans-serif",
              color: "#374151",
              fontWeight: 500,
            }}
          >
            {item.content || item.name || String(item)}
          </div>
        )}
      />
    </div>
  ),
};

export const Interactive = {
  render: (args) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <div style={{ width: "800px", maxWidth: "100%" }}>
        <div style={{ marginBottom: "16px", fontFamily: "sans-serif" }}>
          Current Index: <strong>{currentIndex}</strong>
          <button
            onClick={() => setCurrentIndex(0)}
            style={{ marginLeft: "10px", padding: "4px 8px", cursor: "pointer" }}
          >
            Go to Start
          </button>
          <button
            onClick={() => setCurrentIndex(4)}
            style={{ marginLeft: "10px", padding: "4px 8px", cursor: "pointer" }}
          >
            Go to End
          </button>
        </div>
        <CklCarousel
          {...args}
          value={currentIndex}
          onChange={(val) => {
            setCurrentIndex(val);
            args.onChange?.(val);
          }}
          renderSlide={(item, index) => (
            <div
              style={{
                height: "150px",
                backgroundColor: index === currentIndex ? "#fee2e2" : "#f3f4f6",
                border: index === currentIndex ? "2px solid #ef4444" : "1px solid #e5e7eb",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "sans-serif",
                color: index === currentIndex ? "#b91c1c" : "#374151",
                fontWeight: 500,
                transition: "all 0.3s",
              }}
            >
              {item.content} (Index: {index})
            </div>
          )}
        />
      </div>
    );
  },
};

export const FixedVisibleItems = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      content: `Item ${i + 1}`,
    })),
    itemWidth: 100,
    visibleItems: 3,
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <p style={{ fontFamily: "sans-serif", marginBottom: "12px", color: "#64748b" }}>
        This carousel shows exactly 3 items even if there is space for more.
      </p>
      <CklCarousel
        {...args}
        renderSlide={(item) => (
          <div
            style={{
              height: "100px",
              backgroundColor: "#d1fae5",
              border: "1px solid #6ee7b7",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "sans-serif",
              color: "#047857",
            }}
          >
            {item.content}
          </div>
        )}
      />
    </div>
  ),
};

export const NoControls = {
  args: {
    items: [
      { id: "1", content: "Slide 1" },
      { id: "2", content: "Slide 2" },
    ],
    itemWidth: 200,
  },
  render: (args) => (
    <div style={{ width: "600px", maxWidth: "100%" }}>
      <CklCarousel
        {...args}
        renderSlide={(item) => (
          <div
            style={{
              height: "150px",
              backgroundColor: "#e0f2fe",
              border: "1px solid #bae6fd",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "sans-serif",
              color: "#0369a1",
            }}
          >
            {item.content}
          </div>
        )}
      />
    </div>
  ),
};
