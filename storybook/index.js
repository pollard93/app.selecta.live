/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { ApolloProvider } from 'react-apollo';
import Sinon from 'sinon';
import { Navigation } from 'react-native-navigation';
import { loadStories } from './storyLoader';
import mockClient from '../src/API/utils/mockClient';
import * as ScreenUtils from '../src/screens/utils';
import { setSafeArea } from '../src/modules/SafeAreaInsets/SafeAreaInsets';

import './rn-addons';


/**
 * Stub Navigation
 */
try {
  Sinon.stub(Navigation, 'popTo').returns({ finally() {} });
  Sinon.stub(Navigation, 'pop').returns({ finally() {} });
  Sinon.stub(Navigation, 'popToRoot').returns({ finally() {} });
  Sinon.stub(Navigation, 'push').returns({ finally() {} });
  Sinon.stub(Navigation, 'setDefaultOptions').returns({ finally() {} });
  Sinon.stub(Navigation, 'setStackRoot').returns({ finally() {} });
  Sinon.stub(Navigation, 'showOverlay').returns({ finally() {} });
  Sinon.stub(Navigation, 'updateProps').returns({ finally() {} });
  Sinon.stub(ScreenUtils, 'goToLogin').returns({ finally() {} });
  Sinon.stub(ScreenUtils, 'goHome').returns({ finally() {} });
  Sinon.stub(ScreenUtils, 'goToRequireUpdateScreen').returns({ finally() {} });
  Sinon.stub(ScreenUtils, 'pushScreen').returns({ finally() {} });
  Sinon.stub(ScreenUtils, 'pushScreenV2').returns({ finally() {} });
// eslint-disable-next-line no-empty
} catch (e) {}


/**
 * Mock apollo client
 */

const client = mockClient();

addDecorator((getStory) => (
  <ApolloProvider client={client}>
    {getStory()}
  </ApolloProvider>
));


/**
 * Add safe area insets
 */
const SafeAreaInsetDecorator = (props) => {
  const [, setState] = useState({});

  useEffect(() => {
    if (!global.safeAreaInsets) {
      (async () => {
        await setSafeArea();
        setState({});
      })();
    }
  }, []);

  return global.safeAreaInsets ? props.children : null;
};

addDecorator((getStory) => (
  <SafeAreaInsetDecorator>
    {getStory()}
  </SafeAreaInsetDecorator>
));


/**
 * import stories
 */
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  onDeviceUI: false,
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
