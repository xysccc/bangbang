/*
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-04-10 17:54:50
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-10 17:55:30
 * @FilePath: \bangbang\.eslintrc.js
 */
// .eslintrc.js
module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
      es6: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      jsxPragma: 'React',
      ecmaFeatures: {
        jsx: true,
        tsx: true
      }
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:vue/vue3-recommended',
      'prettier'
    ],
    overrides: [
      {
        files: ['*.ts', '*.tsx', '*.vue'],
        rules: {
          'no-undef': 'off'
        }
      }
    ],
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          registeredComponentsOnly: false,
          ignores: []
        }
      ],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': [
        'error',
        {
          allowUsingIterationVar: false
        }
      ],
      'vue/v-bind-style': ['error', 'shorthand'],
      'vue/v-on-style': ['error', 'shorthand'],
      'no-useless-escape': 0
    }
  }