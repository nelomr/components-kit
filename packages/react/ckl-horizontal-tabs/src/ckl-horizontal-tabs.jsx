import React, { useCallback, memo } from "react";
import { CklTooltip } from "@components-kit/react-ckl-tooltip";
import { IalIcon } from "@components-kit/assets/react";
import {
  isTabDisabled,
  getTabText,
  getTabSelector,
  getTabIconSelector,
} from "@components-kit/core";

export const CklHorizontalTabs = memo(function CklHorizontalTabs({
  tabs = [],
  selected = "",
  onSelectTab,
  className = "",
  ...props
}) {
  const changeTab = useCallback(
    (tab) => {
      if (!isTabDisabled(tab)) {
        onSelectTab?.(tab.id);
      }
    },
    [onSelectTab],
  );

  const rootClass = className ? `ckl-horizontal-tabs ${className}` : "ckl-horizontal-tabs";

  return (
    <div className={rootClass} {...props}>
      <ul className="ckl-horizontal-tabs__list">
        {tabs.map((tab, index) => {
          const isActive = selected === tab.id;
          const disabled = isTabDisabled(tab);

          const tabClasses = ["ckl-horizontal-tabs__title"];
          if (isActive) tabClasses.push("ckl-horizontal-tabs__title--active");
          if (disabled) tabClasses.push("ckl-horizontal-tabs__title--disabled");
          if (tab.class) {
            if (Array.isArray(tab.class)) {
              tabClasses.push(...tab.class);
            } else {
              tabClasses.push(tab.class);
            }
          }

          const onKeyDown = (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              changeTab(tab);
            }
          };

          return (
            <li
              key={`tab-${tab.id || index}`}
              className={tabClasses.join(" ")}
              tabIndex={disabled ? undefined : 0}
              data-selector={getTabSelector(tab, index)}
              onClick={() => changeTab(tab)}
              onKeyDown={onKeyDown}
            >
              <span className="ckl-horizontal-tabs__title-label">{getTabText(tab)}</span>
              {tab.icon && (
                <CklTooltip
                  text={tab.icon.tooltipText || tab.icon.text}
                  position={tab.icon.tooltipPosition}
                  className="ckl-horizontal-tabs__icon"
                >
                  <IalIcon
                    className={tab.icon.class}
                    size="small"
                    cursor="pointer"
                    icon={tab.icon.icon}
                    color={tab.icon.color}
                    disabled={disabled}
                    dataSelector={getTabIconSelector(tab.icon, index)}
                  />
                </CklTooltip>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default CklHorizontalTabs;
