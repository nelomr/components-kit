/**
 * Pure mathematical helper for calculating pagination ranges and ellipsis glues
 * Shared between Vue and React implementations.
 *
 * @param {Object} options
 * @param {number} [options.numPages]
 * @param {number} [options.current]
 * @param {number} [options.itemToShow]
 * @returns {Array<number | string>}
 */
export function buildPaginationRange({ numPages = 1, current = 0, itemToShow = 7 }) {
  let item = Math.max(itemToShow, 7);
  const maxItemsToShow = item % 2 ? item : Math.ceil(item / 2) * 2 + 1;
  const itemToSum = (maxItemsToShow - 5) / 2;
  const specialItemNumber = Math.min(4, numPages);
  const rangeLength = Math.max(Math.min(itemToSum * 2 + 1, numPages - specialItemNumber), 0);
  const rangeStart = Math.min(
    Math.max(current - itemToSum, 3),
    Math.max(numPages - rangeLength - 1, 3),
  );

  const buildRange = (start, length) =>
    Array(length)
      .fill(start)
      .map((x, y) => x + y);

  const floatingRange = rangeLength ? buildRange(rangeStart, rangeLength) : [];

  let leftGlue = [];
  if (numPages - 2 > 0) {
    leftGlue = rangeStart <= 3 ? 2 : "...";
  }

  let rightGlue = [];
  if (numPages - 2 > 1) {
    if (current + itemToSum >= numPages - 2 || numPages <= maxItemsToShow) {
      rightGlue = numPages - 1;
    } else {
      rightGlue = "...";
    }
  }

  const lastItem = numPages > 1 ? numPages : [];

  return [1].concat(leftGlue, floatingRange, rightGlue, lastItem);
}
