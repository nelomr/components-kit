import React, { useMemo, memo } from "react";
import { getIconSvg } from "../icon-factory.js";

export const IalIcon = memo(function IalIcon({
  icon,
  color = "primary",
  size = "default",
  cursor = "default",
  disabled = false,
  dataSelector = "",
  className = "",
  onClick,
  ...rest
}) {
  const isDisabled = typeof disabled === "function" ? disabled() : !!disabled;

  const classes = useMemo(() => {
    const list = ["ial-icon"];
    if (isDisabled) list.push("ial-icon--disabled");
    if (color) list.push(`ial-icon--color-${color}`);
    if (size) list.push(`ial-icon--size-${size}`);
    if (cursor) list.push(`ial-icon--cursor-${cursor}`);
    if (className) list.push(className);
    return list.join(" ");
  }, [isDisabled, color, size, cursor, className]);

  const svgContent = useMemo(() => {
    if (typeof icon === "string") {
      const trimmed = icon.trim();
      if (trimmed.startsWith("<svg") || trimmed.includes("<svg")) {
        return trimmed;
      }
      return getIconSvg(icon);
    }
    return null;
  }, [icon]);

  const handleClick = (e) => {
    if (isDisabled) {
      e?.preventDefault?.();
      return;
    }
    onClick?.(e);
  };

  if (React.isValidElement(icon)) {
    return (
      <div className={classes} data-selector={dataSelector} onClick={handleClick} {...rest}>
        {icon}
      </div>
    );
  }

  if (typeof icon === "function") {
    const IconComp = icon;
    return (
      <div className={classes} data-selector={dataSelector} onClick={handleClick} {...rest}>
        <IconComp />
      </div>
    );
  }

  return (
    <div
      className={classes}
      data-selector={dataSelector}
      onClick={handleClick}
      dangerouslySetInnerHTML={svgContent ? { __html: svgContent } : undefined}
      {...rest}
    />
  );
});

export default IalIcon;
