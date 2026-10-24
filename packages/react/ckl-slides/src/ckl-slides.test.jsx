import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CklSlides } from "./ckl-slides.jsx";

describe("ckl-slides.jsx (React)", () => {
  const slides = ["one", "two", "three"];
  const selected = "one";

  test("mount component", () => {
    expect(CklSlides).toBeTruthy();
    const { container } = render(<CklSlides slides={slides} selected={selected} />);
    expect(container.querySelector(".ckl-slides")).toBeTruthy();
  });

  describe("state", () => {
    test("should display bullets depending in slides size", () => {
      const { container } = render(<CklSlides slides={slides} selected={selected} />);
      const bullets = container.querySelectorAll(".ckl-slides__bullet");
      expect(bullets.length).toEqual(3);
    });

    test("should display two arrows", () => {
      const { container } = render(<CklSlides slides={slides} selected={selected} />);
      const arrows = container.querySelectorAll(".ckl-slides__arrow");
      expect(arrows.length).toEqual(2);
    });

    test("should mark selected bullet slide", () => {
      const { container } = render(<CklSlides slides={slides} selected={selected} />);
      const bullets = container.querySelectorAll(".ckl-slides__bullet");
      expect(bullets[0].className).toContain("ckl-slides__bullet--active");
      expect(bullets[1].className).not.toContain("ckl-slides__bullet--active");
      expect(bullets[2].className).not.toContain("ckl-slides__bullet--active");
    });

    test("should disable prev arrow if selected slide is the first", () => {
      const { container } = render(<CklSlides slides={slides} selected={selected} />);
      const arrowBack = container.querySelector(".ckl-slides__arrow--back");
      expect(arrowBack.className).toContain("ial-icon--disabled");
      const arrowNext = container.querySelector(".ckl-slides__arrow--next");
      expect(arrowNext.className).not.toContain("ial-icon--disabled");
    });

    test("should disable next arrow if selected slide is the last", () => {
      const { container } = render(<CklSlides slides={slides} selected="three" />);
      const arrowBack = container.querySelector(".ckl-slides__arrow--back");
      expect(arrowBack.className).not.toContain("ial-icon--disabled");
      const arrowNext = container.querySelector(".ckl-slides__arrow--next");
      expect(arrowNext.className).toContain("ial-icon--disabled");
    });
  });

  describe("events", () => {
    test("should emit select slide on bullet click", () => {
      const handleSelect = vi.fn();
      const { container } = render(
        <CklSlides slides={slides} selected={selected} onSelectSlide={handleSelect} />,
      );
      const bullets = container.querySelectorAll(".ckl-slides__bullet");
      fireEvent.click(bullets[0]);
      expect(handleSelect).toHaveBeenCalledWith("one");
    });

    test("should emit select slide on next arrow click", () => {
      const handleSelect = vi.fn();
      const { container } = render(
        <CklSlides slides={slides} selected={selected} onSelectSlide={handleSelect} />,
      );
      const arrowNext = container.querySelector(".ckl-slides__arrow--next");
      fireEvent.click(arrowNext);
      expect(handleSelect).toHaveBeenCalledWith("two");
    });

    test("should not emit select slide on next arrow disabled click", () => {
      const handleSelect = vi.fn();
      const { container } = render(
        <CklSlides slides={slides} selected="three" onSelectSlide={handleSelect} />,
      );
      const arrowNext = container.querySelector(".ckl-slides__arrow--next");
      fireEvent.click(arrowNext);
      expect(handleSelect).not.toHaveBeenCalled();
    });

    test("should emit select slide on previous arrow click", () => {
      const handleSelect = vi.fn();
      const { container } = render(
        <CklSlides slides={slides} selected="two" onSelectSlide={handleSelect} />,
      );
      const arrowBack = container.querySelector(".ckl-slides__arrow--back");
      fireEvent.click(arrowBack);
      expect(handleSelect).toHaveBeenCalledWith("one");
    });

    test("should not emit select slide on prev arrow disabled click", () => {
      const handleSelect = vi.fn();
      const { container } = render(
        <CklSlides slides={slides} selected="one" onSelectSlide={handleSelect} />,
      );
      const arrowBack = container.querySelector(".ckl-slides__arrow--back");
      fireEvent.click(arrowBack);
      expect(handleSelect).not.toHaveBeenCalled();
    });
  });
});
