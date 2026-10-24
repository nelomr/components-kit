import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CklBarometerChart } from "./ckl-barometer-chart.jsx";

describe("ckl-barometer-chart.jsx (React)", () => {
  it("renders correctly", () => {
    const { container } = render(<CklBarometerChart percentage={50} />);
    expect(container.querySelector(".ckl-barometer-chart")).toBeTruthy();
  });

  it("calculates rotation correctly for 0%", () => {
    const { container } = render(<CklBarometerChart percentage={0} />);
    const icon = container.querySelector(".ckl-barometer-chart__icon");
    expect(icon.getAttribute("style")).toContain("--ckl-barometer-chart-arrow-rotation: -90deg");
  });

  it("calculates rotation correctly for 100%", () => {
    const { container } = render(<CklBarometerChart percentage={100} />);
    const icon = container.querySelector(".ckl-barometer-chart__icon");
    expect(icon.getAttribute("style")).toContain("--ckl-barometer-chart-arrow-rotation: 89.9deg");
  });

  it("calculates rotation correctly for 50%", () => {
    const { container } = render(<CklBarometerChart percentage={50} />);
    const icon = container.querySelector(".ckl-barometer-chart__icon");
    const style = icon.getAttribute("style");
    const match = style.match(/--ckl-barometer-chart-arrow-rotation:\s*([-0-9.]+)deg/);
    expect(match).not.toBeNull();
    expect(Number(match[1])).toBeCloseTo(-0.05, 2);
  });

  it("clamps values below 0", () => {
    const { container } = render(<CklBarometerChart percentage={-10} />);
    const icon = container.querySelector(".ckl-barometer-chart__icon");
    expect(icon.getAttribute("style")).toContain("--ckl-barometer-chart-arrow-rotation: -90deg");
  });

  it("clamps values above 100", () => {
    const { container } = render(<CklBarometerChart percentage={110} />);
    const icon = container.querySelector(".ckl-barometer-chart__icon");
    expect(icon.getAttribute("style")).toContain("--ckl-barometer-chart-arrow-rotation: 89.9deg");
  });

  it("does not render any numeric percentage text", () => {
    const { container } = render(<CklBarometerChart percentage={50} />);
    expect(container.textContent).not.toContain("%");
    expect(container.textContent).not.toMatch(/\d/);
  });

  it("displays correct label for default ranges", () => {
    const { container, rerender } = render(<CklBarometerChart percentage={10} />);
    expect(container.querySelector(".ckl-barometer-chart__range-label").textContent).toBe(
      "Very Low",
    );

    rerender(<CklBarometerChart percentage={60} />);
    expect(container.querySelector(".ckl-barometer-chart__range-label").textContent).toBe("Mid");
  });
});
