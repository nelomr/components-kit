module.exports = {
  ignorePatterns: ['dist/*.js'],
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vitest-globals/env': true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:storybook/recommended',
    'plugin:vue/vue3-recommended', 
    'plugin:vitest-globals/recommended', 
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'error'
  }
}
