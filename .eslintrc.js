module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['unused-imports', 'prettier'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'prettier/prettier': [
      'error',
      {
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', 'jest.setup.js'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
