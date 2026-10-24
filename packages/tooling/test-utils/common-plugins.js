import { DOMWrapper } from "@vue/test-utils";

export const DataSelectorPlugin = (wrapper) => {
  function findByDataSelector(selector, path = "") {
    let dataSelector = `[data-selector='${selector}']`;
    if (path) {
      dataSelector = `${dataSelector} ${path}`;
    }

    const element = wrapper.element.querySelector(dataSelector);
    return new DOMWrapper(element);
  }

  return {
    findByDataSelector,
  };
};
