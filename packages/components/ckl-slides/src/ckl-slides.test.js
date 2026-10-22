import { mount } from "@vue/test-utils";
import CklSlides from "./ckl-slides.vue";

describe("ckl-slides.vue", () => {
  const slides = ["one", "two", "three"];
  const selected = "one";

  const getWrapper = (params) => mount(CklSlides, params);

  test("mount component", async () => {
    expect(CklSlides).toBeTruthy();
    const wrapper = getWrapper({ props: { slides, selected } });
    expect(wrapper.text()).toEqual("");
  });
  describe("state", () => {
    test("should display bullets depending in slides size", async () => {
      const wrapper = getWrapper({ props: { slides, selected } });
      const bullets = wrapper.findAll(".ckl-slides__bullet");
      expect(bullets.length).toEqual(3);
    });
    test("should display two arrows", async () => {
      const wrapper = getWrapper({ props: { slides, selected } });
      const arrows = wrapper.findAll(".ckl-slides__arrow");
      expect(arrows.length).toEqual(2);
    });
    test("should mark selected bullet slide", async () => {
      const wrapper = getWrapper({ props: { slides, selected } });
      const bullet = wrapper.findAll(".ckl-slides__bullet");
      expect(bullet[0].classes()).toContain("ckl-slides__bullet--active");
      expect(bullet[1].classes()).not.toContain("ckl-slides__bullet--active");
      expect(bullet[2].classes()).not.toContain("ckl-slides__bullet--active");
    });
    test("should disable prev arrow if selected slide is the first", async () => {
      const wrapper = getWrapper({ props: { slides, selected } });
      const arrowBack = wrapper.find(".ckl-slides__arrow--back");
      expect(arrowBack.classes()).toContain("ial-icon--disabled");
      const arrowNext = wrapper.find(".ckl-slides__arrow--next");
      expect(arrowNext.classes()).not.toContain("ial-icon--disabled");
    });
    test("should disable next arrow if selected slide is the last", async () => {
      const wrapper = getWrapper({ props: { slides, selected: "three" } });
      const arrowBack = wrapper.find(".ckl-slides__arrow--back");
      expect(arrowBack.classes()).not.toContain("ial-icon--disabled");
      const arrowNext = wrapper.find(".ckl-slides__arrow--next");
      expect(arrowNext.classes()).toContain("ial-icon--disabled");
    });
  });
  describe("events", () => {
    test("should emit select slide on bullet click", async () => {
      const wrapper = getWrapper({ props: { slides, selected } });
      const bullets = wrapper.findAll(".ckl-slides__bullet");
      await bullets[0].trigger("click");
      expect(wrapper.emitted()).toHaveProperty("select-slide");
    });
    test("should emit select slide on next arrow click", async () => {
      const wrapper = getWrapper({ props: { slides, selected } });
      const arrowNext = wrapper.find(".ckl-slides__arrow--next");
      await arrowNext.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("select-slide");
      expect(wrapper.emitted("select-slide")[0]).toEqual(["two"]);
    });
    test("should not emit select slide on next arrow disabled click", async () => {
      const wrapper = getWrapper({ props: { slides, selected: "three" } });
      const arrowNext = wrapper.find(".ckl-slides__arrow--next");
      await arrowNext.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("select-slide");
    });
    test("should emit select slide on previous arrow click", async () => {
      const wrapper = getWrapper({ props: { slides, selected: "two" } });
      const arrowBack = wrapper.find(".ckl-slides__arrow--back");
      await arrowBack.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("select-slide");
      expect(wrapper.emitted("select-slide")[0]).toEqual(["one"]);
    });
    test("should not emit select slide on next arrow disabled click", async () => {
      const wrapper = getWrapper({ props: { slides, selected } });
      const arrowBack = wrapper.find(".ckl-slides__arrow--back");
      await arrowBack.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("select-slide");
    });
  });
});
