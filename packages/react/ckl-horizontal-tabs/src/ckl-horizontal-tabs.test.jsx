import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CklHorizontalTabs } from "./ckl-horizontal-tabs.jsx";

describe("ckl-horizontal-tabs.jsx (React)", () => {
  const tabs = [
    {
      id: "tab-1",
      text: "Tab 1",
    },
    {
      id: "tab-2",
      text: "Tab 2",
      disabled: false,
    },
  ];

  test("mount component", () => {
    expect(CklHorizontalTabs).toBeTruthy();
    const { container } = render(<CklHorizontalTabs tabs={tabs} selected="tab-1" />);
    expect(container.textContent).toContain("Tab 1");
  });

  describe("state", () => {
    test("should render text as function", () => {
      const functionTabs = [
        {
          id: "tab-fn",
          text: () => "Function Tab",
        },
      ];
      const { container } = render(<CklHorizontalTabs tabs={functionTabs} />);
      expect(container.textContent).toContain("Function Tab");
    });

    test("should apply classes on selected tab", () => {
      const { container } = render(<CklHorizontalTabs tabs={tabs} selected="tab-1" />);
      const activeTab = container.querySelector('[data-selector="tab-tab-1-0"]');
      expect(activeTab.className).toContain("ckl-horizontal-tabs__title--active");
    });

    test("should apply classes on disabled tab as boolean", () => {
      const disabledTabs = [
        {
          id: "tab-disabled",
          text: "Disabled Tab",
          disabled: true,
        },
      ];
      const { container } = render(<CklHorizontalTabs tabs={disabledTabs} />);
      const tab = container.querySelector(".ckl-horizontal-tabs__title");
      expect(tab.className).toContain("ckl-horizontal-tabs__title--disabled");
    });

    test("should apply classes on disabled tab as function", () => {
      const disabledTabs = [
        {
          id: "tab-disabled-fn",
          text: "Disabled Tab",
          disabled: () => true,
        },
      ];
      const { container } = render(<CklHorizontalTabs tabs={disabledTabs} />);
      const tab = container.querySelector(".ckl-horizontal-tabs__title");
      expect(tab.className).toContain("ckl-horizontal-tabs__title--disabled");
    });
  });

  describe("events", () => {
    test("should emit event on tab click", () => {
      const handleSelect = vi.fn();
      const { container } = render(<CklHorizontalTabs tabs={tabs} onSelectTab={handleSelect} />);
      const tab2 = container.querySelector('[data-selector="tab-tab-2-1"]');
      fireEvent.click(tab2);
      expect(handleSelect).toHaveBeenCalledWith("tab-2");
    });

    test("should not emit event on disabled tab click", () => {
      const handleSelect = vi.fn();
      const disabledTabs = [
        {
          id: "tab-disabled",
          text: "Disabled",
          disabled: true,
        },
      ];
      const { container } = render(
        <CklHorizontalTabs tabs={disabledTabs} onSelectTab={handleSelect} />,
      );
      const tab = container.querySelector(".ckl-horizontal-tabs__title");
      fireEvent.click(tab);
      expect(handleSelect).not.toHaveBeenCalled();
    });
  });
});
