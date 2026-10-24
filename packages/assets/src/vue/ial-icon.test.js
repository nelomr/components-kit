import { mount } from "@vue/test-utils";
import IalIcon from "./ial-icon.vue";

describe("ial-icon.vue", () => {
  const getWrapper = (params) => mount(IalIcon, params);

  const icon = "ial-arrow";
  test("mount component", async () => {
    expect(IalIcon).toBeTruthy();
  });
  describe("state", () => {
    test("should apply default classes with props", async () => {
      const wrapper = getWrapper({ props: { icon } });
      const iconWrapper = wrapper.find(".ial-icon");
      expect(iconWrapper.classes()).toContain("ial-icon--color-primary");
      expect(iconWrapper.classes()).toContain("ial-icon--size-default");
    });
  });
});
