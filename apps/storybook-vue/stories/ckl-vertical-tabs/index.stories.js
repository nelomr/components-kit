import { CklVerticalTabs } from "@components-kit/vue-ckl-vertical-tabs";

export default {
  title: "components/ckl-vertical-tabs",
  component: CklVerticalTabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    tabs: [
      { value: "profile", name: "Profile Information" },
      { value: "security", name: "Security & 2FA" },
      { value: "billing", name: "Billing & Plans" },
      { value: "notifications", name: "Notification Preferences" },
      { value: "advanced", name: "Advanced Settings", disabled: true },
    ],
    selectedTab: "profile",
  },
  argTypes: {
    tabErrors: {
      control: "object",
      description: "Object keyed by tab value; `true` shows the error indicator on that tab",
    },
    primaryIcon: {
      control: "object",
      description: "Custom left icon component (defaults to the error alert icon)",
    },
    primaryIconColor: {
      control: "select",
      description: "Color token applied to the primary icon",
      options: ["error", "primary", "secondary", "success", "warning", "info", "grey"],
    },
    secondaryIcons: {
      control: "object",
      description: "Icons shown on the right side of the tabs",
    },
    tabs: {
      control: "object",
      description: "Array of tab definitions",
    },
    selectedTab: {
      control: "text",
      description: "Active tab value",
    },
    "select-tab": {
      action: "select-tab",
      description: "Emitted when a tab is selected",
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklVerticalTabs },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 280px;">
        <ckl-vertical-tabs 
          v-bind="args" 
          @select-tab="(tab) => { args.selectedTab = tab; args['select-tab']?.(tab); }"
        />
      </div>
    `,
  }),
};

export const Interactive = {
  render: (args) => ({
    components: { CklVerticalTabs },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 500px; display: flex; gap: 24px; font-family: sans-serif;">
        <div style="width: 240px; border-right: 1px solid #e2e8f0; padding-right: 16px;">
          <ckl-vertical-tabs
            v-bind="args"
            @select-tab="(tab) => { args.selectedTab = tab; args['select-tab']?.(tab); }"
          />
        </div>
        <div style="flex: 1; padding: 16px; background: #f8fafc; border-radius: 8px;">
          <h3 style="margin-top: 0; text-transform: capitalize;">{{ args.selectedTab }} Panel</h3>
          <p style="color: #64748b;">Content corresponding to selected vertical step.</p>
        </div>
      </div>
    `,
  }),
};

export const WithErrorIndicators = {
  args: {
    tabs: [
      { value: "step-1", name: "Step 1: Account Info" },
      { value: "step-2", name: "Step 2: Payment Details" },
      { value: "step-3", name: "Step 3: Review & Submit" },
    ],
    selectedTab: "step-2",
    tabErrors: {
      "step-2": true,
    },
  },
  render: (args) => ({
    components: { CklVerticalTabs },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 300px;">
        <ckl-vertical-tabs 
          v-bind="args" 
          @select-tab="(tab) => { args.selectedTab = tab; args['select-tab']?.(tab); }"
        />
      </div>
    `,
  }),
};
