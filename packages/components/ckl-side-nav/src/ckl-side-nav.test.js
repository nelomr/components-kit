import { mount } from "@vue/test-utils";
import CklSideNav from "./ckl-side-nav.vue";

describe("ckl-side-nav.vue", () => {
  const items = [
    {
      label: "home",
      href: "/",
      id: "HOME",
      icon: {
        icon: "ial-arrow-down",
        text: "icon-download",
        selector: "icon-download",
      },
      disabled: false,
      text: "Home",
      schema: [
        {
          id: "SUB_HOME",
          label: "Sub home",
          href: "/sub-home",
          disabled: true,
          text: "Sub Home",
        },
      ],
    },
    {
      label: "about",
      id: "ABOUT",
      href: "/about",
      icon: {
        icon: "ial-arrow-down",
        text: "icon-download",
        selector: "icon-download",
      },
      text: "About",
    },
  ];

  const bottomItems = [
    {
      id: "ADMIN",
      label: "admin",
      href: "/admin",
      icon: {
        icon: "ial-arrow-down",
        text: "icon-download",
        selector: "icon-download",
        locationTooltip: "left",
      },
      visible: true,
      disabled: true,
      text: "Admin",
    },
  ];

  const selectedNavItem = "HOME";

  const getWrapper = (params) => mount(CklSideNav, params);

  test("mount component", async () => {
    expect(CklSideNav).toBeTruthy();
    const wrapper = getWrapper({ props: { items, selectedNavItem } });
    expect(wrapper.text()).toContain("HomeAbout");
  });
  test("should apply classes on selected item", async () => {
    const wrapper = getWrapper({ props: { items, selectedNavItem } });
    const menuItem = wrapper.findByDataSelector(
      "ckl-nav-item-menu-item-no-group-0"
    );
    expect(menuItem.classes()).toContain("ckl-side-nav-item--active");
  });
  test("should have submenu items visible", async () => {
    const wrapper = getWrapper({ props: { items, selectedNavItem } });
    const openMenuItem = await wrapper.findByDataSelector(
      "ckl-side-nav-toggle-button"
    );
    await openMenuItem.trigger("click");
    const menuItem = await wrapper.findByDataSelector(
      "ckl-nav-item-menu-item-no-group-0",
      ".ial-icon"
    );
    await menuItem.trigger("click");
    expect(menuItem.isVisible()).toBe(true);
  });
  test("should apply classes on disabled tab as boolean", async () => {
    const wrapper = getWrapper({
      props: { items, bottomItems, selectedNavItem },
    });
    const menuItem = wrapper.findByDataSelector(
      "ckl-nav-item-bottom-menu-item-no-group-0"
    );
    expect(menuItem.classes()).toContain("ckl-side-nav-item--disabled");
  });
  test("should apply classes on grouped", async () => {
    const itemsGrouped = [
      {
        label: "home",
        href: "/",
        id: "HOME",
        icon: {
          icon: "ial-arrow-down",
          text: "icon-download",
          selector: "icon-download",
        },
        disabled: false,
        text: "Home",
        schema: [
          {
            id: "SUB_HOME",
            label: "Sub home",
            href: "/sub-home",
            disabled: true,
            text: "Sub Home",
          },
        ],
      },
      {
        label: "grouped-1",
        href: "/",
        group: "items-grouped",
        id: "GROUPED1",
        icon: {
          icon: "ial-arrow-down",
          text: "icon-download",
          selector: "icon-download",
        },
      },
      {
        label: "grouped-2",
        href: "/",
        group: "items-grouped",
        id: 'GROUPED2"',
        icon: {
          icon: "ial-arrow-down",
          text: "icon-download",
          selector: "icon-download",
        },
      },
    ];

    const wrapper = getWrapper({
      props: { items: itemsGrouped, bottomItems, selectedNavItem },
    });
    const menuItem = wrapper.findByDataSelector(
      "ckl-nav-item-menu-item-items-grouped-0"
    );
    expect(menuItem.exists()).toBe(true);
  });
  test("should apply classes on disabled tab as function", async () => {
    const bottomItemsFunction = [
      {
        id: "ADMIN",
        label: "admin",
        href: "/admin",
        icon: {
          icon: "ial-arrow-down",
          text: "icon-download",
          selector: "icon-download",
          locationTooltip: "left",
        },
        visible: true,
        disabled: () => {
          return true;
        },
        text: "Admin",
      },
    ];
    const wrapper = getWrapper({
      props: { items, bottomItems: bottomItemsFunction, selectedNavItem },
    });
    const menuItem = wrapper.findByDataSelector(
      "ckl-nav-item-bottom-menu-item-no-group-0"
    );
    expect(menuItem.classes()).toContain("ckl-side-nav-item--disabled");
  });
  describe("events", () => {
    test("should emit event on item click", async () => {
      const wrapper = getWrapper({ props: { items, selectedNavItem } });
      const menuItem = wrapper.findByDataSelector(
        "ckl-nav-item-menu-item-no-group-0",
        ".ckl-side-nav-item__link"
      );
      await menuItem.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("handle-click");
    });
    test("should not emit event on disabled item click", async () => {
      const itemsDisabled = [
        {
          disabled: true,
          label: "home",
          href: "/",
          id: "HOME",
          icon: {
            icon: "ial-arrow-down",
            text: "icon-download",
            selector: "icon-download",
          },
          text: "Home",
        },
        {
          label: "about",
          id: "ABOUT",
          href: "/about",
          icon: {
            icon: "ial-arrow-down",
            text: "icon-download",
            selector: "icon-download",
          },
          text: "About",
        },
      ];

      const selectedNavItem = "ABOUT";

      const wrapper = getWrapper({
        props: { items: itemsDisabled, selectedNavItem },
      });
      const menuItem = wrapper.findByDataSelector(
        "ckl-nav-item-menu-item-no-group-0",
        ".ckl-side-nav-item__link"
      );
      await menuItem.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("handle-click");
    });
  });
});
