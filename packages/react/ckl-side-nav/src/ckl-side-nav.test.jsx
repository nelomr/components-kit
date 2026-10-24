import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CklSideNav } from "./ckl-side-nav.jsx";

describe("ckl-side-nav.jsx (React)", () => {
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
      },
      visible: true,
      disabled: true,
      text: "Admin",
    },
  ];

  const selectedNavItem = "HOME";

  test("mount component", () => {
    expect(CklSideNav).toBeTruthy();
    const { container } = render(<CklSideNav items={items} selectedNavItem={selectedNavItem} />);
    expect(container.textContent).toContain("Home");
    expect(container.textContent).toContain("About");
  });

  test("should apply classes on selected item", () => {
    const { container } = render(<CklSideNav items={items} selectedNavItem={selectedNavItem} />);
    const menuItem = container.querySelector('[data-selector="ckl-nav-item-menu-item-no-group-0"]');
    expect(menuItem.className).toContain("ckl-side-nav-item--active");
  });

  test("should have submenu items visible when extended and toggled", () => {
    const { container } = render(<CklSideNav items={items} selectedNavItem={selectedNavItem} />);
    const toggleButton = container.querySelector('[data-selector="ckl-side-nav-toggle-button"]');
    fireEvent.click(toggleButton);

    const submenuIcon = container.querySelector(".ckl-side-nav-item__submenu-icon");
    expect(submenuIcon).toBeTruthy();
    fireEvent.click(submenuIcon);

    const subItem = container.querySelector('[data-selector="ckl-nav-item-subitem-SUB_HOME"]');
    expect(subItem).toBeTruthy();
  });

  test("should apply classes on disabled tab as boolean", () => {
    const { container } = render(
      <CklSideNav items={items} bottomItems={bottomItems} selectedNavItem={selectedNavItem} />,
    );
    const menuItem = container.querySelector(
      '[data-selector="ckl-nav-item-bottom-menu-item-no-group-0"]',
    );
    expect(menuItem.className).toContain("ckl-side-nav-item--disabled");
  });

  describe("events", () => {
    test("should emit event on item click", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <CklSideNav items={items} selectedNavItem="OTHER" onHandleClick={handleClick} />,
      );
      const link = container.querySelector(
        '[data-selector="ckl-nav-item-menu-item-no-group-0"] .ckl-side-nav-item__link',
      );
      fireEvent.click(link);
      expect(handleClick).toHaveBeenCalledWith(items[0]);
    });

    test("should not emit event on disabled item click", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <CklSideNav
          items={items}
          bottomItems={bottomItems}
          selectedNavItem="OTHER"
          onHandleClick={handleClick}
        />,
      );
      const link = container.querySelector(
        '[data-selector="ckl-nav-item-bottom-menu-item-no-group-0"] .ckl-side-nav-item__link',
      );
      fireEvent.click(link);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
