const path = require('path')

const prettierOptions = require(path.resolve(__dirname, '.prettierrc.js'))
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['*.js', '*.spec.ts', '*.spec.tsx'],
  extends: ['plugin:react-hooks/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'tailwindcss', 'prettier'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-comment-textnodes': 'off',
    'prettier/prettier': [
      'warn',
      {
        ...prettierOptions,
        endOfLine: 'auto',
      },
    ],
  },
}
