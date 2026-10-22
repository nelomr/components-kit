import { CklSideNav } from "@components-kit/ckl-side-nav/src";
import "./side-nav-themes.scss";

export default {
  title: "components/ckl-side-nav",
  component: CklSideNav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
The CklSideNav component is a flexible and customizable side navigation menu for Vue 3 applications.

## Props
- \`items\` (Array, required): List of navigation items. Each item must have at least an \`id\`, \`label\`/\`text\`, and can optionally have \`icon\`, \`group\`, \`items\` (for submenus), etc.
- \`bottomItems\` (Array): List of items to display at the bottom of the menu (e.g., logout).
- \`selectedNavItem\` (String, required): The id of the currently selected navigation item.
- \`initialExtendedMenu\` (Boolean): Whether the menu starts expanded or collapsed.

## Grouping
To group items, add a \`group\` property to each item. The component will automatically render items grouped by this property.

## Submenus
To create submenus, add an \`items\` array to any item. These will be rendered as nested navigation options.

## Events
- \`handle-click\`: Emitted when a navigation item is clicked. The clicked item is passed as the event payload.

## Theming
The component supports theming via CSS variables. You can override colors and backgrounds using your own theme classes or by changing the variables in your global styles.

## Usage Example
\`\`\`vue
<ckl-side-nav
  :items="items"
  :bottom-items="bottomItems"
  :selected-nav-item="selectedNavItem"
  :initial-extended-menu="false"
  @handle-click="onNavClick"
/>
\`\`\`
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
    bottomItems: [
      { id: "logout", label: "Logout", text: "Logout", icon: "ial-user" },
    ],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
  argTypes: {
    items: {
      control: "object",
      description:
        "List of navigation items (id, label/text, icon, group, items for submenus)",
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
    "handle-click": { action: "handle-click" },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklSideNav },
    setup() {
      return { args };
    },
    template: `
  <div style="height: 100vh; background: #f8f8f8;">
    <ckl-side-nav 
      v-bind="args" 
      @handle-click="(item) => { args.selectedNavItem = item.id; args['handle-click']?.(item); }" 
    />
  </div>
`,
  }),
};

export const WithSubItems = {
  render: (args) => ({
    components: { CklSideNav },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; background: #f8f8f8;">
        <ckl-side-nav 
          v-bind="args" 
          @handle-click="(item) => { args.selectedNavItem = item.id; args['handle-click']?.(item); }" 
        />
      </div>
    `,
  }),
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
    bottomItems: [
      { id: "logout", label: "Logout", text: "Logout", icon: "ial-user" },
    ],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
};

export const WithGroups = {
  render: (args) => ({
    components: { CklSideNav },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; background: #f8f8f8;">
        <ckl-side-nav 
          v-bind="args" 
          @handle-click="(item) => { args.selectedNavItem = item.id; args['handle-click']?.(item); }" 
        />
      </div>
    `,
  }),
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
    bottomItems: [
      { id: "logout", label: "Logout", text: "Logout", icon: "ial-user" },
    ],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
};

export const LightTheme = {
  render: (args) => ({
    components: { CklSideNav },
    setup() {
      return { args };
    },
    template: `
      <div class="ckl-side-nav-theme-light" style="height: 100vh;">
        <ckl-side-nav 
          v-bind="args" 
          @handle-click="(item) => { args.selectedNavItem = item.id; args['handle-click']?.(item); }" 
        />
      </div>
    `,
  }),
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
    bottomItems: [
      { id: "logout", label: "Logout", text: "Logout", icon: "ial-user" },
    ],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
};
LightTheme.parameters = {
  backgrounds: {
    default: "light",
    values: [{ name: "light", value: "#f8f8f8" }],
  },
};

export const DarkTheme = {
  render: (args) => ({
    components: { CklSideNav },
    setup() {
      return { args };
    },
    template: `
      <div class="ckl-side-nav-theme-dark" style="height: 100vh;">
        <ckl-side-nav 
          v-bind="args" 
          @handle-click="(item) => { args.selectedNavItem = item.id; args['handle-click']?.(item); }" 
        />
      </div>
    `,
  }),
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
    bottomItems: [
      { id: "logout", label: "Logout", text: "Logout", icon: "ial-user" },
    ],
    selectedNavItem: "dashboard",
    initialExtendedMenu: false,
  },
};
DarkTheme.parameters = {
  backgrounds: { default: "light", values: [{ name: "dark", value: "#222" }] },
};
