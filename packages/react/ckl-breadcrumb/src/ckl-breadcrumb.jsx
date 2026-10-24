import React, { useCallback, memo } from "react";

export const CklBreadcrumb = memo(function CklBreadcrumb({
  path = [],
  size = "",
  onNodeClick,
  className = "",
  onClick,
  ...props
}) {
  const goToNode = useCallback(
    (node, e) => {
      e?.stopPropagation?.();
      onNodeClick?.({ name: node.name, params: node.params || {} });
    },
    [onNodeClick],
  );

  const rootClass = className ? `ckl-breadcrumb ${className}` : "ckl-breadcrumb";

  return (
    <div className={rootClass} onClick={onClick} {...props}>
      {path.map((node, index) => {
        const isLast = index === path.length - 1;
        const nodeClassList = ["ckl-breadcrumb__node"];
        if (isLast) {
          nodeClassList.push("current-node");
        }
        if (size) {
          nodeClassList.push(size);
        }

        const displayText = typeof node.text === "function" ? node.text() : node.text;

        return (
          <div key={node.name || index} className={nodeClassList.join(" ")}>
            <span
              data-selector={`breadcrumb-item-${index}`}
              className="node-name"
              onClick={(e) => goToNode(node, e)}
            >
              {displayText}
            </span>
            <span className="next-sibling"> / </span>
          </div>
        );
      })}
    </div>
  );
});

export default CklBreadcrumb;
