import { mount } from "@vue/test-utils";
import CklIcon from "./ckl-icon.vue";

describe("ckl-icon.vue", () => {
  const getWrapper = (params) => mount(CklIcon, params);

  const icon = {};
  test("mount component", async () => {
    expect(CklIcon).toBeTruthy();
  });
  describe("state", () => {
    test("should apply default classes with props", async () => {
      const wrapper = getWrapper({ props: { icon } });
      const iconWrapper = wrapper.find(".ckl-icon");
      expect(iconWrapper.classes()).toContain("ckl-icon--color-primary");
      expect(iconWrapper.classes()).toContain("ckl-icon--size-default");
      expect(iconWrapper.classes()).toContain("ckl-icon--cursor-default");
    });
    test("should apply disabled class", async () => {
      const wrapper = getWrapper({ props: { icon, disabled: true } });
      const iconWrapper = wrapper.find(".ckl-icon");
      expect(iconWrapper.classes()).toContain("ckl-icon--disabled");
    });
    test("should apply disabled class as function", async () => {
      const wrapper = getWrapper({ props: { icon, disabled: () => true } });
      const iconWrapper = wrapper.find(".ckl-icon");
      expect(iconWrapper.classes()).toContain("ckl-icon--disabled");
    });
  });
  describe("events", () => {
    test("should emit event on click", async () => {
      const wrapper = getWrapper({ props: { icon } });
      const iconWrapper = wrapper.find(".ckl-icon");
      await iconWrapper.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("click");
    });
    test("should not emit event on disabled click", async () => {
      const wrapper = getWrapper({ props: { icon, disabled: true } });
      const iconWrapper = wrapper.find(".ckl-icon");
      await iconWrapper.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("click");
    });
  });
});
