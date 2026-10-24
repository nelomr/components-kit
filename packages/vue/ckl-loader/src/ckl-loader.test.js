import { mount } from "@vue/test-utils";
import CklLoader from "./ckl-loader.vue";

describe("ckl-loader.vue", () => {
  const getWrapper = (params) => mount(CklLoader, params);

  test("mount component", async () => {
    expect(CklLoader).toBeTruthy();
    const wrapper = getWrapper();
    const loadingBars = wrapper.findAll(".ckl-loader__bar");
    expect(loadingBars.length).toBe(4);
  });
});
