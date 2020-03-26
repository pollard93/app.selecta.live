import { NativeModules } from 'react-native';

jest.mock('@react-native-community/google-signin', () => {
  const mockGoogleSignin = require.requireActual('@react-native-community/google-signin');
  mockGoogleSignin.GoogleSignin.configure = jest.fn();
  mockGoogleSignin.GoogleSignin.hasPlayServices = jest.fn(() => true);
  mockGoogleSignin.GoogleSignin.signIn = jest.fn(() => true);
  mockGoogleSignin.GoogleSignin.getTokens = jest.fn(() => ({
    idToken: 'google-token',
  }));
  mockGoogleSignin.GoogleSignin.revokeAccess = jest.fn();
  mockGoogleSignin.GoogleSignin.signOut = jest.fn();
  return mockGoogleSignin;
});

NativeModules.RNGoogleSignin = {
  BUTTON_SIZE_ICON: 0,
  BUTTON_SIZE_STANDARD: 0,
  BUTTON_SIZE_WIDE: 0,
  BUTTON_COLOR_AUTO: 0,
  BUTTON_COLOR_LIGHT: 0,
  BUTTON_COLOR_DARK: 0,
  SIGN_IN_CANCELLED: '0',
  IN_PROGRESS: '1',
  PLAY_SERVICES_NOT_AVAILABLE: '2',
  SIGN_IN_REQUIRED: '3',
  configure: jest.fn(),
  currentUserAsync: jest.fn(),
};
