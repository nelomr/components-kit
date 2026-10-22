import fs from "node:fs";
import path from "node:path";
import { mount } from "@vue/test-utils";
import CklBarometerChart from "./ckl-barometer-chart.vue";

describe("ckl-barometer-chart.vue", () => {
  const stubs = {
    "ial-icon": true,
  };

  it("renders correctly", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 50 },
      global: { stubs },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("calculates rotation correctly for 0%", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 0 },
      global: { stubs },
    });
    const icon = wrapper.find(".ckl-barometer-chart__icon");
    expect(icon.attributes("style")).toContain(
      "--ckl-barometer-chart-arrow-rotation: -90deg"
    );
  });

  it("calculates rotation correctly for 100%", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 100 },
      global: { stubs },
    });
    const icon = wrapper.find(".ckl-barometer-chart__icon");
    expect(icon.attributes("style")).toContain(
      "--ckl-barometer-chart-arrow-rotation: 89.9deg"
    );
  });

  it("calculates rotation correctly for 50%", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 50 },
      global: { stubs },
    });
    const icon = wrapper.find(".ckl-barometer-chart__icon");
    // Highcharts pane range is -90..89.9, so 50% is slightly below 0deg (-0.05deg)
    const style = icon.attributes("style");
    const match = style.match(
      /--ckl-barometer-chart-arrow-rotation:\s*([-0-9.]+)deg/
    );
    expect(match).not.toBeNull();
    expect(Number(match[1])).toBeCloseTo(-0.05, 2);
  });

  it("clamps values below 0", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: -10 },
      global: { stubs },
    });
    const icon = wrapper.find(".ckl-barometer-chart__icon");
    expect(icon.attributes("style")).toContain(
      "--ckl-barometer-chart-arrow-rotation: -90deg"
    );
  });

  it("clamps values above 100", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 110 },
      global: { stubs },
    });
    const icon = wrapper.find(".ckl-barometer-chart__icon");
    expect(icon.attributes("style")).toContain(
      "--ckl-barometer-chart-arrow-rotation: 89.9deg"
    );
  });

  it("does not render any numeric percentage text", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 50 },
      global: { stubs },
    });
    expect(wrapper.text()).not.toContain("%");
    expect(wrapper.text()).not.toMatch(/\d/);
    expect(wrapper.find(".ckl-barometer-chart__value").exists()).toBe(false);
  });

  it("displays correct label for default ranges", async () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 10 },
      global: { stubs },
    });
    // 0-25 -> Very Low
    expect(wrapper.find(".ckl-barometer-chart__range-label").text()).toBe(
      "Very Low"
    );

    await wrapper.setProps({ percentage: 60 });
    // 50-75 -> Mid
    expect(wrapper.find(".ckl-barometer-chart__range-label").text()).toBe(
      "Mid"
    );
  });

  it("passes rotation via CSS variable to the SVG asset", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 25 },
      global: { stubs },
    });
    const icon = wrapper.find(".ckl-barometer-chart__icon");
    expect(icon.attributes("style")).toContain(
      "--ckl-barometer-chart-arrow-rotation"
    );
  });

  it("applies width responsively via the size prop", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 50, size: "320px" },
      global: { stubs },
    });
    expect(
      wrapper.find(".ckl-barometer-chart__container").attributes("style")
    ).toContain("width: 320px");
  });

  it("supports CSS-controlled arrow height and responsive SVG", () => {
    const scssPath = path.resolve(__dirname, "ckl-barometer-chart.scss");
    const scssContent = fs.readFileSync(scssPath, "utf8");
    expect(scssContent).toContain("color: var(--primary)");

    const svgPath = path.resolve(__dirname, "assets/vertical-arrow.svg");
    const svgContent = fs.readFileSync(svgPath, "utf8");

    expect(svgContent).toContain("viewBox=");
    expect(svgContent).toContain("preserveAspectRatio=");
    expect(svgContent).toContain("currentColor");
    expect(svgContent).not.toMatch(/\swidth="/);
    expect(svgContent).not.toMatch(/\sheight="/);
  });

  it("uses responsive viewport and CSS variables in the barometer SVG", () => {
    const svgPath = path.resolve(__dirname, "assets/barometer-chart.svg");
    const svgContent = fs.readFileSync(svgPath, "utf8");

    expect(svgContent).toContain("viewBox=");
    expect(svgContent).toContain("preserveAspectRatio=");
    expect(svgContent).not.toMatch(/\swidth="/);
    expect(svgContent).not.toMatch(/\sheight="/);
    expect(svgContent).toContain("var(--error-300)");
    expect(svgContent).toContain("var(--warning-300)");
    expect(svgContent).toContain("var(--success-300)");
    expect(svgContent).toContain("var(--white)");
  });

  it("ships a combined SVG with both barometer and arrow integrated", () => {
    const svgPath = path.resolve(
      __dirname,
      "assets/barometer-charter-both.svg"
    );
    const svgContent = fs.readFileSync(svgPath, "utf8");

    expect(svgContent).toContain("viewBox=");
    expect(svgContent).toContain("preserveAspectRatio=");
    // Check for the new ID structure
    expect(svgContent).toContain('id="ckl-barometer-chart-arrow-path"');
    expect(svgContent).toContain('id="ckl-barometer-chart-arrow-reference"');

    // Check for baked-in coordinates/transform-origin
    expect(svgContent).toContain('data-cx="145"');
    expect(svgContent).toContain("transform-origin: 145px 150px;");

    expect(svgContent).toContain("currentColor");
    expect(svgContent).toContain("--ckl-barometer-chart-arrow-rotation");
    expect(svgContent).toContain(
      "rotate(var(--ckl-barometer-chart-arrow-rotation"
    );
    expect(svgContent).not.toMatch(/\swidth="/);
    expect(svgContent).not.toMatch(/\sheight="/);
  });

  it("unmounts cleanly without leaving percentage artifacts in the DOM", () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 50 },
      global: { stubs },
      attachTo: document.body,
    });

    expect(document.body.textContent).not.toContain("%");
    wrapper.unmount();
    expect(document.body.textContent).not.toContain("%");
  });

  it("updates label dynamically when percentage changes", async () => {
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 90 },
      global: { stubs },
    });
    // 75-95 -> High
    expect(wrapper.find(".ckl-barometer-chart__range-label").text()).toBe(
      "High"
    );

    await wrapper.setProps({ percentage: 98 });
    // 95-100 -> Very High
    expect(wrapper.find(".ckl-barometer-chart__range-label").text()).toBe(
      "Very High"
    );
  });

  it("uses custom ranges correctly", () => {
    const customRanges = [
      { min: 0, max: 50, label: "First Half" },
      { min: 50, max: 100, label: "Second Half" },
    ];
    const wrapper = mount(CklBarometerChart, {
      props: { percentage: 75, ranges: customRanges },
      global: { stubs },
    });
    expect(wrapper.find(".ckl-barometer-chart__range-label").text()).toBe(
      "Second Half"
    );
  });
});
