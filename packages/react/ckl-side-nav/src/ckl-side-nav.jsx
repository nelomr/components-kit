import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { IalIcon } from "@components-kit/assets/react";
import { groupSideNavItems, getSideNavStyleVars } from "@components-kit/core";
import CklSideNavItem from "./components/ckl-side-nav-item.jsx";

export const CklSideNav = memo(function CklSideNav({
  items = [],
  bottomItems = [],
  selectedNavItem = "",
  initialExtendedMenu = false,
  onHandleClick,
  className = "",
  renderExpandButton,
  backgroundColor = "",
  submenuBackgroundColor = "",
  iconColor = "",
  submenuIconColor = "",
  arrowColor = "",
  style,
  ...props
}) {
  const [isExtended, setIsExtended] = useState(initialExtendedMenu);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setIsExtended(initialExtendedMenu);
  }, [initialExtendedMenu]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsExtended(false);
  }, [selectedNavItem]);

  const itemsGrouped = useMemo(() => groupSideNavItems(items), [items]);

  const hasBottomItems = bottomItems.length > 0;

  const toggleMenu = useCallback(() => {
    setIsExtended((prev) => !prev);
  }, []);

  const handleClick = useCallback(
    (item) => {
      onHandleClick?.(item);
    },
    [onHandleClick],
  );

  const getSelector = (group, index, prefix = "") => {
    return `${prefix}-menu-item-${group}-${index}`;
  };

  const rootClass = ["ckl-side-nav", isExtended ? "ckl-side-nav--active" : "", className]
    .filter(Boolean)
    .join(" ");

  const rootStyle = useMemo(
    () => ({
      ...getSideNavStyleVars({
        backgroundColor,
        submenuBackgroundColor,
        iconColor,
        submenuIconColor,
        arrowColor,
      }),
      ...style,
    }),
    [backgroundColor, submenuBackgroundColor, iconColor, submenuIconColor, arrowColor, style],
  );

  return (
    <nav className={rootClass} style={rootStyle} {...props}>
      <div className="ckl-side-nav__items-block">
        <div
          className={`ckl-side-nav__toggle-button ${isExtended ? "ckl-side-nav__toggle-button--extended" : ""}`}
          data-selector="ckl-side-nav-toggle-button"
          onClick={toggleMenu}
        >
          {renderExpandButton ? (
            renderExpandButton(isExtended)
          ) : (
            <IalIcon
              className="ckl-side-nav__toggle-button-icon"
              size="medium"
              cursor="pointer"
              icon="ial-arrow-pointer-down"
              color=""
            />
          )}
        </div>

        <div className="ckl-side-nav__items-container">
          <div className="ckl-side-nav__top-items">
            {Object.entries(itemsGrouped).map(([groupName, group]) => (
              <div key={groupName} className="ckl-side-nav__main-items">
                {group.map((item, itemIndex) => (
                  <CklSideNavItem
                    key={item.id}
                    item={item}
                    dataSelector={getSelector(groupName, itemIndex, "ckl-nav-item")}
                    extended={isExtended}
                    currentNavItem={selectedNavItem}
                    onHandleClick={handleClick}
                  />
                ))}
              </div>
            ))}
          </div>

          {hasBottomItems && (
            <div className="ckl-side-nav__bottom-items">
              {bottomItems.map((item, itemIndex) => (
                <CklSideNavItem
                  key={item.id}
                  item={item}
                  dataSelector={getSelector(
                    item.group || "no-group",
                    itemIndex,
                    "ckl-nav-item-bottom",
                  )}
                  extended={isExtended}
                  currentNavItem={selectedNavItem}
                  onHandleClick={handleClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
});

export default CklSideNav;
