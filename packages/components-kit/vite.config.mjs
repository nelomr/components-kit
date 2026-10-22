import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  const packageName = process.env.npm_package_name;
  const testUtilsSetupPath = path.resolve(__dirname, './test-utils/setup.js');

  return {
    resolve: {
      alias: {
        '@packages': path.resolve(__dirname, '..'),
      },
    },
    plugins: [
      vue(),
      eslint({ include: ['src/**/*.{js,vue}'] }),
      cssInjectedByJsPlugin({ styleId: packageName }),
      svgLoader(),
    ],
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
      globals: true,
      setupFiles: [testUtilsSetupPath],
      environment: 'jsdom',
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
