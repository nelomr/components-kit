import CklBarometerChart from '../../../../packages/components/ckl-barometer-chart/src/ckl-barometer-chart.vue';

export default {
  title: 'components/ckl-barometer-chart',
  component: CklBarometerChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: { CklBarometerChart },
    setup() {
      return { args };
    },
    template: '<ckl-barometer-chart v-bind="args" />',
  }),
  args: {
    percentage: 50,
    size: '300px',
  },
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Current percentage value (0-100)',
    },
    size: {
      control: 'text',
      description: 'Size of the gauge (width)',
    },
    ranges: {
      control: 'object',
      description: 'Configuration for ranges and labels',
    },
  },
};

export const Default = {
  args: {
    percentage: 10,
  },
};

export const Half = {
  args: {
    percentage: 50,
  },
};

export const Full = {
  args: {
    percentage: 100,
  },
};

export const CustomRanges = {
  args: {
    percentage: 60,
    ranges: [
      { min: 0, max: 30, label: 'Bad' },
      { min: 30, max: 70, label: 'Average' },
      { min: 70, max: 100, label: 'Good' },
    ],
  },
};

export const Interactive = {
  args: {
    percentage: 75,
  },
};

const withFontSize = (fontSize) => (args) => ({
  components: { CklBarometerChart },
  setup() {
    return { args };
  },
  template: `<div style="font-size: ${fontSize};">
    <ckl-barometer-chart v-bind="args" />
  </div>`,
});

export const Font12 = {
  render: withFontSize('12px'),
  args: {
    size: '18em',
    percentage: 25,
  },
};

export const Font16 = {
  render: withFontSize('16px'),
  args: {
    size: '18em',
    percentage: 50,
  },
};

export const Font24 = {
  render: withFontSize('24px'),
  args: {
    size: '18em',
    percentage: 75,
  },
};

export const Font32 = {
  render: withFontSize('32px'),
  args: {
    size: '18em',
    percentage: 100,
  },
};
