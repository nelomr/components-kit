import { CklBreadcrumb } from '@components-kit/ckl-breadcrumb/src';

export default {
  title: 'components/ckl-breadcrumb',
  component: CklBreadcrumb,
  tags: ['autodocs'],
  args: {
    path: [
      {
        name: 'home',
        text: 'home',
        params: {
          id: '1',
        },
      },
      {
        name: 'detail',
        text: 'detail',
        params: {
          id: '2',
        },
      },
      {
        name: 'contact',
        text: 'contact',
        params: {
          id: '3',
        },
      },
    ],
    size: '',
  },
  argTypes: {
    path: {
      control: 'object',
      description: 'Array of breadcrumb items with name, text, and params',
    },
    size: {
      control: 'text',
      description: 'CSS class or sizing class applied to nodes',
    },
    'node-click': {
      action: 'node-click',
      description: 'Emitted when a breadcrumb node is clicked',
    },
  },
};

export const Primary = {
  render: (args) => ({
    components: { CklBreadcrumb },
    setup() {
      return { args };
    },
    template: `<ckl-breadcrumb
                v-bind="args" v-on="args"
              />`,
  }),
};
