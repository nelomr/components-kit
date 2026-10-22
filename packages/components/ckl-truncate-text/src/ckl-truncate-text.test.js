import { mount } from "@vue/test-utils";
import CklTruncateText from "./ckl-truncate-text.vue";

describe("ckl-truncate-text.vue", () => {
  const getWrapper = (params) => mount(CklTruncateText, params);

  test("mount component", async () => {
    expect(CklTruncateText).toBeTruthy();
    const wrapper = getWrapper();
    const truncateText = wrapper.findAll(".ckl-truncate-text");
    expect(truncateText.length).toBe(1);
  });

  test("should render full text when length is within limit", () => {
    const text = "Short text";
    const wrapper = getWrapper({
      props: {
        text,
        characterLimit: 20,
      },
    });

    expect(wrapper.text()).toBe(text);
    expect(wrapper.find(".ckl-truncate-text__ellipsis").exists()).toBe(false);
  });

  test("should truncate text when length exceeds limit", () => {
    const text = "This is a very long text that should be truncated";
    const characterLimit = 10;
    const wrapper = getWrapper({
      props: {
        text,
        characterLimit,
      },
    });

    const expectedText = text.slice(0, characterLimit);

    expect(wrapper.text()).toContain(expectedText);
    expect(wrapper.find(".ckl-truncate-text__ellipsis").exists()).toBe(true);
    expect(wrapper.find(".ckl-truncate-text__more").exists()).toBe(false);
  });

  test('should handle array of strings and truncate with "and X more"', () => {
    const text = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
    const separator = ", ";
    const characterLimit = 15;

    const wrapper = getWrapper({
      props: {
        text,
        separator,
        characterLimit,
      },
    });

    expect(wrapper.text()).toContain("Apple, Banana");
    expect(wrapper.text()).not.toContain("Cherry");
    expect(wrapper.find(".ckl-truncate-text__more").exists()).toBe(true);
    expect(wrapper.find(".ckl-truncate-text__more").text()).toBe("and 3 more");
    expect(wrapper.find(".ckl-truncate-text__ellipsis").exists()).toBe(false);
  });
});
