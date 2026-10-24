import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { CklCarousel } from "./ckl-carousel.jsx";

describe("CklCarousel (React)", () => {
  const defaultProps = {
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
      { id: 5, name: "Item 5" },
    ],
    itemWidth: 200,
    gap: 16,
  };

  it("renders correctly", () => {
    const { container } = render(<CklCarousel {...defaultProps} />);
    expect(container.querySelector(".ckl-carousel")).toBeTruthy();
  });

  it("renders the correct number of slides", () => {
    const { container } = render(<CklCarousel {...defaultProps} />);
    const slides = container.querySelectorAll(".ckl-carousel__slide");
    expect(slides.length).toBe(defaultProps.items.length);
  });

  it("renders slot content correctly", () => {
    const { container } = render(
      <CklCarousel
        {...defaultProps}
        renderSlide={(item) => <div className="custom-slide">{item.name}</div>}
      />,
    );
    const custom = container.querySelector(".custom-slide");
    expect(custom).toBeTruthy();
    expect(custom.textContent).toBe("Item 1");
  });

  it("applies itemWidth and gap styles", () => {
    const { container } = render(<CklCarousel {...defaultProps} />);
    const slides = container.querySelectorAll(".ckl-carousel__slide");
    const firstSlide = slides[0];

    expect(firstSlide.getAttribute("style")).toContain(`width: ${defaultProps.itemWidth}px`);
    expect(firstSlide.getAttribute("style")).toContain(`margin-right: ${defaultProps.gap}px`);

    const lastSlide = slides[slides.length - 1];
    expect(lastSlide.getAttribute("style")).toContain("margin-right: 0");
  });

  it("shows navigation controls when needed", () => {
    const ref = createRef();
    const { container } = render(<CklCarousel ref={ref} {...defaultProps} />);
    // Mock offsetWidth to 500
    Object.defineProperty(container.querySelector(".ckl-carousel__container"), "offsetWidth", {
      configurable: true,
      value: 500,
    });
    act(() => {
      ref.current.updateVisibleSlides();
    });

    const buttons = container.querySelectorAll(".ckl-carousel__btn");
    expect(buttons.length).toBe(2);
  });

  it("hides navigation controls when all items fit", () => {
    const ref = createRef();
    const fewItems = [
      { id: 1, name: "1" },
      { id: 2, name: "2" },
    ];
    const { container } = render(<CklCarousel ref={ref} {...defaultProps} items={fewItems} />);
    Object.defineProperty(container.querySelector(".ckl-carousel__container"), "offsetWidth", {
      configurable: true,
      value: 2000,
    });
    act(() => {
      ref.current.updateVisibleSlides();
    });

    const buttons = container.querySelectorAll(".ckl-carousel__btn");
    expect(buttons.length).toBe(0);
  });

  it("navigates next and previous", async () => {
    const ref = createRef();
    const { container } = render(<CklCarousel ref={ref} {...defaultProps} />);
    Object.defineProperty(container.querySelector(".ckl-carousel__container"), "offsetWidth", {
      configurable: true,
      value: 500,
    });
    act(() => {
      ref.current.updateVisibleSlides();
    });

    expect(ref.current.currentIndex).toBe(0);
    const prevBtn = container.querySelector(".ckl-carousel__btn--prev");
    const nextBtn = container.querySelector(".ckl-carousel__btn--next");

    expect(prevBtn.className).toContain("ckl-carousel__btn--disabled");
    expect(nextBtn.className).not.toContain("ckl-carousel__btn--disabled");

    act(() => {
      fireEvent.click(nextBtn);
    });
    expect(ref.current.currentIndex).toBe(1);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 310));
    });

    expect(prevBtn.className).not.toContain("ckl-carousel__btn--disabled");

    act(() => {
      fireEvent.click(prevBtn);
    });
    expect(ref.current.currentIndex).toBe(0);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 310));
    });
  });

  it("respects visibleItems prop", () => {
    const visibleItems = 3;
    const { container } = render(<CklCarousel {...defaultProps} visibleItems={visibleItems} />);
    const containerDiv = container.querySelector(".ckl-carousel__container");
    const expectedWidth =
      visibleItems * defaultProps.itemWidth + (visibleItems - 1) * defaultProps.gap;
    expect(containerDiv.getAttribute("style")).toContain(`width: ${expectedWidth}px`);
  });

  it("emits onChange / onUpdateModelValue on navigation", () => {
    const ref = createRef();
    const handleChange = vi.fn();
    const { container } = render(
      <CklCarousel ref={ref} {...defaultProps} onChange={handleChange} />,
    );
    Object.defineProperty(container.querySelector(".ckl-carousel__container"), "offsetWidth", {
      configurable: true,
      value: 500,
    });
    act(() => {
      ref.current.updateVisibleSlides();
    });

    const nextBtn = container.querySelector(".ckl-carousel__btn--next");
    act(() => {
      fireEvent.click(nextBtn);
    });

    expect(handleChange).toHaveBeenCalledWith(1);
  });
});
