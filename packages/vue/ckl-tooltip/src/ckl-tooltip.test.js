import { mount } from "@vue/test-utils";
import CklTooltip from "./ckl-tooltip.vue";
import { nextTick } from "vue";

describe("ckl-tooltip.vue", () => {
  const getWrapper = (params) => mount(CklTooltip, params);
  const triggerElem = "tooltip trigger";
  const text = "tooltip text";
  test("mount component", async () => {
    expect(CklTooltip).toBeTruthy();
    const wrapper = getWrapper({
      props: { text: text },
      slots: { default: triggerElem },
    });
    expect(wrapper.text()).toContain("tooltip text");
  });
  describe("state", () => {
    test("should apply default props values", async () => {
      const wrapper = getWrapper({
        props: {},
        slots: { default: triggerElem },
      });
      const props = wrapper.props();
      expect(props.visible).toBe(false);
      expect(props.disabled).toBe(false);
      expect(props.text).toBe("");
      expect(props.color).toBe("primary");
      expect(props.position).toBe("bottom");
      expect(props.trigger).toBe("hover");
      expect(props.noPadding).toBe(false);
      expect(props.attachToBody).toBe(false);
      expect(props.inBodyClass).toBe("");
    });
    test("should apply color classes", async () => {
      const wrapper = getWrapper({
        props: {
          color: "success",
          text: text,
        },
        slots: { default: triggerElem },
      });
      const tooltip = wrapper.get(".ckl-tooltip__container");
      expect(tooltip.classes()).toContain("ckl-tooltip__container--color-success");
    });
    test("should apply position classes", async () => {
      const wrapper = getWrapper({
        props: {
          position: "left",
        },
        slots: { default: triggerElem },
      });
      const tooltip = wrapper.get(".ckl-tooltip__container");
      expect(tooltip.classes()).toContain("ckl-tooltip__container--position-left");
    });
    test("should show text prop value", async () => {
      const wrapper = getWrapper({
        props: {
          text: text,
        },
        slots: { default: triggerElem },
      });
      const tooltip = wrapper.get(".ckl-tooltip__container");
      expect(tooltip.text()).toContain("tooltip text");
    });
    test("should apply no-padding classess", async () => {
      const wrapper = getWrapper({
        props: {
          text: text,
          noPadding: true,
        },
        slots: { default: triggerElem },
      });
      const tooltip = wrapper.get(".ckl-tooltip__container");
      expect(tooltip.classes()).toContain("ckl-tooltip__container--no-padding");
    });
  });
  describe("events", () => {
    describe("hover trigger", () => {
      test("should show tooltip on mouseover", async () => {
        const wrapper = getWrapper({
          props: { text: "tooltip text" },
          slots: { default: triggerElem },
        });
        await wrapper.trigger("mouseover");
        const tooltip = wrapper.get(".ckl-tooltip__container");
        expect(tooltip.classes()).toContain("ckl-tooltip__container--visible");
      });
      test("should hide tooltip on mouseleave", async () => {
        const wrapper = getWrapper({
          props: { text: "tooltip text" },
          slots: { default: triggerElem },
        });
        await wrapper.trigger("mouseover");
        const tooltip = wrapper.get(".ckl-tooltip__container");
        expect(tooltip.classes()).toContain("ckl-tooltip__container--visible");
        await wrapper.trigger("mouseleave");
        expect(tooltip.classes()).not.toContain("ckl-tooltip__container--visible");
      });
    });
    describe("click trigger", () => {
      test("should show tooltip on click", async () => {
        const wrapper = getWrapper({
          props: { text: "tooltip text", trigger: "click" },
          slots: { default: triggerElem },
        });
        await wrapper.trigger("click");
        const tooltip = wrapper.get(".ckl-tooltip__container");
        expect(tooltip.classes()).toContain("ckl-tooltip__container--visible");
      });
      test("should hide tooltip on click outside", async () => {
        const wrapper = getWrapper({
          props: { text: "tooltip text", trigger: "click" },
          slots: { default: triggerElem },
        });
        await wrapper.trigger("click");
        const tooltip = wrapper.get(".ckl-tooltip__container");
        expect(tooltip.classes()).toContain("ckl-tooltip__container--visible");
        window.document.body.click();
        await nextTick();
        expect(tooltip.classes()).not.toContain("ckl-tooltip__container--visible");
        expect(wrapper.emitted()).toHaveProperty("click-outside");
      });
    });
    describe("manual trigger", () => {
      test("should show and hide tooltip with visible prop", async () => {
        const wrapper = getWrapper({
          props: { text: "tooltip text", trigger: "manual" },
          slots: { default: triggerElem },
        });
        await wrapper.trigger("click");
        await wrapper.trigger("hover");
        const tooltip = wrapper.get(".ckl-tooltip__container");
        expect(tooltip.classes()).not.toContain("ckl-tooltip__container--visible");
        await wrapper.setProps({
          visible: true,
        });
        expect(tooltip.classes()).toContain("ckl-tooltip__container--visible");
        await wrapper.setProps({
          visible: false,
        });
        expect(tooltip.classes()).not.toContain("ckl-tooltip__container--visible");
      });
    });
    describe("attach-to-body", () => {
      test("should not set inline styles if is disabled", async () => {
        const wrapper = getWrapper({
          props: { text: "tooltip text", inBodyClass: "body-tooltip" },
          slots: { default: triggerElem },
        });
        await wrapper.trigger("mouseover");
        const tooltip = wrapper.get(".ckl-tooltip__container");
        const styles = tooltip.element.style;
        expect(styles.length).toBe(0);
      });
    });
    describe("attach-to-body", () => {
      test("should exist in the body", async () => {
        const wrapper = getWrapper({
          props: {
            text: "tooltip text",
            attachToBody: true,
            inBodyClass: "body-tooltip",
          },
          slots: { default: triggerElem },
        });
        await wrapper.trigger("mouseover");
        const tooltip = document.querySelector(".body-tooltip");
        expect(tooltip).toBeTruthy();
      });
      test("should set position styles if is enabled", async () => {
        const wrapper = getWrapper({
          props: { text: "tooltip text", attachToBody: true },
          slots: { default: triggerElem },
        });
        await wrapper.trigger("mouseover");
        const tooltip = document.querySelector(".ckl-tooltip__container");
        const styles = tooltip.getAttribute("style");
        expect(styles).toContain("top");
        expect(styles).toContain("left");
      });
    });
  });
});
