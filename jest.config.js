const snackbarPackage = require('./packages/snackbar/package.json');

module.exports = {
  verbose: true,
  preset: 'react-native',
  // testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageReporters: ['html'],
  moduleNameMapper: {
    // '^react-native$': 'react-native-web',
    '@rn-flix/snackbar': '<rootDir>/packages/snackbar/src/index.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // transformIgnorePatterns: [
  //   '<rootDir>/node_modules/(?!(jest-)?react-native|@react-native)',
  // ],
  collectCoverageFrom: ['<rootDir>/packages/**/src/**/*.{js,jsx}'],
  projects: [
    {
      displayName: snackbarPackage.name,
      transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(jest-)?react-native|@react-native)',
      ],
      moduleNameMapper: {
        '@rn-flix/snackbar': '<rootDir>/packages/snackbar/src/index.js',
      },
      testMatch: ['<rootDir>/**/*.test.js'],
      globals: { __DEV__: true },
      // modulePathIgnorePatterns: ['<rootDir>/packages/snackbar/example'],
    },
  ],
};
