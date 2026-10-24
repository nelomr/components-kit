import React, { useMemo, memo } from "react";

export const CklBadge = memo(function CklBadge({
  color = "primary",
  size = "large",
  shape = "oval",
  outlined = false,
  className = "",
  children,
  ...props
}) {
  const componentClasses = useMemo(() => {
    const classes = [
      "ckl-badge",
      `ckl-badge--size-${size}`,
      `ckl-badge--shape-${shape}`,
      `ckl-badge--color-${color}`,
    ];
    if (outlined) {
      classes.push(`ckl-badge--color-${color}-outlined`);
    }
    if (className) {
      classes.push(className);
    }
    return classes.join(" ");
  }, [size, shape, color, outlined, className]);

  return (
    <div className={componentClasses} {...props}>
      <span className="ckl-badge__content">{children}</span>
    </div>
  );
});

export default CklBadge;
