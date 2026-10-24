import React, { useMemo, useCallback, memo } from "react";
import { IalIcon } from "@components-kit/assets/react";
import { isTabDisabled, getTabText } from "@components-kit/core";

export const CklVerticalTabs = memo(function CklVerticalTabs({
  tabs = [],
  selectedTab = "",
  tabErrors = null,
  primaryIcon = null,
  primaryIconColor = "error",
  secondaryIcons = null,
  onSelectTab,
  className = "",
  ...props
}) {
  const disabledItem = useCallback((item) => isTabDisabled(item), []);

  const goToVirtualStep = useCallback(
    (tab) => {
      if (!disabledItem(tab)) {
        onSelectTab?.(tab.value);
      }
    },
    [disabledItem, onSelectTab],
  );

  const stepPrimaryIcon = useMemo(() => {
    if (primaryIcon) {
      return primaryIcon;
    }
    return "ial-alert";
  }, [primaryIcon]);

  const rootClass = className ? `ckl-vertical-tabs ${className}` : "ckl-vertical-tabs";

  return (
    <ul className={rootClass} {...props}>
      {tabs.map((tab, indexTab) => {
        const isActive = selectedTab === tab.value;
        const isDisabled = disabledItem(tab);

        const tabClasses = ["ckl-vertical-tabs__element"];
        if (isActive) tabClasses.push("ckl-vertical-tabs__element--active");
        if (isDisabled) tabClasses.push("ckl-vertical-tabs__element--disabled");
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
            goToVirtualStep(tab);
          }
        };

        const hasError = tabErrors && tabErrors[tab.value];
        const secondary = secondaryIcons && secondaryIcons[tab.value];

        return (
          <li
            key={`vertical-tab-${tab.value}`}
            data-selector={`vertical-tab-${tab.value}`}
            className={tabClasses.join(" ")}
            tabIndex={isDisabled ? undefined : 0}
            onClick={() => goToVirtualStep(tab)}
            onKeyDown={onKeyDown}
          >
            {hasError && (
              <IalIcon
                icon={stepPrimaryIcon}
                size="small"
                color={primaryIconColor || stepPrimaryIcon.color || "error"}
                dataSelector={`vertical-tab-primary-icon-${indexTab}`}
                className="ckl-vertical-tabs__primary-icon"
              />
            )}
            <div className="ckl-vertical-tabs__name">{tab.name || getTabText(tab)}</div>
            {secondary && (
              <IalIcon
                icon={secondary.icon}
                color={secondary.color || null}
                dataSelector={`vertical-tab-secondary-icon-${indexTab}`}
                className="ckl-vertical-tabs__secondary-icon"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
});

export default CklVerticalTabs;
