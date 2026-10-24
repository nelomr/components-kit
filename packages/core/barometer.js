export const DEFAULT_BAROMETER_RANGES = [
  { min: 0, max: 25, label: "Very Low" },
  { min: 25, max: 50, label: "Low" },
  { min: 50, max: 75, label: "Mid" },
  { min: 75, max: 95, label: "High" },
  { min: 95, max: 100, label: "Very High" },
];

export function clampPercentage(percentage) {
  return Math.min(Math.max(Number(percentage) || 0, 0), 100);
}

export function calculateBarometerRotation(percentage) {
  const normalized = clampPercentage(percentage);
  return (normalized / 100) * 179.9 - 90;
}

export function getBarometerRangeLabel(percentage, ranges = DEFAULT_BAROMETER_RANGES) {
  const normalized = clampPercentage(percentage);
  const match = ranges.find((range) => normalized >= range.min && normalized <= range.max);
  return match ? match.label : "";
}
