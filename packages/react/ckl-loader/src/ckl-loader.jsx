import React, { memo } from "react";

export const CklLoader = memo(function CklLoader({ className = "", ...props }) {
  const rootClass = className ? `ckl-loader ${className}` : "ckl-loader";

  return (
    <div className={rootClass} {...props}>
      <div className="ckl-loader__loading">
        <div className="ckl-loader__bar" />
        <div className="ckl-loader__bar" />
        <div className="ckl-loader__bar" />
        <div className="ckl-loader__bar" />
      </div>
    </div>
  );
});

export default CklLoader;
