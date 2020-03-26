jest.mock('react-native-fbsdk', () => ({
  LoginManager: {
    logInWithPermissions: jest.fn(async () => ({
      grantedPermissions: ['email'],
    })),
    logOut: jest.fn(),
  },
  AccessToken: {
    getCurrentAccessToken: jest.fn(() => ({
      accessToken: 'facebook-token',
    })),
  },
}));
