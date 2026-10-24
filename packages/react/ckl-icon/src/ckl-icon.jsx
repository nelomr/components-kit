import React, { useMemo, memo } from "react";
import { getIconSvg } from "@components-kit/assets/react";

export const CklIcon = memo(function CklIcon({
  icon,
  name,
  color = "primary",
  size = "default",
  cursor = "default",
  disabled = false,
  dataSelector = "",
  className = "",
  onClick,
  ...props
}) {
  const activeIcon = icon || name;
  const isDisabled = typeof disabled === "function" ? disabled() : !!disabled;

  const componentClasses = useMemo(() => {
    const classes = [
      "ckl-icon",
      `ckl-icon--color-${color}`,
      `ckl-icon--size-${size}`,
      `ckl-icon--cursor-${cursor}`,
    ];
    if (isDisabled) {
      classes.push("ckl-icon--disabled");
    }
    if (className) {
      classes.push(className);
    }
    return classes.join(" ");
  }, [color, size, cursor, isDisabled, className]);

  const handleClick = (e) => {
    if (isDisabled) {
      e?.preventDefault?.();
      return;
    }
    onClick?.(e);
  };

  const svgString = useMemo(() => {
    if (typeof activeIcon === "string") {
      const trimmed = activeIcon.trim();
      if (trimmed.startsWith("<svg") || trimmed.includes("<svg")) {
        return trimmed;
      }
      return getIconSvg(activeIcon) || getIconSvg(`ial-${activeIcon}`) || "";
    }
    return null;
  }, [activeIcon]);

  const renderIcon = () => {
    if (!activeIcon) return null;
    if (svgString) {
      return (
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: svgString }} />
      );
    }
    if (React.isValidElement(activeIcon)) return activeIcon;
    if (typeof activeIcon === "function") {
      const IconComponent = activeIcon;
      return <IconComponent />;
    }
    if (typeof activeIcon === "object" && typeof activeIcon.render === "function") {
      const Comp = activeIcon.render;
      return <Comp />;
    }
    return null;
  };

  return (
    <div className={componentClasses} data-selector={dataSelector} onClick={handleClick} {...props}>
      {renderIcon()}
    </div>
  );
});

export default CklIcon;
