import React, { useMemo, memo } from "react";
import {
  calculateBarometerRotation,
  getBarometerRangeLabel,
  DEFAULT_BAROMETER_RANGES,
} from "@components-kit/core";
import { IalIcon } from "@components-kit/assets/react";
import barometerBothSvg from "@components-kit/assets/illustrations/barometer-charter-both.svg?raw";

const DEFAULT_RANGES = DEFAULT_BAROMETER_RANGES;

export const CklBarometerChart = memo(function CklBarometerChart({
  percentage = 0,
  size = "100%",
  ranges = DEFAULT_RANGES,
  className = "",
  ...props
}) {
  const currentRangeLabel = useMemo(
    () => getBarometerRangeLabel(percentage, ranges),
    [percentage, ranges],
  );

  const arrowRotation = useMemo(() => calculateBarometerRotation(percentage), [percentage]);

  const barometerStyle = useMemo(
    () => ({
      "--ckl-barometer-chart-arrow-rotation": `${arrowRotation}deg`,
    }),
    [arrowRotation],
  );

  const containerStyle = useMemo(() => ({ width: size }), [size]);

  const rootClass = className ? `ckl-barometer-chart ${className}` : "ckl-barometer-chart";

  return (
    <div className={rootClass} {...props}>
      <div className="ckl-barometer-chart__container" style={containerStyle}>
        <div className="ckl-barometer-chart__visual">
          <IalIcon
            icon={barometerBothSvg}
            className="ckl-barometer-chart__icon"
            style={barometerStyle}
          />
        </div>
        <div className="ckl-barometer-chart__labels">
          <div className="ckl-barometer-chart__range-label">{currentRangeLabel}</div>
        </div>
      </div>
    </div>
  );
});

export default CklBarometerChart;
