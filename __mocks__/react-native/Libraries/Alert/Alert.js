jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
