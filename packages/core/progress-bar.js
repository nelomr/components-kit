export function getProgressBarStatus(value) {
  const num = Number(value) || 0;
  if (num <= 25) {
    return "error";
  }
  if (num > 25 && num < 75) {
    return "warning";
  }
  if (num >= 75 && num < 100) {
    return "acceptable";
  }
  return "success";
}

export function formatProgressValue(value) {
  const num = Number(value) || 0;
  return num.toFixed();
}
