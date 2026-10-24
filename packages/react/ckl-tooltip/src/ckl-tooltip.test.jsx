import React from "react";
import { describe, test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CklTooltip } from "./ckl-tooltip.jsx";

describe("ckl-tooltip.jsx (React)", () => {
  const triggerElem = "tooltip trigger";
  const text = "tooltip text";

  test("mount component", () => {
    expect(CklTooltip).toBeTruthy();
    const { container } = render(
      <CklTooltip text={text}>
        <span>{triggerElem}</span>
      </CklTooltip>,
    );
    expect(container.textContent).toContain("tooltip text");
  });

  describe("state", () => {
    test("should apply color classes", () => {
      const { container } = render(
        <CklTooltip color="success" text={text}>
          <span>{triggerElem}</span>
        </CklTooltip>,
      );
      const tooltip = container.querySelector(".ckl-tooltip__container");
      expect(tooltip.className).toContain("ckl-tooltip__container--color-success");
    });

    test("should apply position classes", () => {
      const { container } = render(
        <CklTooltip position="left" text={text}>
          <span>{triggerElem}</span>
        </CklTooltip>,
      );
      const tooltip = container.querySelector(".ckl-tooltip__container");
      expect(tooltip.className).toContain("ckl-tooltip__container--position-left");
    });

    test("should show text prop value", () => {
      const { container } = render(
        <CklTooltip text={text}>
          <span>{triggerElem}</span>
        </CklTooltip>,
      );
      const tooltip = container.querySelector(".ckl-tooltip__container");
      expect(tooltip.textContent).toContain("tooltip text");
    });

    test("should apply no-padding classes", () => {
      const { container } = render(
        <CklTooltip text={text} noPadding>
          <span>{triggerElem}</span>
        </CklTooltip>,
      );
      const tooltip = container.querySelector(".ckl-tooltip__container");
      expect(tooltip.className).toContain("ckl-tooltip__container--no-padding");
    });
  });

  describe("events", () => {
    describe("hover trigger", () => {
      test("should show tooltip on mouseover", () => {
        const { container } = render(
          <CklTooltip text="tooltip text">
            <span>{triggerElem}</span>
          </CklTooltip>,
        );
        const wrapper = container.querySelector(".ckl-tooltip");
        fireEvent.mouseOver(wrapper);
        const tooltip = container.querySelector(".ckl-tooltip__container");
        expect(tooltip.className).toContain("ckl-tooltip__container--visible");
      });

      test("should hide tooltip on mouseleave", () => {
        const { container } = render(
          <CklTooltip text="tooltip text">
            <span>{triggerElem}</span>
          </CklTooltip>,
        );
        const wrapper = container.querySelector(".ckl-tooltip");
        fireEvent.mouseOver(wrapper);
        const tooltip = container.querySelector(".ckl-tooltip__container");
        expect(tooltip.className).toContain("ckl-tooltip__container--visible");
        fireEvent.mouseLeave(wrapper);
        expect(tooltip.className).not.toContain("ckl-tooltip__container--visible");
      });
    });

    describe("click trigger", () => {
      test("should show tooltip on click", () => {
        const { container } = render(
          <CklTooltip trigger="click" text="tooltip text">
            <span>{triggerElem}</span>
          </CklTooltip>,
        );
        const wrapper = container.querySelector(".ckl-tooltip");
        fireEvent.click(wrapper);
        const tooltip = container.querySelector(".ckl-tooltip__container");
        expect(tooltip.className).toContain("ckl-tooltip__container--visible");
      });
    });

    describe("manual trigger", () => {
      test("should show and hide tooltip with visible prop", () => {
        const { container, rerender } = render(
          <CklTooltip trigger="manual" visible={false} text="tooltip text">
            <span>{triggerElem}</span>
          </CklTooltip>,
        );
        let tooltip = container.querySelector(".ckl-tooltip__container");
        expect(tooltip.className).not.toContain("ckl-tooltip__container--visible");

        rerender(
          <CklTooltip trigger="manual" visible={true} text="tooltip text">
            <span>{triggerElem}</span>
          </CklTooltip>,
        );
        tooltip = container.querySelector(".ckl-tooltip__container");
        expect(tooltip.className).toContain("ckl-tooltip__container--visible");
      });
    });
  });
});
