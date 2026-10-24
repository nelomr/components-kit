import React, { useMemo, memo } from "react";
import { calculateTruncateText } from "@components-kit/core";

export const CklTruncateText = memo(function CklTruncateText({
  text = "",
  separator = "",
  characterLimit = 0,
  className = "",
  ...props
}) {
  const { arrayValues, itemLeftCount, truncateText, isTruncated } = useMemo(
    () => calculateTruncateText({ text, separator, characterLimit }),
    [text, separator, characterLimit],
  );

  const rootClass = className ? `ckl-truncate-text ${className}` : "ckl-truncate-text";

  return (
    <span className={rootClass} {...props}>
      {truncateText}
      {isTruncated && !arrayValues && <span className="ckl-truncate-text__ellipsis">...</span>}
      {!!itemLeftCount && (
        <span className="ckl-truncate-text__more"> and {itemLeftCount} more</span>
      )}
    </span>
  );
});

export default CklTruncateText;
