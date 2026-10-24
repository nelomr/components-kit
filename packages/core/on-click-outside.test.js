import { onClickOutside } from "./on-click-outside";

describe("on-click-outside", () => {
  window.document.body.innerHTML = `
    <div class="element1">1</div>
    <div class="element2">2</div>
    <div class="element3">3</div>
  `;
  const element1 = window.document.querySelector(".element1");
  const element2 = window.document.querySelector(".element2");
  const element3 = window.document.querySelector(".element3");

  describe("state", () => {
    test("should not trigger handler function clicking on target", async () => {
      const handlerMock = vi.fn();
      const cleanListener = onClickOutside({
        target: element1,
        handler: () => {
          handlerMock();
          cleanListener();
        },
      });
      element1.click();
      expect(handlerMock).toHaveBeenCalledTimes(0);
    });

    test("should trigger handler function clicking outside target", async () => {
      const handlerMock = vi.fn();
      const cleanListener = onClickOutside({
        target: element1,
        handler: () => {
          handlerMock();
          cleanListener();
        },
      });
      element2.click();
      expect(handlerMock).toHaveBeenCalledTimes(1);
    });

    test("return function should clean listener", async () => {
      const handlerMock = vi.fn();
      const cleanListener = onClickOutside({
        target: element1,
        handler: () => {
          handlerMock();
        },
      });
      element2.click();
      cleanListener();
      element2.click();
      expect(handlerMock).toHaveBeenCalledTimes(1);
    });

    test("should ignore elements as HTMLElement", async () => {
      const handlerMock = vi.fn();
      const cleanListener = onClickOutside({
        target: element1,
        handler: () => {
          handlerMock();
          cleanListener();
        },
        ignore: [element3],
      });
      element3.click();
      cleanListener();
      expect(handlerMock).toHaveBeenCalledTimes(0);
    });

    test("should ignore elements as string", async () => {
      const handlerMock = vi.fn();
      const cleanListener = onClickOutside({
        target: element1,
        handler: () => {
          handlerMock();
          cleanListener();
        },
        ignore: [".element3"],
      });
      element3.click();
      cleanListener();
      expect(handlerMock).toHaveBeenCalledTimes(0);
    });
  });
});
