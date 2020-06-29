jest.mock('react-native-safe-area', () => ({
  getSafeAreaInsetsForRootView: jest.fn(),
}));
