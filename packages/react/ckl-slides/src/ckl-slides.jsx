import React, { useMemo, useCallback, memo } from "react";
import { IalIcon } from "@components-kit/assets/react";

export const CklSlides = memo(function CklSlides({
  slides = [],
  selected = "",
  onSelectSlide,
  className = "",
  ...props
}) {
  const selectedIndex = useMemo(() => slides.indexOf(selected), [slides, selected]);

  const selectSlide = useCallback(
    (slide) => {
      onSelectSlide?.(slide);
    },
    [onSelectSlide],
  );

  const goToPrevious = useCallback(() => {
    if (selectedIndex > 0) {
      onSelectSlide?.(slides[selectedIndex - 1]);
    }
  }, [selectedIndex, slides, onSelectSlide]);

  const goToNext = useCallback(() => {
    if (selectedIndex < slides.length - 1) {
      onSelectSlide?.(slides[selectedIndex + 1]);
    }
  }, [selectedIndex, slides, onSelectSlide]);

  const isPrevDisabled = selectedIndex <= 0;
  const isNextDisabled = selectedIndex >= slides.length - 1;

  const rootClass = className ? `ckl-slides ${className}` : "ckl-slides";

  return (
    <div className={rootClass} {...props}>
      <div className="ckl-slides__controls">
        <IalIcon
          className="ckl-slides__arrow ckl-slides__arrow--back"
          icon="ial-arrow"
          cursor="pointer"
          disabled={isPrevDisabled}
          onClick={goToPrevious}
        />
        {slides.map((bullet) => (
          <span
            key={`bullet-${bullet}`}
            className={`ckl-slides__bullet ${bullet === selected ? "ckl-slides__bullet--active" : ""}`}
            onClick={() => selectSlide(bullet)}
          />
        ))}
        <IalIcon
          className="ckl-slides__arrow ckl-slides__arrow--next"
          icon="ial-arrow"
          cursor="pointer"
          disabled={isNextDisabled}
          onClick={goToNext}
        />
      </div>
    </div>
  );
});

export default CklSlides;
