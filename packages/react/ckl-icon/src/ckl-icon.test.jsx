import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CklIcon } from "./ckl-icon.jsx";

describe("ckl-icon.jsx (React)", () => {
  const dummyIcon = () => <span data-testid="dummy-icon">icon</span>;

  test("mount component", () => {
    expect(CklIcon).toBeTruthy();
  });

  describe("state", () => {
    test("should apply default classes with props", () => {
      const { container } = render(<CklIcon icon={dummyIcon} />);
      const iconWrapper = container.querySelector(".ckl-icon");
      expect(iconWrapper.className).toContain("ckl-icon--color-primary");
      expect(iconWrapper.className).toContain("ckl-icon--size-default");
      expect(iconWrapper.className).toContain("ckl-icon--cursor-default");
    });

    test("should apply disabled class", () => {
      const { container } = render(<CklIcon icon={dummyIcon} disabled />);
      const iconWrapper = container.querySelector(".ckl-icon");
      expect(iconWrapper.className).toContain("ckl-icon--disabled");
    });

    test("should apply disabled class as function", () => {
      const { container } = render(<CklIcon icon={dummyIcon} disabled={() => true} />);
      const iconWrapper = container.querySelector(".ckl-icon");
      expect(iconWrapper.className).toContain("ckl-icon--disabled");
    });
  });

  describe("events", () => {
    test("should emit event on click", () => {
      const handleClick = vi.fn();
      const { container } = render(<CklIcon icon={dummyIcon} onClick={handleClick} />);
      const iconWrapper = container.querySelector(".ckl-icon");
      fireEvent.click(iconWrapper);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("should not emit event on disabled click", () => {
      const handleClick = vi.fn();
      const { container } = render(<CklIcon icon={dummyIcon} disabled onClick={handleClick} />);
      const iconWrapper = container.querySelector(".ckl-icon");
      fireEvent.click(iconWrapper);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
