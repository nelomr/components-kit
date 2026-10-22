import { mount } from "@vue/test-utils";
import CklHorizontalTabs from "./ckl-horizontal-tabs.vue";

describe("ckl-horizontal-tabs.vue", () => {
  const tabs = [
    {
      id: "1",
      text: "Tab 1",
    },
    {
      id: "2",
      text: "Tab 2",
    },
  ];

  const getWrapper = (params) => mount(CklHorizontalTabs, params);

  test("mount component", async () => {
    expect(CklHorizontalTabs).toBeTruthy();
    const wrapper = getWrapper({ props: { tabs } });
    expect(wrapper.text()).toContain("Tab 1Tab 2");
  });
  describe("state", () => {
    test("should render text as function", async () => {
      const tabs = [
        {
          id: "1",
          text: () => "Tab 1",
        },
      ];
      const wrapper = getWrapper({ props: { tabs } });
      expect(wrapper.text()).toContain("Tab 1");
    });
    test("should apply classes on selected tab", async () => {
      const props = {
        tabs,
        selected: "1",
      };
      const wrapper = getWrapper({ props });
      const tab = wrapper.find('li[data-selector="tab-1-0"]');
      expect(tab.classes()).toContain("ckl-horizontal-tabs__title--active");
    });
    test("should apply classes on disabled tab as boolean", async () => {
      const tabs = [
        {
          id: "1",
          text: "Tab 1",
          disabled: true,
        },
      ];
      const wrapper = getWrapper({ props: { tabs } });
      const tab = wrapper.find('li[data-selector="tab-1-0"]');
      expect(tab.classes()).toContain("ckl-horizontal-tabs__title--disabled");
    });
    test("should apply classes on disabled tab as function", async () => {
      const tabs = [
        {
          id: "1",
          text: "Tab 1",
          disabled: () => true,
        },
      ];
      const wrapper = getWrapper({ props: { tabs } });
      const tab = wrapper.find('li[data-selector="tab-1-0"]');
      expect(tab.classes()).toContain("ckl-horizontal-tabs__title--disabled");
    });
  });
  describe("events", () => {
    test("should emit event on tab click", async () => {
      const wrapper = getWrapper({ props: { tabs } });
      const tab = wrapper.find('li[data-selector="tab-1-0"]');
      await tab.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("select-tab");
    });
    test("should not emit event on disabled tab click", async () => {
      const tabs = [
        {
          id: "1",
          text: "Tab 1",
          disabled: true,
        },
      ];
      const wrapper = getWrapper({ props: { tabs } });
      const tab = wrapper.find('li[data-selector="tab-1-0"]');
      await tab.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("select-tab");
    });
  });
});
