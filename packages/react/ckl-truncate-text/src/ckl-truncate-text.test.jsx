import React from "react";
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { CklTruncateText } from "./ckl-truncate-text.jsx";

describe("ckl-truncate-text.jsx (React)", () => {
  test("mount component", () => {
    expect(CklTruncateText).toBeTruthy();
    const { container } = render(<CklTruncateText />);
    const truncateText = container.querySelectorAll(".ckl-truncate-text");
    expect(truncateText.length).toBe(1);
  });

  test("should render full text when length is within limit", () => {
    const text = "Short text";
    const { container } = render(<CklTruncateText text={text} characterLimit={20} />);
    expect(container.textContent).toBe(text);
    expect(container.querySelector(".ckl-truncate-text__ellipsis")).toBeNull();
  });

  test("should truncate text when length exceeds limit", () => {
    const text = "This is a very long text that should be truncated";
    const characterLimit = 10;
    const { container } = render(<CklTruncateText text={text} characterLimit={characterLimit} />);
    const expectedText = text.slice(0, characterLimit);
    expect(container.textContent).toContain(expectedText);
    expect(container.querySelector(".ckl-truncate-text__ellipsis")).toBeTruthy();
    expect(container.querySelector(".ckl-truncate-text__more")).toBeNull();
  });

  test('should handle array of strings and truncate with "and X more"', () => {
    const text = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
    const separator = ", ";
    const characterLimit = 15;
    const { container } = render(
      <CklTruncateText text={text} separator={separator} characterLimit={characterLimit} />,
    );
    expect(container.textContent).toContain("Apple, Banana");
    expect(container.textContent).not.toContain("Cherry");
    expect(container.querySelector(".ckl-truncate-text__more")).toBeTruthy();
    expect(container.querySelector(".ckl-truncate-text__more").textContent).toContain("and 3 more");
    expect(container.querySelector(".ckl-truncate-text__ellipsis")).toBeNull();
  });
});
