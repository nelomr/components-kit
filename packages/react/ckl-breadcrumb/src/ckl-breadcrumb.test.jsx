import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CklBreadcrumb } from "./ckl-breadcrumb.jsx";

describe("ckl-breadcrumb.jsx (React)", () => {
  const path = [
    {
      name: "home",
      text: "home",
      params: {
        id: "1",
      },
    },
    {
      name: "detail",
      text: "detail",
      params: {
        id: "2",
      },
    },
    {
      name: "contact",
      text: "contact",
      params: {
        id: "3",
      },
    },
  ];

  test("mount component", () => {
    expect(CklBreadcrumb).toBeTruthy();
    const { container } = render(<CklBreadcrumb path={path} />);
    expect(container.textContent).toContain("home / detail / contact");
  });

  describe("state", () => {
    test("should render text as function", () => {
      const functionPath = [
        {
          name: "home",
          text: () => "home",
          params: {
            id: "1",
          },
        },
      ];
      const { container } = render(<CklBreadcrumb path={functionPath} />);
      expect(container.textContent).toContain("home");
    });
  });

  describe("events", () => {
    test("should emit event on click", () => {
      const handleClick = vi.fn();
      const { container } = render(<CklBreadcrumb path={path} onClick={handleClick} />);
      const breadcrumbWrapper = container.querySelector(".ckl-breadcrumb");
      fireEvent.click(breadcrumbWrapper);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("should trigger onNodeClick with node params", () => {
      const handleNodeClick = vi.fn();
      const { container } = render(<CklBreadcrumb path={path} onNodeClick={handleNodeClick} />);
      const nodeSpan = container.querySelector('[data-selector="breadcrumb-item-0"]');
      fireEvent.click(nodeSpan);
      expect(handleNodeClick).toHaveBeenCalledWith({
        name: "home",
        params: { id: "1" },
      });
    });
  });
});
