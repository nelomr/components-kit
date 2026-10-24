import React from "react";
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { CklProgressBar } from "./ckl-progress-bar.jsx";

describe("ckl-progress-bar.jsx (React)", () => {
  test("mount component", () => {
    expect(CklProgressBar).toBeTruthy();
  });

  describe("state", () => {
    test("should display error if value <= 25", () => {
      const { container } = render(<CklProgressBar value={20} />);
      const barValue = container.querySelector(".ckl-progress-bar__value");
      expect(barValue.className).toContain("ckl-progress-bar__value--color-error");
    });

    test("should display warning if value > 25", () => {
      const { container } = render(<CklProgressBar value={30} />);
      const barValue = container.querySelector(".ckl-progress-bar__value");
      expect(barValue.className).toContain("ckl-progress-bar__value--color-warning");
    });

    test("should display warning if value < 75", () => {
      const { container } = render(<CklProgressBar value={70} />);
      const barValue = container.querySelector(".ckl-progress-bar__value");
      expect(barValue.className).toContain("ckl-progress-bar__value--color-warning");
    });

    test("should display acceptable if value >= 75", () => {
      const { container } = render(<CklProgressBar value={75} />);
      const barValue = container.querySelector(".ckl-progress-bar__value");
      expect(barValue.className).toContain("ckl-progress-bar__value--color-acceptable");
    });

    test("should display acceptable if value < 100", () => {
      const { container } = render(<CklProgressBar value={99} />);
      const barValue = container.querySelector(".ckl-progress-bar__value");
      expect(barValue.className).toContain("ckl-progress-bar__value--color-acceptable");
    });

    test("should display success if value = 100", () => {
      const { container } = render(<CklProgressBar value={100} />);
      const barValue = container.querySelector(".ckl-progress-bar__value");
      expect(barValue.className).toContain("ckl-progress-bar__value--color-success");
    });

    test("should round progress value", () => {
      const { container } = render(<CklProgressBar value={45.8} />);
      const text = container.querySelector(".ckl-progress-bar__text");
      expect(text.textContent).toContain("46%");
    });
  });
});
