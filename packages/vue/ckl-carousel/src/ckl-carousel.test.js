import { mount } from "@vue/test-utils";
import CklCarousel from "./ckl-carousel.vue";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("CklCarousel", () => {
  const defaultProps = {
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
      { id: 5, name: "Item 5" },
    ],
    itemWidth: 200,
    gap: 16,
  };

  const stubs = {
    "ial-icon": true, // Stub the icon component
  };

  it("renders correctly", () => {
    const wrapper = mount(CklCarousel, {
      props: defaultProps,
      global: { stubs },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".ckl-carousel").exists()).toBe(true);
  });

  it("renders the correct number of slides", () => {
    const wrapper = mount(CklCarousel, {
      props: defaultProps,
      global: { stubs },
    });
    const slides = wrapper.findAll(".ckl-carousel__slide");
    expect(slides.length).toBe(defaultProps.items.length);
  });

  it("renders slot content correctly", () => {
    const wrapper = mount(CklCarousel, {
      props: defaultProps,
      slots: {
        slide: '<div class="custom-slide">{{ params.item.name }}</div>',
      },
      global: { stubs },
    });
    const slideContent = wrapper.find(".custom-slide");
    expect(slideContent.exists()).toBe(true);
    expect(slideContent.text()).toBe("Item 1");
  });

  it("applies itemWidth and gap styles", () => {
    const wrapper = mount(CklCarousel, {
      props: defaultProps,
      global: { stubs },
    });
    const slides = wrapper.findAll(".ckl-carousel__slide");
    const firstSlide = slides[0];

    // Check width
    expect(firstSlide.attributes("style")).toContain(`width: ${defaultProps.itemWidth}px`);

    // Check margin-right (gap)
    expect(firstSlide.attributes("style")).toContain(`margin-right: ${defaultProps.gap}px`);

    // Last slide should have 0 margin-right
    const lastSlide = slides[slides.length - 1];
    expect(lastSlide.attributes("style")).toContain("margin-right: 0");
  });

  it("shows navigation controls when needed", async () => {
    // Mock offsetWidth to simulate a small container where not all items fit
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 500,
    });

    const wrapper = mount(CklCarousel, {
      props: defaultProps,
      global: { stubs },
    });

    // Force reactivity update
    wrapper.vm.updateVisibleSlides();
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll(".ckl-carousel__btn");
    expect(buttons.length).toBe(2); // Prev and Next
  });

  it("hides navigation controls when all items fit", async () => {
    // Mock large container
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 2000,
    });

    const wrapper = mount(CklCarousel, {
      props: {
        ...defaultProps,
        items: [
          { id: 1, name: "1" },
          { id: 2, name: "2" },
        ], // Few items
      },
      global: { stubs },
    });

    wrapper.vm.updateVisibleSlides();
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll(".ckl-carousel__btn");
    expect(buttons.length).toBe(0);
  });

  it("navigates next and previous", async () => {
    // Mock container to show 2 items, so we have room to scroll
    // itemWidth 200 + gap 16 = 216 per item.
    // Container 500px -> fits 2 items (216*2 = 432 < 500).
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 500,
    });

    const wrapper = mount(CklCarousel, {
      props: defaultProps,
      global: { stubs },
    });

    wrapper.vm.updateVisibleSlides();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentIndex).toBe(0);
    expect(wrapper.find(".ckl-carousel__btn--prev").classes()).toContain(
      "ckl-carousel__btn--disabled",
    );
    expect(wrapper.find(".ckl-carousel__btn--next").classes()).not.toContain(
      "ckl-carousel__btn--disabled",
    );

    // Click Next
    await wrapper.find(".ckl-carousel__btn--next").trigger("click");
    expect(wrapper.vm.currentIndex).toBe(1);

    // Wait for transition (mocked via setTimeout in component)
    await new Promise((resolve) => setTimeout(resolve, 310));

    expect(wrapper.find(".ckl-carousel__btn--prev").classes()).not.toContain(
      "ckl-carousel__btn--disabled",
    );

    // Click Previous
    await wrapper.find(".ckl-carousel__btn--prev").trigger("click");
    expect(wrapper.vm.currentIndex).toBe(0);
  });

  it("respects visibleItems prop", () => {
    const visibleItems = 3;
    const wrapper = mount(CklCarousel, {
      props: {
        ...defaultProps,
        visibleItems,
      },
      global: { stubs },
    });

    const container = wrapper.find(".ckl-carousel__container");
    const expectedWidth =
      visibleItems * defaultProps.itemWidth + (visibleItems - 1) * defaultProps.gap;
    expect(container.attributes("style")).toContain(`width: ${expectedWidth}px`);
  });

  it("navigates multiple slides based on slidesToScroll", async () => {
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 500, // Fits 2 items (216 * 2 = 432)
    });

    const wrapper = mount(CklCarousel, {
      props: {
        ...defaultProps,
        slidesToScroll: 2,
      },
      global: { stubs },
    });

    wrapper.vm.updateVisibleSlides();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentIndex).toBe(0);

    // Click Next
    await wrapper.find(".ckl-carousel__btn--next").trigger("click");
    expect(wrapper.vm.currentIndex).toBe(2); // Should advance by 2

    // Click Previous
    await new Promise((resolve) => setTimeout(resolve, 310));
    await wrapper.find(".ckl-carousel__btn--prev").trigger("click");
    expect(wrapper.vm.currentIndex).toBe(0);
  });

  it("emits update:model-value on navigation", async () => {
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 500,
    });

    const wrapper = mount(CklCarousel, {
      props: defaultProps,
      global: { stubs },
    });

    wrapper.vm.updateVisibleSlides();
    await wrapper.vm.$nextTick();

    await wrapper.find(".ckl-carousel__btn--next").trigger("click");
    expect(wrapper.emitted("update:model-value")).toBeTruthy();
    expect(wrapper.emitted("update:model-value")[0]).toEqual([1]);
  });

  it("controls index via modelValue prop", async () => {
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 500,
    });

    const wrapper = mount(CklCarousel, {
      props: {
        ...defaultProps,
        modelValue: 0,
      },
      global: { stubs },
    });

    wrapper.vm.updateVisibleSlides();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentIndex).toBe(0);

    // Update prop
    await wrapper.setProps({ modelValue: 2 });
    expect(wrapper.vm.currentIndex).toBe(2);
  });

  it("has accessibility attributes", () => {
    const wrapper = mount(CklCarousel, {
      props: defaultProps,
      global: { stubs },
    });

    const root = wrapper.find(".ckl-carousel");
    expect(root.attributes("role")).toBe("region");
    expect(root.attributes("aria-roledescription")).toBe("carousel");

    const slides = wrapper.findAll(".ckl-carousel__slide");
    expect(slides[0].attributes("role")).toBe("group");
    expect(slides[0].attributes("aria-roledescription")).toBe("slide");
  });
});
