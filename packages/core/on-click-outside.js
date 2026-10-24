/**
 * Safely unrefs an element whether it's a raw DOM node, a Vue ref (.value),
 * a React ref (.current), or a function getter.
 *
 * @param {any} target
 * @returns {HTMLElement | null | undefined}
 */
export function unrefElement(target) {
  if (typeof target === "function") {
    return target();
  }
  if (target && typeof target === "object") {
    if ("value" in target) return target.value;
    if ("current" in target) return target.current;
  }
  return target;
}

/**
 * Function to add a listener when clicking outside an element
 *
 * @param {Object} params
 * @param {HTMLElement | { value: HTMLElement } | { current: HTMLElement }} params.target - Element to listen clicking outside
 * @param {Function} params.handler - Function executed when clicking outside
 * @param {(string[] | HTMLElement[])} [params.ignore] - Elements to ignore
 * @returns {Function} - Function to remove listener
 */
export function onClickOutside({ target, handler, ignore = [] }) {
  const onDocumentClick = (event) => {
    const elemIsClicked = (elem) => {
      return elem?.contains?.(event.target);
    };

    const targetElem = unrefElement(target);

    const shouldIgnore = ignore.some((ignoreElem) => {
      if (typeof ignoreElem === "string") {
        return Array.from(document.querySelectorAll(ignoreElem)).some((el) => elemIsClicked(el));
      }
      return elemIsClicked(unrefElement(ignoreElem));
    });

    if (!elemIsClicked(targetElem) && !shouldIgnore) {
      handler(event);
    }
  };
  window.addEventListener("click", onDocumentClick);

  const removeListener = () => {
    window.removeEventListener("click", onDocumentClick);
  };

  return removeListener;
}
