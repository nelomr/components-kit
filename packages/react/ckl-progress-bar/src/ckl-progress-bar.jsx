import React, { useMemo, memo } from "react";
import { getProgressBarStatus, formatProgressValue } from "@components-kit/core";

export const CklProgressBar = memo(function CklProgressBar({
  value = 0,
  className = "",
  renderText,
  children,
  ...props
}) {
  const colorBarClass = useMemo(
    () => `ckl-progress-bar__value--color-${getProgressBarStatus(value)}`,
    [value],
  );

  const progressWidth = useMemo(() => ({ width: `${value}%` }), [value]);
  const progressValueAdjusted = useMemo(() => formatProgressValue(value), [value]);

  const rootClass = className ? `ckl-progress-bar ${className}` : "ckl-progress-bar";

  return (
    <div className={rootClass} {...props}>
      <div className="ckl-progress-bar__bar">
        <div className={`ckl-progress-bar__value ${colorBarClass}`} style={progressWidth} />
      </div>
      <div className="ckl-progress-bar__text">
        {renderText
          ? renderText(progressValueAdjusted)
          : children
            ? typeof children === "function"
              ? children(progressValueAdjusted)
              : children
            : `${progressValueAdjusted}%`}
      </div>
    </div>
  );
});

export default CklProgressBar;
