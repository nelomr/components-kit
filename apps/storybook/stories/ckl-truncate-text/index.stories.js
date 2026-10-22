import { CklTruncateText } from '@components-kit/ckl-truncate-text/src';

export default {
  title: 'components/ckl-truncate-text',
  component: CklTruncateText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'This is a long text that needs to be truncated because it exceeds the limit.',
    characterLimit: 20,
    separator: ', ',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Text string or array of items to truncate',
    },
    characterLimit: {
      control: 'number',
      description: 'Maximum character limit before truncation',
    },
    separator: {
      control: 'text',
      description: 'Separator string when text is an array',
    },
  },
};

export const Primary = {
  args: {
    text: 'This is a long text that needs to be truncated because it exceeds the limit.',
    characterLimit: 20,
    separator: ', ',
  },
  render: (args) => ({
    components: { CklTruncateText },
    setup() {
      return { args };
    },
    template: `<ckl-truncate-text v-bind="args" />`,
  }),
};

export const ArrayUsage = {
  args: {
    text: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    characterLimit: 15,
    separator: ', ',
  },
  render: (args) => ({
    components: { CklTruncateText },
    setup() {
      return { args };
    },
    template: `<ckl-truncate-text v-bind="args" />`,
  }),
};
