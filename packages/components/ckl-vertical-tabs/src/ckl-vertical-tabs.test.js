import { mount } from "@vue/test-utils";
import CklVerticalTabs from "./ckl-vertical-tabs.vue";

describe("ckl-vertical-tabs.vue", () => {
  const tabs = [
    {
      name: "General Information",
      value: "GENERAL_INFORMATION",
      visible: true,
    },
    {
      name: "Account Information",
      value: "ACCOUNT",
      visible: true,
    },
    {
      name: "Ceding Company",
      value: "CEDING_COMPANY",
      visible: true,
      disabled: true,
    },
  ];

  const tabErrors = { GENERAL_INFORMATION: true };

  const getWrapper = (params) => mount(CklVerticalTabs, params);

  test("mount component", async () => {
    expect(CklVerticalTabs).toBeTruthy();
    const wrapper = getWrapper({ props: { tabs } });

    expect(wrapper.text()).toContain(
      "General InformationAccount InformationCeding Company"
    );
  });
  test("should apply classes on selected tab", async () => {
    const props = {
      tabs,
      selectedTab: "GENERAL_INFORMATION",
    };
    const wrapper = getWrapper({ props });
    const tab = wrapper.findByDataSelector("vertical-tab-GENERAL_INFORMATION");
    expect(tab.classes()).toContain("ckl-vertical-tabs__element--active");
  });
  test("should apply classes on disabled tab as boolean", async () => {
    const props = {
      tabs,
      selectedTab: "GENERAL_INFORMATION",
    };
    const wrapper = getWrapper({ props });
    const tab = wrapper.findByDataSelector("vertical-tab-CEDING_COMPANY");
    expect(tab.classes()).toContain("ckl-vertical-tabs__element--disabled");
  });
  test("should apply classes on disabled tab as function", async () => {
    const tabs = [
      {
        name: "Ceding Company",
        value: "CEDING_COMPANY",
        visible: true,
        disabled: () => true,
      },
    ];
    const wrapper = getWrapper({ props: { tabs } });
    const tab = wrapper.findByDataSelector("vertical-tab-CEDING_COMPANY");
    expect(tab.classes()).toEqual(
      expect.arrayContaining(["ckl-vertical-tabs__element--disabled"])
    );
  });
  test("should icon be visible on error tab", async () => {
    const props = {
      tabs,
      tabErrors,
    };
    const wrapper = getWrapper({ props });
    const icon = wrapper.findByDataSelector("vertical-tab-primary-icon-0");

    expect(icon.isVisible()).toBe(true);
  });
  test("should warning icon not be visible on tab", async () => {
    const props = {
      tabs,
      tabErrors,
    };
    const wrapper = getWrapper({ props });
    const icon = wrapper.findByDataSelector("vertical-tab-primary-icon-1");

    expect(icon.isVisible()).toBe(false);
  });
  describe("events", () => {
    test("should emit event on tab click", async () => {
      const wrapper = getWrapper({ props: { tabs } });
      const tab = wrapper.findByDataSelector(
        "vertical-tab-GENERAL_INFORMATION"
      );
      await tab.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("select-tab");
    });
    test("should not emit event on disabled tab click", async () => {
      const wrapper = getWrapper({ props: { tabs } });
      const tab = wrapper.findByDataSelector("vertical-tab-CEDING_COMPANY");
      await tab.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("select-tab");
    });
  });
});
