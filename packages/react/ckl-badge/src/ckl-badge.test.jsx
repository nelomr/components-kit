import React from "react";
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { CklBadge } from "./ckl-badge.jsx";

describe("ckl-badge.jsx (React)", () => {
  const colors = {
    primary: "primary",
    secondary: "secondary",
    error: "error",
    success: "success",
    warning: "warning",
    info: "info",
    purple: "purple",
    midBlue: "mid-blue",
    transparent: "transparent",
  };

  const sizes = {
    large: "large",
    medium: "medium",
    small: "small",
    xSmall: "x-small",
  };

  const shapes = {
    square: "square",
    oval: "oval",
    circle: "circle",
  };

  test("mount component default values", () => {
    const { container } = render(<CklBadge>Active</CklBadge>);
    const badge = container.querySelector(".ckl-badge");
    expect(badge).toBeTruthy();
    expect(badge.className).toContain("ckl-badge--color-primary");
    expect(badge.className).toContain("ckl-badge--size-large");
    expect(badge.className).toContain("ckl-badge--shape-oval");
    expect(badge.textContent).toBe("Active");
  });

  test("mount component with primary color, large size, square shape and outlined", () => {
    const { container } = render(
      <CklBadge color={colors.primary} size={sizes.large} shape={shapes.square} outlined>
        Square Outlined
      </CklBadge>,
    );
    const badge = container.querySelector(".ckl-badge");
    expect(badge.className).toContain("ckl-badge--color-primary");
    expect(badge.className).toContain("ckl-badge--size-large");
    expect(badge.className).toContain("ckl-badge--shape-square");
    expect(badge.className).toContain("ckl-badge--color-primary-outlined");
  });

  test("mount component with secondary color, medium size, oval shape and not outlined", () => {
    const { container } = render(
      <CklBadge color={colors.secondary} size={sizes.medium} shape={shapes.oval} outlined={false}>
        Secondary
      </CklBadge>,
    );
    const badge = container.querySelector(".ckl-badge");
    expect(badge.className).toContain("ckl-badge--color-secondary");
    expect(badge.className).toContain("ckl-badge--size-medium");
    expect(badge.className).toContain("ckl-badge--shape-oval");
    expect(badge.className).not.toContain("outlined");
  });
});
