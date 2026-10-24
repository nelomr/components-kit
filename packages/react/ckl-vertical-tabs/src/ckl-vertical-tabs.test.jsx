import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CklVerticalTabs } from "./ckl-vertical-tabs.jsx";

describe("ckl-vertical-tabs.jsx (React)", () => {
  const tabs = [
    { name: "Tab 1", value: "tab-1" },
    { name: "Tab 2", value: "tab-2" },
  ];

  test("mount component", () => {
    expect(CklVerticalTabs).toBeTruthy();
    const { container } = render(<CklVerticalTabs tabs={tabs} />);
    expect(container.textContent).toContain("Tab 1");
  });

  test("should apply classes on selected tab", () => {
    const { container } = render(<CklVerticalTabs tabs={tabs} selectedTab="tab-1" />);
    const activeTab = container.querySelector('[data-selector="vertical-tab-tab-1"]');
    expect(activeTab.className).toContain("ckl-vertical-tabs__element--active");
  });

  test("should apply classes on disabled tab as boolean", () => {
    const disabledTabs = [{ name: "Tab Disabled", value: "tab-d", disabled: true }];
    const { container } = render(<CklVerticalTabs tabs={disabledTabs} />);
    const tab = container.querySelector('[data-selector="vertical-tab-tab-d"]');
    expect(tab.className).toContain("ckl-vertical-tabs__element--disabled");
  });

  test("should apply classes on disabled tab as function", () => {
    const disabledTabs = [{ name: "Tab Disabled", value: "tab-d", disabled: () => true }];
    const { container } = render(<CklVerticalTabs tabs={disabledTabs} />);
    const tab = container.querySelector('[data-selector="vertical-tab-tab-d"]');
    expect(tab.className).toContain("ckl-vertical-tabs__element--disabled");
  });

  test("should icon be visible on error tab", () => {
    const tabErrors = { "tab-1": true };
    const { container } = render(<CklVerticalTabs tabs={tabs} tabErrors={tabErrors} />);
    const icon = container.querySelector('[data-selector="vertical-tab-primary-icon-0"]');
    expect(icon).toBeTruthy();
  });

  describe("events", () => {
    test("should emit event on tab click", () => {
      const handleSelect = vi.fn();
      const { container } = render(<CklVerticalTabs tabs={tabs} onSelectTab={handleSelect} />);
      const tab2 = container.querySelector('[data-selector="vertical-tab-tab-2"]');
      fireEvent.click(tab2);
      expect(handleSelect).toHaveBeenCalledWith("tab-2");
    });

    test("should not emit event on disabled tab click", () => {
      const handleSelect = vi.fn();
      const disabledTabs = [{ name: "Tab Disabled", value: "tab-d", disabled: true }];
      const { container } = render(
        <CklVerticalTabs tabs={disabledTabs} onSelectTab={handleSelect} />,
      );
      const tab = container.querySelector('[data-selector="vertical-tab-tab-d"]');
      fireEvent.click(tab);
      expect(handleSelect).not.toHaveBeenCalled();
    });
  });
});
