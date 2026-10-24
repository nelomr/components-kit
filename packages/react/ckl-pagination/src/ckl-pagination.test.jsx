import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CklPagination } from "./ckl-pagination.jsx";

describe("ckl-pagination.jsx (React)", () => {
  test("mount component", () => {
    expect(CklPagination).toBeTruthy();
    const { container } = render(<CklPagination numPages={10} current={1} />);
    expect(container.querySelector(".ckl-pagination")).toBeTruthy();
  });

  describe("state", () => {
    test("should display two arrow buttons", () => {
      const { container } = render(<CklPagination numPages={10} current={1} />);
      const prev = container.querySelector(".ckl-pagination__btn-prev");
      const next = container.querySelector(".ckl-pagination__btn-next");
      expect(prev).toBeTruthy();
      expect(next).toBeTruthy();
    });

    test("should display prev arrow disabled when at first page", () => {
      const { container } = render(<CklPagination numPages={10} current={1} />);
      const prev = container.querySelector(".ckl-pagination__btn-prev");
      expect(prev.className).toContain("ckl-pagination__btn--disabled");
    });

    test("should display next arrow disabled when at last page", () => {
      const { container } = render(<CklPagination numPages={10} current={10} />);
      const next = container.querySelector(".ckl-pagination__btn-next");
      expect(next.className).toContain("ckl-pagination__btn--disabled");
    });

    test("should display 7 items when there is more than 5 pages", () => {
      const { container } = render(<CklPagination numPages={10} current={5} />);
      const items = container.querySelectorAll(".ckl-pagination__list-item");
      expect(items.length).toBe(7);
    });

    test("should display 5 items when total pages are 5", () => {
      const { container } = render(<CklPagination numPages={5} current={1} />);
      const items = container.querySelectorAll(".ckl-pagination__list-item");
      expect(items.length).toBe(5);
    });

    test("should display three dots before last number if current range is at start", () => {
      const { container } = render(<CklPagination numPages={10} current={1} />);
      const items = container.querySelectorAll(".ckl-pagination__list-item");
      expect(items[items.length - 2].textContent.trim()).toBe("...");
    });

    test("should display selected page active", () => {
      const { container } = render(<CklPagination numPages={10} current={3} />);
      const active = container.querySelector(".ckl-pagination__list-item--active");
      expect(active.textContent.trim()).toBe("3");
    });
  });

  describe("events", () => {
    test("should emit event on page click", () => {
      const handlePage = vi.fn();
      const { container } = render(
        <CklPagination numPages={5} current={1} onPageUpdated={handlePage} />,
      );
      const items = container.querySelectorAll(".ckl-pagination__list-item");
      fireEvent.click(items[1]);
      expect(handlePage).toHaveBeenCalledWith(2);
    });

    test("should emit event on arrow click", () => {
      const handlePage = vi.fn();
      const { container } = render(
        <CklPagination numPages={5} current={2} onPageUpdated={handlePage} />,
      );
      const next = container.querySelector(".ckl-pagination__btn-next");
      fireEvent.click(next);
      expect(handlePage).toHaveBeenCalledWith(3);
    });

    test("should not emit event on arrow when disabled", () => {
      const handlePage = vi.fn();
      const { container } = render(
        <CklPagination numPages={5} current={1} onPageUpdated={handlePage} />,
      );
      const prev = container.querySelector(".ckl-pagination__btn-prev");
      fireEvent.click(prev);
      expect(handlePage).not.toHaveBeenCalled();
    });

    test("should not emit event when clicking on three dots", () => {
      const handlePage = vi.fn();
      const { container } = render(
        <CklPagination numPages={10} current={1} onPageUpdated={handlePage} />,
      );
      const items = container.querySelectorAll(".ckl-pagination__list-item");
      fireEvent.click(items[items.length - 2]); // the dots
      expect(handlePage).not.toHaveBeenCalled();
    });
  });
});
