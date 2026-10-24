import React, { useState } from "react";
import { CklSideNav } from "@components-kit/react-ckl-side-nav";
import "@components-kit/storybook-shared/styles/side-nav-themes.scss";

export default {
  title: "components/ckl-side-nav",
  component: CklSideNav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
The CklSideNav component is a flexible and customizable side navigation menu for React applications.

## Props
- \`items\` (Array, required): List of navigation items. Each item must have at least an \`id\`, \`label\`/\`text\`, and can optionally have \`icon\`, \`group\`, \`items\` (for submenus), etc.
- \`bottomItems\` (Array): List of items to display at the bottom of the menu (e.g., logout).
- \`selectedNavItem\` (String, required): The id of the currently selected navigation item.
- \`initialExtendedMenu\` (Boolean): Whether the menu starts expanded or collapsed.

## Grouping
To group items, add a \`group\` property to each item. The component will automatically render items grouped by this property.

## Submenus
To create submenus, add an \`items\` array to any item. These will be rendered as nested navigation options.

## Events / Callbacks
- \`onHandleClick\`: Called when a navigation item is clicked. The clicked item is passed as the argument.

## Theming
The component supports theming via CSS variables. You can override colors and backgrounds using your own theme classes or by changing the variables in your global styles.
        `,
      },
    },
  },
  args: {
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        text: "Dashboard",
        icon: "ial-home",
      },
      { id: "users", label: "Users", text: "Users", icon: "ial-user" },
      {
        id: "settings",
        label: "Settings",
        text: "Settings",
        icon: "ial-settings",
      },
    ],
    bottomItems: [{ id: "logout", label: "Logout", text: "Logout", icon: "ial-user" }],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
  argTypes: {
    renderExpandButton: {
      control: false,
      description: "Render prop to replace the toggle icon; receives `isExtended`",
    },
    style: {
      control: "object",
      description: "Inline styles merged after the color CSS variables",
    },
    items: {
      control: "object",
      description: "List of navigation items (id, label/text, icon, group, items for submenus)",
    },
    bottomItems: {
      control: "object",
      description: "List of navigation items pinned to bottom",
    },
    selectedNavItem: {
      control: "text",
      description: "Currently selected navigation item id",
    },
    initialExtendedMenu: {
      control: "boolean",
      description: "Initial expanded/collapsed state of the menu",
    },
    backgroundColor: {
      control: "text",
      description: "Menu background (token like `primary` or any CSS color)",
    },
    submenuBackgroundColor: {
      control: "text",
      description: "Submenu background (token or CSS color)",
    },
    iconColor: {
      control: "text",
      description: "Menu icon color. Falls back to white if equal to the background",
    },
    submenuIconColor: {
      control: "text",
      description: "Submenu icon color",
    },
    arrowColor: {
      control: "text",
      description: "Toggle and expand arrow color",
    },
    onHandleClick: { action: "onHandleClick" },
  },
};

function ControlledNav(args) {
  const [selected, setSelected] = useState(args.selectedNavItem || "dashboard");

  const handleClick = (item) => {
    setSelected(item.id);
    args.onHandleClick?.(item);
  };

  return <CklSideNav {...args} selectedNavItem={selected} onHandleClick={handleClick} />;
}

export const Primary = {
  render: (args) => (
    <div style={{ height: "100vh", background: "#f8f8f8", display: "flex" }}>
      <ControlledNav {...args} />
    </div>
  ),
};

export const WithSubItems = {
  args: {
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        text: "Dashboard",
        icon: "ial-home",
      },
      {
        id: "users",
        label: "Users",
        text: "Users",
        icon: "ial-user",
        items: [
          {
            id: "user-list",
            label: "User List",
            text: "User List",
            icon: "ial-user",
          },
          {
            id: "user-settings",
            label: "User Settings",
            text: "User Settings",
            icon: "ial-settings",
          },
        ],
      },
      {
        id: "settings",
        label: "Settings",
        text: "Settings",
        icon: "ial-settings",
        items: [
          {
            id: "profile",
            label: "Profile",
            text: "Profile",
            icon: "ial-user",
          },
          {
            id: "security",
            label: "Security",
            text: "Security",
            icon: "ial-user",
          },
        ],
      },
    ],
    bottomItems: [{ id: "logout", label: "Logout", text: "Logout", icon: "ial-user" }],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
  render: (args) => (
    <div style={{ height: "100vh", background: "#f8f8f8", display: "flex" }}>
      <ControlledNav {...args} />
    </div>
  ),
};

export const WithGroups = {
  args: {
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        text: "Dashboard",
        icon: "ial-home",
        group: "main",
      },
      {
        id: "users",
        label: "Users",
        text: "Users",
        icon: "ial-user",
        group: "main",
      },
      {
        id: "settings",
        label: "Settings",
        text: "Settings",
        icon: "ial-settings",
        group: "main",
      },
      {
        id: "profile",
        label: "Profile",
        text: "Profile",
        icon: "ial-user",
        group: "account",
      },
      {
        id: "security",
        label: "Security",
        text: "Security",
        icon: "ial-user",
        group: "account",
      },
    ],
    bottomItems: [{ id: "logout", label: "Logout", text: "Logout", icon: "ial-user" }],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
  render: (args) => (
    <div style={{ height: "100vh", background: "#f8f8f8", display: "flex" }}>
      <ControlledNav {...args} />
    </div>
  ),
};

export const LightTheme = {
  args: {
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        text: "Dashboard",
        icon: "ial-home",
      },
      { id: "users", label: "Users", text: "Users", icon: "ial-user" },
      {
        id: "settings",
        label: "Settings",
        text: "Settings",
        icon: "ial-settings",
      },
    ],
    bottomItems: [{ id: "logout", label: "Logout", text: "Logout", icon: "ial-user" }],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
  render: (args) => (
    <div className="ckl-side-nav-theme-light" style={{ height: "100vh", display: "flex" }}>
      <ControlledNav {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#f8f8f8" }],
    },
  },
};

export const DarkTheme = {
  args: {
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        text: "Dashboard",
        icon: "ial-home",
      },
      { id: "users", label: "Users", text: "Users", icon: "ial-user" },
      {
        id: "settings",
        label: "Settings",
        text: "Settings",
        icon: "ial-settings",
      },
    ],
    bottomItems: [{ id: "logout", label: "Logout", text: "Logout", icon: "ial-user" }],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
  render: (args) => (
    <div className="ckl-side-nav-theme-dark" style={{ height: "100vh", display: "flex" }}>
      <ControlledNav {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#222" }],
    },
  },
};
