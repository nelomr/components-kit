import { mount } from "@vue/test-utils";
import CklPagination from "./ckl-pagination.vue";

describe("ckl-pagination.vue", () => {
  const numPages = 20;
  const current = 1;
  const getWrapper = (params) => mount(CklPagination, params);

  test("mount component", async () => {
    expect(CklPagination).toBeTruthy();
    const wrapper = getWrapper({ props: { numPages, current } });
    expect(wrapper.text()).toContain("");
  });

  describe("state", () => {
    test("should display two arrow buttons", async () => {
      const wrapper = getWrapper({ props: { numPages, current } });
      const arrowButtons = wrapper.findAll(".ckl-pagination__btn");
      expect(arrowButtons.length).toEqual(2);
    });

    test("should display prev arrow disabled when at first page", async () => {
      const wrapper = getWrapper({ props: { numPages, current } });
      await wrapper.vm.$nextTick();
      const prevBtn = wrapper.find(".ckl-pagination__btn-prev");
      expect(prevBtn.classes()).toContain("ckl-pagination__btn--disabled");
    });

    test("should display next arrow disabled when at last page", async () => {
      const wrapper = getWrapper({ props: { numPages, current: numPages } });
      await wrapper.vm.$nextTick();
      const nextIcon = wrapper.find(".ckl-pagination__btn-next");
      expect(nextIcon.classes()).toContain("ckl-pagination__btn--disabled");
    });

    test("should display 7 items when there is more than 5 pages", async () => {
      const wrapper = getWrapper({ props: { numPages, current } });
      await wrapper.vm.$nextTick();
      const pages = wrapper.findAll(".ckl-pagination__list-item");
      expect(pages.length).toEqual(7);
    });

    test("should display 5 items when total pages are 5", async () => {
      const wrapper = getWrapper({ props: { numPages: 5, current } });
      await wrapper.vm.$nextTick();
      const pages = wrapper.findAll(".ckl-pagination__list-item");
      expect(pages.length).toEqual(5);
    });

    test("should display three dots before last number if current range is at start or 5 pages less than the end", async () => {
      const wrapper = getWrapper({ props: { numPages, current } });
      await wrapper.vm.$nextTick();
      const paginationItems = wrapper.findAll(".ckl-pagination__list-item");
      expect(paginationItems.at(5).text()).toBe("...");
    });

    test("should display three dots after first number if current range is at end or more than 5", async () => {
      const wrapper = getWrapper({ props: { numPages, current: 20 } });
      await wrapper.vm.$nextTick();
      const paginationItems = wrapper.findAll(".ckl-pagination__list-item");
      expect(paginationItems.at(1).text()).toBe("...");
    });

    test("should display three dots after first number and before last number if current range is in the middle", async () => {
      const wrapper = getWrapper({ props: { numPages, current: 9 } });
      await wrapper.vm.$nextTick();
      const paginationItems = wrapper.findAll(".ckl-pagination__list-item");
      expect(paginationItems.at(1).text()).toBe("...");
      expect(paginationItems.at(5).text()).toBe("...");
    });

    test("should display selected page active", async () => {
      const wrapper = getWrapper({ props: { numPages: 20, current: 3 } });
      await wrapper.vm.$nextTick();
      const pages = wrapper.findAll(".ckl-pagination__list-item");
      expect(pages.at(2).classes()).toContain(
        "ckl-pagination__list-item--active"
      );
    });
  });

  describe("events", () => {
    test("should emit event on page click", async () => {
      const wrapper = getWrapper({ props: { numPages, current } });
      await wrapper.vm.$nextTick();
      const pages = wrapper.findAll(".ckl-pagination__list-item");
      await pages[3].trigger("click");
      expect(wrapper.emitted()).toHaveProperty("page-updated");
    });

    test("should emit event on arrow click", async () => {
      const wrapper = getWrapper({ props: { numPages, current } });
      await wrapper.vm.$nextTick();
      const arrow = wrapper.findAll(".ckl-pagination__btn");
      await arrow[1].trigger("click");
      expect(wrapper.emitted()).toHaveProperty("page-updated");
    });

    test("should not emit event on arrow when disabled", async () => {
      const wrapper = getWrapper({ props: { numPages, current } });
      await wrapper.vm.$nextTick();
      const arrow = wrapper.findAll(".ckl-pagination__btn");
      await arrow[0].trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("page-updated");
    });

    test("should not emit event when clicking on three dots", async () => {
      const wrapper = getWrapper({ props: { numPages, current } });
      await wrapper.vm.$nextTick();
      const dots = wrapper.find(".ckl-pagination__list-item-dots");
      await dots.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("page-updated");
    });
  });
});
