import { defineConfig, lazyPlugins } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import reactPlugin from "@vitejs/plugin-react";
import svgLoader from "vite-svg-loader";
import autoprefixer from "autoprefixer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Adapts @vitejs/plugin-react hooks to native Vite+ / Rolldown / OXC conventions
function react(options) {
  const plugins = reactPlugin({ disableOxcRecommendation: true, ...options });
  return plugins.map((plugin) => {
    if (plugin.name === "vite:react-babel") {
      const origConfig = plugin.config;
      return {
        ...plugin,
        config(config, env) {
          const res = origConfig ? origConfig.call(this, config, env) : {};
          const { esbuild, optimizeDeps, ...rest } = res || {};
          const { rollupOptions, ...restDeps } = optimizeDeps || {};
          return {
            ...rest,
            oxc: {
              jsx: {
                runtime: esbuild?.jsx || "automatic",
                importSource: esbuild?.jsxImportSource,
              },
            },
            optimizeDeps: {
              ...restDeps,
              ...(rollupOptions ? { rolldownOptions: rollupOptions } : {}),
            },
          };
        },
      };
    }
    return plugin;
  });
}

export default defineConfig(() => {
  const cwd = process.cwd();
  const packageName = process.env.npm_package_name;

  // Detect whether the package being compiled/tested is React or Vue
  let isReact = false;
  try {
    const pkgJsonPath = path.resolve(cwd, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.peerDependencies,
        ...pkg.devDependencies,
      };
      isReact = !!allDeps.react || (pkg.name && pkg.name.includes("react"));
    }
  } catch {
    isReact = false;
  }

  const vueSetupPath = path.resolve(__dirname, "./test-utils/setup.js");
  const reactSetupPath = path.resolve(__dirname, "./test-utils/setup-react.js");

  const commonAliases = [
    { find: "@packages", replacement: path.resolve(__dirname, "..") },
    {
      find: "@components-kit/assets/react",
      replacement: path.resolve(__dirname, "../assets/src/react/index.js"),
    },
    {
      find: "@components-kit/assets/vue",
      replacement: path.resolve(__dirname, "../assets/src/vue/index.js"),
    },
    {
      find: "@components-kit/assets/illustrations",
      replacement: path.resolve(__dirname, "../assets/src/illustrations"),
    },
    {
      find: "@components-kit/assets",
      replacement: path.resolve(__dirname, "../assets/src/index.js"),
    },
    {
      find: "@components-kit/core",
      replacement: path.resolve(__dirname, "../core/index.js"),
    },
  ];

  const reactAliases = [
    ...commonAliases,
    {
      find: "react",
      replacement: path.dirname(require.resolve("react/package.json")),
    },
    {
      find: "react-dom",
      replacement: path.dirname(require.resolve("react-dom/package.json")),
    },
    {
      find: "react/jsx-dev-runtime",
      replacement: require.resolve("react/jsx-dev-runtime"),
    },
    {
      find: "react/jsx-runtime",
      replacement: require.resolve("react/jsx-runtime"),
    },
    {
      find: "@testing-library/react",
      replacement: require.resolve("@testing-library/react"),
    },
    {
      find: "@testing-library/jest-dom",
      replacement: require.resolve("@testing-library/jest-dom"),
    },
  ];

  const vueAliases = [
    ...commonAliases,
    { find: "@vue/test-utils", replacement: require.resolve("@vue/test-utils") },
    { find: "vue", replacement: require.resolve("vue") },
  ];

  return {
    resolve: {
      alias: isReact ? reactAliases : vueAliases,
    },
    plugins: lazyPlugins(() => (isReact ? [react()] : [vue(), svgLoader()])),
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
    build: {
      minify: true,
      lib: {
        entry: "src/index.js",
        name: packageName,
        fileName: "index",
        formats: ["es"],
      },
      rollupOptions: {
        external: isReact
          ? [
              "react",
              "react-dom",
              "react/jsx-runtime",
              "react/jsx-dev-runtime",
              "@components-kit/assets",
              "@components-kit/assets/react",
              "@components-kit/core",
            ]
          : ["vue", "@components-kit/assets", "@components-kit/assets/vue", "@components-kit/core"],
        output: {
          globals: isReact
            ? {
                react: "React",
                "react-dom": "ReactDOM",
              }
            : {
                vue: "Vue",
              },
        },
      },
    },
    cacheDir: path.resolve(__dirname, "../../node_modules"),
    test: {
      clearMocks: false,
      globals: true,
      setupFiles: [isReact ? reactSetupPath : vueSetupPath],
      environment: "jsdom",
      include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
  };
});
