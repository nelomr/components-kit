import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { onClickOutside, calculateTooltipPosition } from "@components-kit/core";

export const CklTooltip = memo(function CklTooltip({
  text = "",
  color = "primary",
  position = "bottom",
  visible = false,
  disabled = false,
  attachToBody = false,
  inBodyClass = "",
  trigger = "hover",
  noPadding = false,
  dataSelector = "tooltip",
  className = "",
  onClickOutside: onClickOutsideProp,
  renderTooltip,
  children,
  ...props
}) {
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const [internalVisible, setInternalVisible] = useState(false);
  const [tooltipPosStyle, setTooltipPosStyle] = useState({});

  const isVisible = trigger === "manual" ? visible : internalVisible;
  const isDisabled = disabled || (!text && !renderTooltip);

  const calculateTooltipPositionStyle = useCallback(() => {
    const hostElement = wrapperRef.current?.getBoundingClientRect();
    const tooltipElement = tooltipRef.current?.getBoundingClientRect();
    return calculateTooltipPosition({
      hostRect: hostElement,
      tooltipRect: tooltipElement,
      position,
      scrollY: typeof window !== "undefined" ? window.scrollY : 0,
    });
  }, [position]);

  useEffect(() => {
    if (isVisible && attachToBody) {
      const raf = requestAnimationFrame(() => {
        setTooltipPosStyle(calculateTooltipPositionStyle());
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isVisible, attachToBody, calculateTooltipPositionStyle]);

  useEffect(() => {
    if (trigger === "click" && isVisible) {
      const elemToListen = attachToBody ? tooltipRef.current : wrapperRef.current;
      const ignore = attachToBody ? [wrapperRef.current] : [];

      const clean = onClickOutside({
        target: elemToListen,
        ignore,
        handler: () => {
          setInternalVisible(false);
          onClickOutsideProp?.();
        },
      });

      return clean;
    }
  }, [trigger, isVisible, attachToBody, onClickOutsideProp]);

  const onMouseOver = () => {
    if (trigger === "hover" && !isVisible && !isDisabled) {
      setInternalVisible(true);
    }
  };

  const onMouseLeave = () => {
    if (trigger === "hover" && isVisible && !isDisabled) {
      setInternalVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === "click" && !isDisabled) {
      setInternalVisible((prev) => !prev);
    }
  };

  const containerClasses = useMemo(() => {
    const classes = [
      "ckl-tooltip__container",
      `ckl-tooltip__container--color-${color}`,
      `ckl-tooltip__container--position-${position}`,
    ];
    if (isVisible) classes.push("ckl-tooltip__container--visible");
    if (noPadding) classes.push("ckl-tooltip__container--no-padding");
    if (attachToBody) {
      classes.push("ckl-tooltip__container--is-in-body");
      if (inBodyClass) classes.push(inBodyClass);
    }
    return classes.join(" ");
  }, [color, position, isVisible, noPadding, attachToBody, inBodyClass]);

  const containerStyle = useMemo(() => {
    const base = { ...(attachToBody ? tooltipPosStyle : {}) };
    if (!isVisible) {
      base.display = "none";
    }
    return base;
  }, [attachToBody, tooltipPosStyle, isVisible]);

  const tooltipNode = (
    <div
      ref={tooltipRef}
      className={containerClasses}
      style={containerStyle}
      data-selector={`${dataSelector}-element`}
    >
      {renderTooltip ? renderTooltip() : text}
    </div>
  );

  const rootClass = className ? `ckl-tooltip ${className}` : "ckl-tooltip";

  return (
    <div
      ref={wrapperRef}
      className={rootClass}
      data-selector={`${dataSelector}-wrapper`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {children}
      {attachToBody && typeof document !== "undefined"
        ? createPortal(tooltipNode, document.body)
        : tooltipNode}
    </div>
  );
});

export default CklTooltip;
