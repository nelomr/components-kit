import { describe, it, expect } from "vitest";
import {
  clampPercentage,
  calculateBarometerRotation,
  getBarometerRangeLabel,
  DEFAULT_BAROMETER_RANGES,
} from "./barometer.js";
import { getProgressBarStatus, formatProgressValue } from "./progress-bar.js";
import { calculateTruncateText } from "./truncate-text.js";
import {
  parseDimension,
  calculateVisibleSlides,
  calculateMaxIndex,
  calculateTrackOffset,
} from "./carousel-math.js";
import { calculateTooltipPosition, formatTooltipPositionStyle } from "./tooltip-position.js";
import { isTabDisabled, getTabText, getTabSelector, getTabIconSelector } from "./tabs.js";
import {
  groupSideNavItems,
  isSideNavItemActive,
  isSideNavItemDisabled,
  getSideNavSubmenuItems,
} from "./side-nav.js";

describe("core/barometer", () => {
  it("clamps percentage between 0 and 100", () => {
    expect(clampPercentage(-10)).toBe(0);
    expect(clampPercentage(50)).toBe(50);
    expect(clampPercentage(150)).toBe(100);
  });

  it("calculates barometer rotation correctly", () => {
    expect(calculateBarometerRotation(0)).toBe(-90);
    expect(calculateBarometerRotation(100)).toBeCloseTo(89.9, 1);
  });

  it("gets correct barometer range label", () => {
    expect(getBarometerRangeLabel(10)).toBe("Very Low");
    expect(getBarometerRangeLabel(30)).toBe("Low");
    expect(getBarometerRangeLabel(80)).toBe("High");
    expect(getBarometerRangeLabel(98)).toBe("Very High");
  });

  it("exports default ranges", () => {
    expect(Array.isArray(DEFAULT_BAROMETER_RANGES)).toBe(true);
    expect(DEFAULT_BAROMETER_RANGES.length).toBeGreaterThan(0);
  });
});

describe("core/progress-bar", () => {
  it("determines correct status color", () => {
    expect(getProgressBarStatus(10)).toBe("error");
    expect(getProgressBarStatus(25)).toBe("error");
    expect(getProgressBarStatus(50)).toBe("warning");
    expect(getProgressBarStatus(80)).toBe("acceptable");
    expect(getProgressBarStatus(100)).toBe("success");
  });

  it("formats progress value", () => {
    expect(formatProgressValue(45.67)).toBe("46");
    expect(formatProgressValue(0)).toBe("0");
  });
});

describe("core/truncate-text", () => {
  it("truncates string with character limit", () => {
    const res = calculateTruncateText({ text: "Hello World", characterLimit: 5 });
    expect(res.truncateText).toBe("Hello");
    expect(res.isTruncated).toBe(true);
    expect(res.arrayValues).toBeNull();
  });

  it("truncates array of strings with separator", () => {
    const res = calculateTruncateText({
      text: ["Alpha", "Beta", "Gamma"],
      separator: ", ",
      characterLimit: 12,
    });
    expect(res.truncateText).toBe("Alpha, Beta");
    expect(res.itemLeftCount).toBe(1);
    expect(res.isTruncated).toBe(true);
  });
});

describe("core/carousel-math", () => {
  it("parses dimensions reliably", () => {
    expect(parseDimension(200)).toBe(200);
    expect(parseDimension("350px")).toBe(350);
    expect(parseDimension("invalid", 100)).toBe(100);
  });

  it("calculates visible slides and max index", () => {
    expect(calculateVisibleSlides(1000, 200, 16)).toBe(4);
    expect(calculateMaxIndex(10, 4)).toBe(6);
    expect(calculateTrackOffset(2, 200, 16)).toBe(432);
  });
});

describe("core/tooltip-position", () => {
  it("calculates position coordinates", () => {
    const hostRect = { top: 100, bottom: 140, left: 200, right: 300, width: 100, height: 40 };
    const tooltipRect = { width: 80, height: 30 };
    const pos = calculateTooltipPosition({ hostRect, tooltipRect, position: "bottom", scrollY: 0 });
    expect(pos.top).toContain("140px");
    expect(pos.left).toBe("250px");

    const styleStr = formatTooltipPositionStyle(pos);
    expect(styleStr).toContain("top:");
    expect(styleStr).toContain("left: 250px;");
  });
});

describe("core/tabs", () => {
  it("handles tab disabled and text getters", () => {
    expect(isTabDisabled({ disabled: true })).toBe(true);
    expect(isTabDisabled({ disabled: () => true })).toBe(true);
    expect(isTabDisabled({ disabled: false })).toBe(false);

    expect(getTabText({ text: "Overview" })).toBe("Overview");
    expect(getTabText({ text: () => "Dynamic" })).toBe("Dynamic");

    expect(getTabSelector({ id: "tab-1" }, 0)).toBe("tab-tab-1-0");
    expect(getTabIconSelector({ selector: "alert" }, 0)).toBe("tab-icon-alert-0");
  });
});

describe("core/side-nav", () => {
  it("groups items correctly", () => {
    const items = [{ id: "1", group: "main" }, { id: "2", group: "main" }, { id: "3" }];
    const grouped = groupSideNavItems(items);
    expect(grouped.main.length).toBe(2);
    expect(grouped["no-group"].length).toBe(1);
  });

  it("identifies active items recursively", () => {
    const item = {
      id: "parent",
      items: [{ id: "child-1" }, { id: "child-2" }],
    };
    expect(isSideNavItemActive(item, "child-2")).toBe(true);
    expect(isSideNavItemActive(item, "other")).toBe(false);
  });

  it("checks disabled state and retrieves submenu items", () => {
    expect(isSideNavItemDisabled({ disabled: true })).toBe(true);
    expect(isSideNavItemDisabled({ disabled: () => false })).toBe(false);
    expect(getSideNavSubmenuItems({ items: [1, 2] })).toEqual([1, 2]);
    expect(getSideNavSubmenuItems({ schema: [3] })).toEqual([3]);
    expect(getSideNavSubmenuItems(null)).toEqual([]);
  });
});
