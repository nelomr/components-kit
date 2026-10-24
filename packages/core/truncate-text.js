export function calculateTruncateText({ text = "", separator = "", characterLimit = 0 } = {}) {
  const limit = Number(characterLimit) || 0;

  if (Array.isArray(text)) {
    const sep = separator || "";
    let currentArrayValue = [];
    let stopped = false;
    for (const item of text) {
      const nextArray = currentArrayValue.concat(item);
      if (nextArray.join(sep).length > limit) {
        stopped = true;
        break;
      }
      currentArrayValue = nextArray;
    }
    return {
      arrayValues: currentArrayValue,
      itemLeftCount: text.length - currentArrayValue.length,
      truncateText: currentArrayValue.join(sep),
      isTruncated: stopped,
    };
  }

  const str = String(text ?? "");
  return {
    arrayValues: null,
    itemLeftCount: null,
    truncateText: str.slice(0, limit),
    isTruncated: str.length > limit,
  };
}
