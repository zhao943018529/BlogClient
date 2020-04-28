module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'airbnb',
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
    'react-hooks/rules-of-hooks': 'error',
    'linebreak-style': ['off', 'unix'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
