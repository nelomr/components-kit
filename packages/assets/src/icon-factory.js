// Global Icon Factory and Registry (Unified for Vue & React)

// Dynamic component loader for Vue (via vite-svg-loader)
const icons = import.meta.glob("./icons/*.svg");

// Eager raw SVG string loader for React / DOM
const rawSvgIcons = import.meta.glob("./icons/*.svg", {
  query: "?raw",
  eager: true,
  import: "default",
});

const baseIconMap = Object.keys(icons).reduce((map, path) => {
  const name = path.replace(/^.*?([^/]+)\.svg$/g, "$1");
  map[name] = icons[path];
  return map;
}, {});

const baseRawSvgMap = Object.keys(rawSvgIcons).reduce((map, path) => {
  const name = path.replace(/^.*?([^/]+)\.svg$/g, "$1");
  map[name] = rawSvgIcons[path];
  return map;
}, {});

let customIconMap = {};

const _registerCustomIcon = (target, name, icon) => {
  if (!icon) return target;
  if (icon.default) {
    icon = icon.default;
  }
  target[name] = icon;
  return target;
};

const registerIcons = (icons) => {
  customIconMap = Object.keys(icons).reduce((map, name) => {
    return _registerCustomIcon(map, name, icons[name]);
  }, customIconMap);
};

const registerIcon = (name, icon) => {
  _registerCustomIcon(customIconMap, name, icon);
};

// Aliases for React naming compatibility
const registerCustomIcon = registerIcon;
const registerCustomIcons = registerIcons;

/**
 * Returns Vue async component loader or registered component
 */
const getIcon = (iconName) => {
  if (customIconMap[iconName]) {
    return customIconMap[iconName];
  }

  if (!baseIconMap[iconName]) {
    throw `Cannot find icon "${iconName}"`;
  }

  return baseIconMap[iconName];
};

/**
 * Returns raw SVG string for React / SVG renderer
 */
const getIconSvg = (iconName) => {
  if (customIconMap[iconName]) {
    return typeof customIconMap[iconName] === "string" ? customIconMap[iconName] : "";
  }
  return baseRawSvgMap[iconName] || "";
};

/**
 * Returns array of all available icon names
 */
const getIconList = () => {
  return Array.from(new Set([...Object.keys(baseIconMap), ...Object.keys(customIconMap)]));
};

export {
  registerIcon,
  registerIcons,
  registerCustomIcon,
  registerCustomIcons,
  getIcon,
  getIconSvg,
  getIconList,
};

export default getIcon;
