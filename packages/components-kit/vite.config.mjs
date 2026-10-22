import { defineConfig, lazyPlugins } from 'vite-plus';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  const packageName = process.env.npm_package_name;
  const testUtilsSetupPath = path.resolve(__dirname, './test-utils/setup.js');

  return {
    resolve: {
      alias: {
        '@packages': path.resolve(__dirname, '..'),
        '@components-kit/assets': path.resolve(__dirname, '../assets/src/index.js'),
        '@vue/test-utils': require.resolve('@vue/test-utils'),
        vue: require.resolve('vue'),
      },
    },
    plugins: lazyPlugins(() => [
      vue(),
      cssInjectedByJsPlugin({ styleId: packageName }),
      svgLoader(),
    ]),
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "@packages/styles/styles.scss" as *;\n',
        },
      },
    },
    build: {
      minify: true,
      lib: {
        entry: 'src/index.js',
        name: packageName,
        fileName: 'index',
        formats: ['es'],
      },
      rollupOptions: {
        external: ['vue', '@components-kit/assets'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    cacheDir: path.resolve(__dirname, '../../node_modules'),
    test: {
      // Vitest v4 compatibility: preserve mock call history.
      // Remove after tests no longer rely on calls from setup or earlier tests.
      // https://viteplus.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
      // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
      clearMocks: false,
      globals: true,
      setupFiles: [testUtilsSetupPath],
      environment: 'jsdom',
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
