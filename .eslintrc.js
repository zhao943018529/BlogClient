module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'prettier', 'react', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'linebreak-style': ['off', 'unix'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@components', './src/components'],
          ['@store', './src/store'],
          ['@assets', './src/assets'],
          ['@controls', './src/controls'],
          ['@utils', './src/utils'],
          ['@graphql', './src/graphql'],
        ],
        extensions: ['.ts', '.tsx', '.jpg'],
      },
    },
    'import/extensions': ['.ts', '.tsx'],
  },
};
