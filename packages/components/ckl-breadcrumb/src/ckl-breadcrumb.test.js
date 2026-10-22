import { mount } from "@vue/test-utils";
import CklBreadcrumb from "./ckl-breadcrumb.vue";

describe("ckl-breadcrumb.vue", () => {
  const path = [
    {
      name: "home",
      text: "home",
      params: {
        id: "1",
      },
    },
    {
      name: "detail",
      text: "detail",
      params: {
        id: "2",
      },
    },
    {
      name: "contact",
      text: "contact",
      params: {
        id: "3",
      },
    },
  ];

  const getWrapper = (params) => mount(CklBreadcrumb, params);

  test("mount component", async () => {
    expect(CklBreadcrumb).toBeTruthy();
    const wrapper = getWrapper({ props: { path } });
    expect(wrapper.text()).toContain("home / detail / contact");
  });
  describe("state", () => {
    test("should render text as function", async () => {
      const path = [
        {
          name: "home",
          text: () => "home",
          params: {
            id: "1",
          },
        },
      ];
      const wrapper = getWrapper({ props: { path } });
      expect(wrapper.text()).toContain("home");
    });
  });
  describe("events", () => {
    test("should emit event on click", async () => {
      const wrapper = getWrapper({ props: { path } });
      const breadcrumbWrapper = wrapper.find(".ckl-breadcrumb");
      await breadcrumbWrapper.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("click");
    });
  });
});
