import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
  memo,
} from "react";
import { IalIcon } from "@components-kit/assets/react";
import {
  calculateVisibleSlides,
  calculateMaxIndex,
  calculateTrackOffset,
  parseDimension,
} from "@components-kit/core";

export const CklCarousel = memo(
  forwardRef(function CklCarousel(
    {
      items = [],
      itemKey = "id",
      transitionDuration = 300,
      itemWidth,
      gap = 16,
      slidesToScroll = 1,
      modelValue,
      value,
      defaultValue = 0,
      visibleItems = null,
      onUpdateModelValue,
      onChange,
      renderSlide,
      className = "",
      ...props
    },
    ref,
  ) {
    const containerRef = useRef(null);
    const [internalIndex, setInternalIndex] = useState(defaultValue);
    const [transitioning, setTransitioning] = useState(false);
    const [visibleSlides, setVisibleSlides] = useState(3);

    const controlledVal = value !== undefined ? value : modelValue;
    const isControlled = controlledVal !== undefined;
    const currentIndex = isControlled ? controlledVal : internalIndex;

    const emitChange = useCallback(
      (newVal) => {
        if (!isControlled) {
          setInternalIndex(newVal);
        }
        onChange?.(newVal);
        onUpdateModelValue?.(newVal);
      },
      [isControlled, onChange, onUpdateModelValue],
    );

    const numericItemWidth = parseDimension(itemWidth, 200);
    const numericGap = parseDimension(gap, 0);

    const updateVisibleSlides = useCallback(() => {
      if (!containerRef.current) return;
      const computed = calculateVisibleSlides(
        containerRef.current.offsetWidth,
        numericItemWidth,
        numericGap,
      );
      setVisibleSlides(computed);
    }, [numericItemWidth, numericGap]);

    useEffect(() => {
      updateVisibleSlides();
      const handleResize = () => updateVisibleSlides();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [updateVisibleSlides]);

    const maxIndex = useMemo(() => {
      return calculateMaxIndex(items.length, visibleSlides);
    }, [items.length, visibleSlides]);

    useEffect(() => {
      if (currentIndex > maxIndex) {
        emitChange(maxIndex);
      }
    }, [maxIndex, currentIndex, emitChange]);

    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex < maxIndex;

    const next = useCallback(() => {
      if (!canGoNext || transitioning) return;
      setTransitioning(true);
      emitChange(Math.min(currentIndex + slidesToScroll, maxIndex));
      setTimeout(() => {
        setTransitioning(false);
      }, transitionDuration);
    }, [
      canGoNext,
      transitioning,
      currentIndex,
      slidesToScroll,
      maxIndex,
      emitChange,
      transitionDuration,
    ]);

    const previous = useCallback(() => {
      if (!canGoPrevious || transitioning) return;
      setTransitioning(true);
      emitChange(Math.max(currentIndex - slidesToScroll, 0));
      setTimeout(() => {
        setTransitioning(false);
      }, transitionDuration);
    }, [
      canGoPrevious,
      transitioning,
      currentIndex,
      slidesToScroll,
      emitChange,
      transitionDuration,
    ]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        currentIndex,
        updateVisibleSlides,
      }),
      [next, previous, currentIndex, updateVisibleSlides],
    );

    const showControls = useMemo(() => {
      if (items.length <= 1) return false;
      return items.length > visibleSlides;
    }, [items.length, visibleSlides]);

    const containerStyle = useMemo(() => {
      if (visibleItems) {
        const width = visibleItems * numericItemWidth + (visibleItems - 1) * numericGap;
        return {
          flex: "none",
          width: `${width}px`,
          maxWidth: "100%",
        };
      }
      return {};
    }, [visibleItems, numericItemWidth, numericGap]);

    const trackStyle = useMemo(() => {
      const offset = calculateTrackOffset(currentIndex, numericItemWidth, numericGap);
      return {
        transform: `translateX(-${offset}px)`,
        transition: transitioning ? `transform ${transitionDuration}ms ease-in-out` : "none",
      };
    }, [currentIndex, numericItemWidth, numericGap, transitioning, transitionDuration]);

    const rootClass = className ? `ckl-carousel ${className}` : "ckl-carousel";

    return (
      <div
        className={rootClass}
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        {...props}
      >
        {showControls && (
          <button
            type="button"
            className={`ckl-carousel__btn ckl-carousel__btn--prev ${!canGoPrevious ? "ckl-carousel__btn--disabled" : ""}`}
            disabled={!canGoPrevious}
            aria-label="Previous slide"
            onClick={previous}
          >
            <IalIcon
              icon="ial-arrow-pointer-left"
              color={canGoPrevious ? "primary" : "grey-300"}
              cursor={canGoPrevious ? "pointer" : "default"}
              size="small"
            />
          </button>
        )}

        <div
          ref={containerRef}
          className={`ckl-carousel__container ${!showControls ? "ckl-carousel__container--no-controls" : ""}`}
          style={containerStyle}
        >
          <div className="ckl-carousel__track" style={trackStyle}>
            {items.map((item, index) => {
              const isHidden = index < currentIndex || index >= currentIndex + visibleSlides;
              const key = item && item[itemKey] !== undefined ? item[itemKey] : index;
              return (
                <div
                  key={key}
                  className="ckl-carousel__slide"
                  style={{
                    width: `${numericItemWidth}px`,
                    marginRight: index < items.length - 1 ? `${numericGap}px` : 0,
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-hidden={isHidden}
                >
                  {renderSlide
                    ? renderSlide(item, index)
                    : typeof item === "object" && item !== null
                      ? item.content !== undefined
                        ? item.content
                        : item.name !== undefined
                          ? item.name
                          : item.title !== undefined
                            ? item.title
                            : String(item)
                      : String(item)}
                </div>
              );
            })}
          </div>
        </div>

        {showControls && (
          <button
            type="button"
            className={`ckl-carousel__btn ckl-carousel__btn--next ${!canGoNext ? "ckl-carousel__btn--disabled" : ""}`}
            disabled={!canGoNext}
            aria-label="Next slide"
            onClick={next}
          >
            <IalIcon
              icon="ial-arrow-pointer-right"
              color={canGoNext ? "primary" : "grey-300"}
              cursor={canGoNext ? "pointer" : "default"}
              size="small"
            />
          </button>
        )}
      </div>
    );
  }),
);

export default CklCarousel;
