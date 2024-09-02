module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['unused-imports'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
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
};
