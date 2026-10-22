const icons = import.meta.glob('./icons/*.svg');

let baseIconMap = Object.keys(icons).reduce((map, path) => {
  return Object.assign(map, {[path.replace(/^.*?([^/]+)\.svg$/g, '$1')]: icons[path]});
}, {});

let customIconMap = {};

const _registerCustomIcon = (target, name, icon) => {
  if (!icon || (!(icon.default && icon.default.render) && !icon.render && typeof icon !== 'function')) {
    console.error(
      `Icon ${name} will be ignored due to one of those reasons: It is not a module with a default export or it is not a component`
    );
    return target;
  }

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
  //console.log('build customIconMap', customIconMap);
};

const registerIcon = (name, icon) => {
  _registerCustomIcon(customIconMap, name, icon);
};

const getIcon = (iconName) => {
  if (customIconMap[iconName]) {
    return customIconMap[iconName];
  }

  if (!baseIconMap[iconName]) {
    throw `Cannot find icon "${iconName}"`;
  }

  return baseIconMap[iconName];
};

const getIconList = () => {
  return Object.keys(baseIconMap).concat(Object.keys(customIconMap));
};

export {registerIcon, registerIcons, getIconList};

export default getIcon;
