export function groupSideNavItems(items = []) {
  return items.reduce((acc, item) => {
    const group = item.group || "no-group";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});
}

export function isSideNavItemActive(item, currentNavItemId) {
  if (!item) return false;
  if (item.id === currentNavItemId) return true;
  const subs = item.items || item.schema || [];
  return subs.some((sub) => isSideNavItemActive(sub, currentNavItemId));
}

export function isSideNavItemDisabled(item) {
  if (!item) return false;
  if (typeof item.disabled === "function") return item.disabled();
  return !!item.disabled;
}

export function getSideNavSubmenuItems(item) {
  return item?.items || item?.schema || [];
}

const CSS_COLOR_KEYWORDS = new Set(["transparent", "currentcolor", "inherit", "initial", "unset"]);

/**
 * Resolves a color prop into a CSS value.
 * Design tokens / named colors ("primary", "white", "new-brand-400") become
 * `var(--token, token)`; any other CSS color (hex, rgb(), hsl(), var()) is used as-is.
 */
export function resolveSideNavColor(color) {
  if (typeof color !== "string") return "";
  const value = color.trim();
  if (!value) return "";
  if (/^[a-z][a-z0-9-]*$/i.test(value) && !CSS_COLOR_KEYWORDS.has(value.toLowerCase())) {
    return `var(--${value}, ${value})`;
  }
  return value;
}

function normalizeColor(color) {
  let value = color.replace(/\s+/g, "").toLowerCase();
  const hex = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(value);
  if (hex) value = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  return value;
}

/**
 * Icons must never share the color of the background they sit on, otherwise they
 * become invisible. When they match, fall back to white (or brand blue over white).
 */
function ensureContrast(iconColor, backgroundColor) {
  if (!iconColor || !backgroundColor) return iconColor;
  if (normalizeColor(iconColor) !== normalizeColor(backgroundColor)) return iconColor;
  const white = resolveSideNavColor("white");
  return normalizeColor(backgroundColor) === normalizeColor(white)
    ? resolveSideNavColor("new-brand")
    : white;
}

/**
 * Builds the CSS custom properties used to configure a side-nav.
 * Shared by the React and Vue components so both behave identically.
 */
export function getSideNavStyleVars({
  backgroundColor = "",
  submenuBackgroundColor = "",
  iconColor = "",
  submenuIconColor = "",
  arrowColor = "",
} = {}) {
  const background = resolveSideNavColor(backgroundColor);
  const submenuBackground = resolveSideNavColor(submenuBackgroundColor);
  const vars = {};

  if (background) vars["--ckl-side-nav-background-color"] = background;
  if (submenuBackground) vars["--ckl-side-nav-submenu-background-color"] = submenuBackground;

  const icon = ensureContrast(resolveSideNavColor(iconColor), background);
  const submenuIcon = ensureContrast(
    resolveSideNavColor(submenuIconColor),
    submenuBackground || background,
  );
  const arrow = ensureContrast(resolveSideNavColor(arrowColor), background);

  if (icon) vars["--ckl-side-nav-icon-color"] = icon;
  if (submenuIcon) vars["--ckl-side-nav-submenu-icon-color"] = submenuIcon;
  if (arrow) vars["--ckl-side-nav-arrow-color"] = arrow;

  return vars;
}
