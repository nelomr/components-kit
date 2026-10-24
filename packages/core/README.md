# @components-kit/core

> Framework-agnostic business logic, math calculations, and UI helpers for Components Kit.

`@components-kit/core` centralizes all shared calculation logic and pure algorithms across Vue 3 and React 19 components. It has **zero DOM dependencies** (except event listener helpers) and **zero framework dependencies**.

---

## Installation

```bash
pnpm add @components-kit/core
```

---

## Modules & Exports

### 1. Barometer (`@components-kit/core/barometer`)

- `DEFAULT_BAROMETER_RANGES`: Standard color and threshold ranges.
- `calculateBarometerAngle(value, min, max, startAngle, totalAngle)`: Calculates gauge needle angle.
- `getBarometerColor(value, ranges)`: Resolves active color based on threshold boundaries.

### 2. Carousel Math (`@components-kit/core/carousel-math`)

- `parseDimension(dim, fallback)`: Parses numbers or px/percentage strings.
- `calculateVisibleSlides(containerWidth, slideWidth)`: Calculates how many slides fit in the viewport.
- `calculateMaxIndex(totalSlides, visibleSlides)`: Clamps index bounds.
- `calculateTrackOffset(index, slideWidth, gap)`: Computes CSS transform translation.

### 3. Progress Bar (`@components-kit/core/progress-bar`)

- `calculatePercentage(current, total, max)`: Computes clamped 0–100 progress.

### 4. Tabs (`@components-kit/core/tabs`)

- `getTabSelector(tab, index)`: Normalizes unique tab identifier.
- `getTabIconSelector(tab)`: Extracts tab icon descriptor.
- `getTabText(tab)`: Extracts tab label.
- `isTabDisabled(tab)`: Checks disabled state.
- `findInitialActiveTab(items, defaultActive)`: Finds the initial active tab.

### 5. Tooltip Position (`@components-kit/core/tooltip-position`)

- `calculateTooltipPosition(targetRect, tooltipRect, placement, offset)`: Computes absolute coordinates.
- `TOOLTIP_POSITIONS`: Valid position constants (`top`, `bottom`, `left`, `right`).

### 6. Truncate Text (`@components-kit/core/truncate-text`)

- `formatTruncatedText(text, maxLength, ellipsis)`: Pure string truncation utility.

### 7. Side Nav (`@components-kit/core/side-nav`)

- `isSideNavItemActive(item, currentRoute)`: Evaluates route/active state.
- `isSideNavItemDisabled(item)`: Evaluates item disabled state.
- `getSideNavSubmenuItems(item)`: Normalizes nested menu items.

### 8. Pagination Math (`@components-kit/core/pagination-math`)

- `calculateTotalPages(totalItems, pageSize)`: Computes page count.
- `generatePaginationRange(currentPage, totalPages, maxVisible)`: Builds array of pages with ellipsis markers.
- `clampPage(page, totalPages)`: Clamps page number within valid bounds.

### 9. Click Outside (`@components-kit/core/on-click-outside`)

- `createClickOutsideHandler(element, callback)`: Reusable DOM event listener factory.

---

## Testing

```bash
pnpm --filter @components-kit/core test
```

All functions are verified by 20+ unit tests with 100% test coverage.

---

## License

Internal workspace package licensed under [MIT](../../LICENSE).
