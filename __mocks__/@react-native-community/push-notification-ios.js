
jest.mock('@react-native-community/push-notification-ios', () => ({
  setApplicationIconBadgeNumber: jest.fn(),
}));
