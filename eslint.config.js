import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['**/node_modules/**', '**/coverage/**', 'examples/**', '.superpowers/**']
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      'comma-dangle': 'error',
      'no-console': 'warn',
      'consistent-return': 'error',
      curly: 'error',
      'default-case': 'error',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'guard-for-in': 'error',
      'no-alert': 'error',
      'no-else-return': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-new': 'error',
      'no-param-reassign': 'error',
      'no-process-env': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': 'error',
      'no-shadow': 'warn',
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', caughtErrors: 'none' }],
      'no-use-before-define': ['error', { classes: false, functions: false }],
      camelcase: ['warn', { properties: 'never' }],
      'max-depth': ['error', 3],
      'max-len': ['error', 120, 2],
      'max-params': ['error', 5],
      'no-var': 'error',
      'prefer-const': 'warn',
      quotes: ['warn', 'single', { avoidEscape: true }],
      semi: ['error', 'never']
    }
  },
  {
    files: ['**/__test__/**', '**/*.test.js'],
    languageOptions: {
      globals: { ...globals.jest }
    }
  }
]
