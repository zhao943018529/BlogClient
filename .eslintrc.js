module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'airbnb-base',
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
    },
    'import/extensions': ['.ts', '.tsx'],
  },
};
