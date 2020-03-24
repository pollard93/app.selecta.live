/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { ApolloProvider } from 'react-apollo';
import { loadStories } from './storyLoader';
import mockClient from '../src/API/utils/mockClient';

import './rn-addons';

const client = mockClient();

addDecorator((getStory) => (
  <ApolloProvider client={client}>
    {getStory()}
  </ApolloProvider>
));

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
