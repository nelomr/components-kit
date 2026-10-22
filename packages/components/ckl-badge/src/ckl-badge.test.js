import { mount } from "@vue/test-utils";
import CklBadge from "./ckl-badge.vue";

describe("ckl-badge.vue", () => {
  const colors = {
    primary: "primary",
    secondary: "secondary",
    error: "error",
    success: "success",
    warning: "warning",
    info: "info",
    purple: "purple",
    midBlue: "mid-blue",
    transparent: "transparent",
  };

  const sizes = {
    large: "large",
    medium: "medium",
    small: "small",
    xSmall: "x-small",
  };
  const shapes = {
    square: "square",
    oval: "oval",
    circle: "circle",
  };

  const getWrapper = (params) => mount(CklBadge, params);

  test("mount component default values", async () => {
    expect(CklBadge).toBeTruthy();
    const wrapper = getWrapper({});
    expect(wrapper.classes()).toContain("ckl-badge--color-primary");
    expect(wrapper.classes()).toContain("ckl-badge--size-large");
    expect(wrapper.classes()).toContain("ckl-badge--shape-oval");
  });

  test("mount component with primary color, large size, square shape and outlined", async () => {
    expect(CklBadge).toBeTruthy();
    const wrapper = getWrapper({
      props: {
        color: colors.primary,
        size: sizes.large,
        shape: shapes.square,
        outlined: true,
      },
    });
    expect(wrapper.classes()).toContain("ckl-badge--color-primary");
    expect(wrapper.classes()).toContain("ckl-badge--size-large");
    expect(wrapper.classes()).toContain("ckl-badge--shape-square");
    expect(wrapper.classes()).toContain("ckl-badge--color-primary-outlined");
  });

  test("mount component with secondary color, medium size, oval shape and not outlined", async () => {
    expect(CklBadge).toBeTruthy();
    const wrapper = getWrapper({
      props: {
        color: colors.secondary,
        size: sizes.medium,
        shape: shapes.oval,
        outlined: false,
      },
    });
    expect(wrapper.classes()).toContain("ckl-badge--color-secondary");
    expect(wrapper.classes()).toContain("ckl-badge--size-medium");
    expect(wrapper.classes()).toContain("ckl-badge--shape-oval");
  });
});
