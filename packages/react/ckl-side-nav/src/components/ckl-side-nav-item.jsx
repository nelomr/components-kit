import React, { useState, useMemo, memo } from "react";
import { IalIcon } from "@components-kit/assets/react";
import {
  isSideNavItemActive,
  isSideNavItemDisabled,
  getSideNavSubmenuItems,
  resolveSideNavColor,
} from "@components-kit/core";

export const CklSideNavItem = memo(function CklSideNavItem({
  item,
  extended = false,
  currentNavItem = "",
  dataSelector = "",
  isSubItem = false,
  onHandleClick,
}) {
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);

  const submenuItems = useMemo(() => getSideNavSubmenuItems(item), [item]);
  const submenuIsVisible = submenuItems.length > 0 && extended;

  const isDisabled = isSideNavItemDisabled(item);
  const isActive = isSideNavItemActive(item, currentNavItem);

  const clickEvent = (it, e) => {
    e?.stopPropagation?.();
    if (!isSideNavItemDisabled(it)) {
      onHandleClick?.(it);
      setSubmenuIsOpen(false);
    }
  };

  const toggleSubmenu = (e) => {
    e?.stopPropagation?.();
    setSubmenuIsOpen((prev) => !prev);
  };

  const itemClasses = ["ckl-side-nav-item"];
  if (isDisabled) itemClasses.push("ckl-side-nav-item--disabled");
  if (isActive) itemClasses.push("ckl-side-nav-item--active");
  if (extended) itemClasses.push("ckl-side-nav-item--extended");
  if (isSubItem) itemClasses.push("ckl-side-nav-item__sub-item");

  const iconName = item.icon?.icon || item.icon;
  // Optional per-item override; otherwise the nav-level CSS variables apply.
  const itemIconColor = resolveSideNavColor(
    item.iconColor || item.icon?.iconColor || item.icon?.color || item.color,
  );
  const itemStyle = itemIconColor
    ? { "--icon-color": itemIconColor, "--submenu-icon-color": itemIconColor }
    : undefined;

  return (
    <>
      <div className={itemClasses.join(" ")} data-selector={dataSelector} style={itemStyle}>
        <div className="ckl-side-nav-item__link" onClick={(e) => clickEvent(item, e)}>
          {iconName && (
            <IalIcon
              className="ckl-side-nav-item__icon"
              size="default"
              cursor="pointer"
              icon={iconName}
              color=""
            />
          )}
          {(item.text || item.label) && (
            <div className="ckl-side-nav-item__text">{item.text || item.label}</div>
          )}
        </div>
        {submenuIsVisible && (
          <IalIcon
            className={`ckl-side-nav-item__submenu-icon ${submenuIsOpen ? "ckl-side-nav-item__submenu-icon--open" : ""}`}
            cursor="pointer"
            size="small"
            icon="ial-arrow-pointer-down"
            color=""
            onClick={toggleSubmenu}
          />
        )}
      </div>

      {submenuIsOpen && (
        <div className="ckl-side-nav-item__submenu ckl-side-nav-item__submenu--open">
          {submenuItems.map((subItem) => (
            <CklSideNavItem
              key={subItem.id}
              item={subItem}
              dataSelector={`ckl-nav-item-subitem-${subItem.id}`}
              extended={extended}
              currentNavItem={currentNavItem}
              isSubItem
              onHandleClick={onHandleClick}
            />
          ))}
        </div>
      )}
    </>
  );
});

export default CklSideNavItem;
