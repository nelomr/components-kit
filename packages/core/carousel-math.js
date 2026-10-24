export function parseDimension(value, fallback = 0) {
  if (typeof value === "number") return value;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export function calculateVisibleSlides(containerWidth, itemWidth, gap = 0) {
  const numericItemWidth = parseDimension(itemWidth, 200);
  const numericGap = parseDimension(gap, 0);
  const slideWithGap = numericItemWidth + numericGap;
  if (slideWithGap <= 0) return 1;
  const computed = Math.floor((containerWidth + numericGap) / slideWithGap);
  return Math.max(1, computed);
}

export function calculateMaxIndex(itemsLength, visibleSlides) {
  return Math.max(0, itemsLength - visibleSlides);
}

export function calculateTrackOffset(currentIndex, itemWidth, gap = 0) {
  const numericItemWidth = parseDimension(itemWidth, 200);
  const numericGap = parseDimension(gap, 0);
  return currentIndex * (numericItemWidth + numericGap);
}
