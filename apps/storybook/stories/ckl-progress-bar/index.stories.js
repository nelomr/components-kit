import { CklProgressBar } from '@components-kit/ckl-progress-bar/src';

export default {
  title: 'components/ckl-progress-bar',
  component: CklProgressBar,
  tags: ['autodocs'],
  args: {
    value: 22,
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklProgressBar },
    setup() {
      return { args };
    },
    template: `<ckl-progress-bar
                  v-bind="args" v-on="args"
              />`,
  }),
};

export const UsingSlots = {
  render: (args) => ({
    components: { CklProgressBar },
    setup() {
      return { args };
    },
    template: `<ckl-progress-bar v-bind="args" v-on="args">
                <template #default="{ value }">{{ value }}% Completed</template>
              </ckl-progress-bar>`,
  }),
};
