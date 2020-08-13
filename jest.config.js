module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '<rootDir>/setup-tests.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  testMatch: [
    '**/*.test.tsx',
  ],
  testEnvironment: 'jsdom',
};
