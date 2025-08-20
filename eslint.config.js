// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'app-example/**/*'],
  },
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/display-name': 'off',
    },
  },
]);
