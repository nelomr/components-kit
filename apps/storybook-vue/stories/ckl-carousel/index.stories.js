import { CklCarousel } from "@components-kit/vue-ckl-carousel";
import { ref } from "vue";
import { within, userEvent } from "storybook/test";

export default {
  title: "components/ckl-carousel",
  component: CklCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    items: [
      { id: "1", content: "Slide 1" },
      { id: "2", content: "Slide 2" },
      { id: "3", content: "Slide 3" },
      { id: "4", content: "Slide 4" },
      { id: "5", content: "Slide 5" },
    ],
    itemWidth: 200,
    gap: 16,
    slidesToScroll: 1,
    transitionDuration: 300,
    itemKey: "id",
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of items to display in the carousel",
    },
    itemWidth: {
      control: "number",
      description: "Width of each slide in pixels",
    },
    gap: {
      control: "number",
      description: "Gap between slides in pixels",
    },
    slidesToScroll: {
      control: "number",
      description: "Number of slides to scroll at once",
    },
    transitionDuration: {
      control: "number",
      description: "Duration of the transition in milliseconds",
    },
    itemKey: {
      control: "text",
      description: "Key to identify unique items",
    },
    visibleItems: {
      control: "number",
      description:
        "Number of items visible at once. If set, overrides automatic width calculation.",
    },
    modelValue: {
      control: "number",
      description: "Current slide index (v-model)",
    },
    "update:model-value": {
      action: "update:model-value",
      description: "Emitted when the current index changes",
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklCarousel },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 800px; max-width: 100%;">
        <ckl-carousel v-bind="args" @update:model-value="(val) => { args.modelValue = val; args['update:model-value']?.(val); }">
          <template #slide="{ item }">
            <div style="
              height: 150px; 
              background-color: #f3f4f6; 
              border: 1px solid #e5e7eb; 
              border-radius: 8px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              font-family: sans-serif;
              color: #374151;
              font-weight: 500;
            ">
              {{ item.content }}
            </div>
          </template>
        </ckl-carousel>
      </div>
    `,
  }),
};

export const Interactive = {
  render: (args) => ({
    components: { CklCarousel },
    setup() {
      const currentIndex = ref(0);
      return { args, currentIndex };
    },
    template: `
      <div style="width: 800px; max-width: 100%;">
        <div style="margin-bottom: 16px; font-family: sans-serif;">
          Current Index: <strong>{{ currentIndex }}</strong>
          <button @click="currentIndex = 0" style="margin-left: 10px; padding: 4px 8px; cursor: pointer;">Go to Start</button>
          <button @click="currentIndex = 4" style="margin-left: 10px; padding: 4px 8px; cursor: pointer;">Go to End</button>
        </div>
        <ckl-carousel v-bind="args" v-model="currentIndex">
          <template #slide="{ item, index }">
            <div :style="{
              height: '150px',
              backgroundColor: index === currentIndex ? '#fee2e2' : '#f3f4f6',
              border: index === currentIndex ? '2px solid #ef4444' : '1px solid #e5e7eb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'sans-serif',
              color: index === currentIndex ? '#b91c1c' : '#374151',
              fontWeight: 500,
              transition: 'all 0.3s'
            }">
              {{ item.content }} (Index: {{ index }})
            </div>
          </template>
        </ckl-carousel>
      </div>
    `,
  }),
};

export const FixedVisibleItems = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      content: `Item ${i + 1}`,
    })),
    itemWidth: 100,
    visibleItems: 3,
  },
  render: (args) => ({
    components: { CklCarousel },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100%;">
        <p>This carousel shows exactly 3 items even if there is space for more.</p>
        <ckl-carousel v-bind="args" @update:model-value="(val) => { args.modelValue = val; args['update:model-value']?.(val); }">
          <template #slide="{ item }">
            <div style="
              height: 100px; 
              background-color: #d1fae5; 
              border: 1px solid #6ee7b7; 
              border-radius: 8px; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              font-family: sans-serif;
              color: #047857;
            ">
              {{ item.content }}
            </div>
          </template>
        </ckl-carousel>
      </div>
    `,
  }),
};

export const NoControls = {
  args: {
    items: [
      { id: "1", content: "Slide 1" },
      { id: "2", content: "Slide 2" },
    ],
    itemWidth: 200,
  },
  render: (args) => ({
    components: { CklCarousel },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 600px; max-width: 100%;">
        <ckl-carousel v-bind="args" @update:model-value="(val) => { args.modelValue = val; args['update:model-value']?.(val); }">
          <template #slide="{ item }">
            <div style="
              height: 150px; 
              background-color: #e0f2fe; 
              border: 1px solid #bae6fd; 
              border-radius: 8px; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              font-family: sans-serif;
              color: #0369a1;
            ">
              {{ item.content }}
            </div>
          </template>
        </ckl-carousel>
      </div>
    `,
  }),
};

export const WithInteractions = {
  ...Primary,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nextButton = canvas.getByLabelText("Next slide");

    await step("Click next button", async () => {
      await userEvent.click(nextButton);
    });

    // Note: We can't easily assert internal state here without more complex setup,
    // but we can check if the button is still there or if aria-hidden changed on slides if we really wanted to.
    // For now, this is enough to show the Interactions tab.
  },
};
