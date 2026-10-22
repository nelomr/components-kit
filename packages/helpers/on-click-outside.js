import { unref } from "vue";

/**
 * Function to add a listener when clicking outside an element
 *
 * @param {Objet} params
 * @param {HTMLElement} params.target - Element to listen clicking outside
 * @param {Function} params.handler - Function executed when clicking outside
 * @param {(string[] | HTMLElement[])} [params.ignore] - Elements to ignore
 * @returns {Function} - Function to remove listener
 */
export function onClickOutside({ target, handler, ignore = [] }) {
  const onDocumentClick = (event) => {
    const elemIsClicked = (elem) => {
      return elem?.contains(event.target);
    };

    const targetElem = unref(target);

    const shouldIgnore = ignore.some((ignoreElem) => {
      if (typeof ignoreElem === "string") {
        return Array.from(document.querySelectorAll(ignoreElem)).some((el) =>
          elemIsClicked(el)
        );
      }
      return elemIsClicked(unref(ignoreElem));
    });

    if (!elemIsClicked(targetElem) && !shouldIgnore) {
      handler();
    }
  };
  window.addEventListener("click", onDocumentClick);

  const removeListener = () => {
    window.removeEventListener("click", onDocumentClick);
  };

  return removeListener;
}
