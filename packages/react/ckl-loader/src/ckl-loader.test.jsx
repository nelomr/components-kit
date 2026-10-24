import React from "react";
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { CklLoader } from "./ckl-loader.jsx";

describe("ckl-loader.jsx (React)", () => {
  test("mount component", () => {
    expect(CklLoader).toBeTruthy();
    const { container } = render(<CklLoader />);
    const loadingBars = container.querySelectorAll(".ckl-loader__bar");
    expect(loadingBars.length).toBe(4);
  });
});
