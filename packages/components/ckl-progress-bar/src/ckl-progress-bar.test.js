import { mount } from "@vue/test-utils";
import CklProgressBar from "./ckl-progress-bar.vue";

describe("ckl-loader.vue", () => {
  const getWrapper = (params) => mount(CklProgressBar, params);
  test("mount component", async () => {
    expect(CklProgressBar).toBeTruthy();
    const wrapper = getWrapper({ props: { value: 50 } });
    expect(wrapper.text()).toContain("50%");
  });
  describe("state", () => {
    test("should display error if value <= 25", async () => {
      const wrapper = getWrapper({ props: { value: 25 } });
      const bar = wrapper.find(".ckl-progress-bar__value");
      expect(bar.classes()).toContain("ckl-progress-bar__value--color-error");
      expect(wrapper.text()).toContain("25%");
    });
    test("should display warning if value > 25 ", async () => {
      const wrapper = getWrapper({ props: { value: 27 } });
      const bar = wrapper.find(".ckl-progress-bar__value");
      expect(bar.classes()).toContain("ckl-progress-bar__value--color-warning");
      expect(wrapper.text()).toContain("27%");
    });
    test("should display warning if value < 75 ", async () => {
      const wrapper = getWrapper({ props: { value: 74 } });
      const bar = wrapper.find(".ckl-progress-bar__value");
      expect(bar.classes()).toContain("ckl-progress-bar__value--color-warning");
      expect(wrapper.text()).toContain("74%");
    });
    test("should display acceptable if value >= 75", async () => {
      const wrapper = getWrapper({ props: { value: 75 } });
      const bar = wrapper.find(".ckl-progress-bar__value");
      expect(bar.classes()).toContain(
        "ckl-progress-bar__value--color-acceptable"
      );
      expect(wrapper.text()).toContain("75%");
    });
    test("should display acceptable if value < 100", async () => {
      const wrapper = getWrapper({ props: { value: 99 } });
      const bar = wrapper.find(".ckl-progress-bar__value");
      expect(bar.classes()).toContain(
        "ckl-progress-bar__value--color-acceptable"
      );
      expect(wrapper.text()).toContain("99%");
    });
    test("should display success if value = 100", async () => {
      const wrapper = getWrapper({ props: { value: 100 } });
      const bar = wrapper.find(".ckl-progress-bar__value");
      expect(bar.classes()).toContain("ckl-progress-bar__value--color-success");
      expect(wrapper.text()).toContain("100%");
    });
    test("should round progress value", async () => {
      const wrapper = getWrapper({ props: { value: 77.83 } });
      const bar = wrapper.find(".ckl-progress-bar__value");
      expect(bar.classes()).toContain(
        "ckl-progress-bar__value--color-acceptable"
      );
      expect(wrapper.text()).toContain("78%");
    });
  });
});
