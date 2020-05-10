module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    './src/assets/fonts/',
  ],
  dependencies: {
    // Linked manually on android
    'react-native-splash-screen': {
      platforms: {
        android: null,
      },
    },
    // not used for ios
    'react-native-music-control': {
      platforms: {
        ios: null,
      },
    },
  },
};
