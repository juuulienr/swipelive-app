import js from '@eslint/js';
import globals from 'globals';
import vue from 'eslint-plugin-vue';
import * as parser from 'vue-eslint-parser';

export default [
  {
    files: ['src/**/*.{js,vue}'],
    plugins: {
      vue
    },
    languageOptions: {
      parser: parser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...vue.configs.recommended.rules,
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
]; 