import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {},
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    '*.{js,mjs,ts,vue}': 'vp check --fix',
  },
});
