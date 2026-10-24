export function isTabDisabled(tab) {
  if (!tab) return false;
  if (typeof tab.disabled === "function") return tab.disabled();
  return !!tab.disabled;
}

export function getTabText(tab) {
  if (!tab) return "";
  if (typeof tab.text === "function") return tab.text();
  return tab.text ?? "";
}

export function getTabSelector(tab, index, prefix = "tab") {
  if (!tab) return `${prefix}--${index}`;
  if (typeof tab.selector === "function") return tab.selector();
  if (tab.selector) return tab.selector;
  return `${prefix}-${tab.id ?? ""}-${index}`;
}

export function getTabIconSelector(icon, index) {
  if (!icon) return `tab-icon-selector-${index}`;
  let sel = icon.selector;
  if (typeof sel === "function") sel = sel();
  return `tab-icon-${sel || "selector"}-${index}`;
}
