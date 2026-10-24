export function calculateTooltipPosition({
  hostRect,
  tooltipRect,
  position = "bottom",
  scrollY = typeof window !== "undefined" ? window.scrollY : 0,
}) {
  if (!hostRect || !tooltipRect) return {};

  switch (position) {
    case "top":
      return {
        top: `calc(${hostRect.top - tooltipRect.height + scrollY}px - var(--total-offset, 8px))`,
        left: `${hostRect.left + hostRect.width / 2}px`,
        bottom: "unset",
      };
    case "bottom":
      return {
        top: `calc(${hostRect.bottom + scrollY}px + var(--total-offset, 8px))`,
        left: `${hostRect.left + hostRect.width / 2}px`,
      };
    case "left":
      return {
        top: `${hostRect.top + scrollY + hostRect.height / 2}px`,
        left: `calc(${hostRect.left - tooltipRect.width}px - var(--total-offset, 8px))`,
      };
    case "right":
      return {
        top: `${hostRect.top + scrollY + hostRect.height / 2}px`,
        left: `calc(${hostRect.right}px + var(--total-offset, 8px))`,
      };
    default:
      return {};
  }
}

export function formatTooltipPositionStyle(posStyle) {
  return Object.entries(posStyle)
    .map(([key, val]) => `${key}: ${val};b`.replace(/;b$/, ";"))
    .join(" ");
}
