jest.mock('react-native-navigation', () => ({
  Navigation: {
    showOverlay: jest.fn(),
    setRoot: jest.fn(),
    showModal: jest.fn(),
    push: jest.fn(),
    pop: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));
