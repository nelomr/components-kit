import React, { useMemo, useCallback, memo } from "react";
import { IalIcon } from "@components-kit/assets/react";
import { buildPaginationRange } from "@components-kit/core";

export const CklPagination = memo(function CklPagination({
  numPages = 1,
  current = 0,
  itemToShow = 7,
  onPageUpdated,
  className = "",
  ...props
}) {
  const range = useMemo(() => {
    return buildPaginationRange({ numPages, current, itemToShow });
  }, [numPages, current, itemToShow]);

  const goToPage = useCallback(
    (page) => {
      if (page !== current && page !== "...") {
        onPageUpdated?.(page);
      }
    },
    [current, onPageUpdated],
  );

  const goToNextPage = useCallback(() => {
    if (current < numPages) {
      onPageUpdated?.(current + 1);
    }
  }, [current, numPages, onPageUpdated]);

  const goToPrevPage = useCallback(() => {
    if (current > 1) {
      onPageUpdated?.(current - 1);
    }
  }, [current, onPageUpdated]);

  if (numPages <= 0) return null;

  const rootClass = className ? `ckl-pagination ${className}` : "ckl-pagination";

  return (
    <div className={rootClass} {...props}>
      <IalIcon
        className={`ckl-pagination__btn ckl-pagination__btn-prev ${current <= 1 ? "ckl-pagination__btn--disabled" : ""}`}
        icon="ial-arrow"
        disabled={current <= 1}
        onClick={goToPrevPage}
      />
      <ul className="ckl-pagination__list">
        {range.map((page, index) => {
          const isActive = page === current;
          const isDots = page === "...";
          const itemClasses = ["ckl-pagination__list-item"];
          if (isActive) itemClasses.push("ckl-pagination__list-item--active");
          if (isDots) itemClasses.push("ckl-pagination__list-item-dots");

          return (
            <li
              key={`item-list-${index}`}
              data-selector={`table-page-${index}`}
              className={itemClasses.join(" ")}
              onClick={() => goToPage(page)}
            >
              {page}
            </li>
          );
        })}
      </ul>
      <IalIcon
        className={`ckl-pagination__btn ckl-pagination__btn-next ${current === numPages ? "ckl-pagination__btn--disabled" : ""}`}
        icon="ial-arrow"
        disabled={current === numPages}
        onClick={goToNextPage}
      />
    </div>
  );
});

export default CklPagination;
