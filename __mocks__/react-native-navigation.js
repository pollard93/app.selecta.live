jest.mock('react-native-navigation', () => ({
  Navigation: {
    setRoot: jest.fn(),
    showModal: jest.fn(),
    push: jest.fn(),
  },
}));
