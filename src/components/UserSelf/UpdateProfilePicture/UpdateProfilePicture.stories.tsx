/* eslint-disable no-console */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, View } from 'react-native';
import { OptionsModalTransitionStyle } from 'react-native-navigation';
import UpdateProfilePicture from './UpdateProfilePicture';
import { openModalScreen } from '../../../screens/utils';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

storiesOf('UserSelf/UpdateProfilePicture', module)
  .add('UpdateProfilePicture', () => (
    <UpdateProfilePicture />
  ))
  .add('UpdateProfilePicture - with drawer', () => (
    <View style={[GlobalStyles.PageFill, { justifyContent: 'center', alignItems: 'center' }]}>
      <Button
        title="Open Drawer"
        onPress={() => {
          openModalScreen({
            component: (
              <UpdateProfilePicture />
            ),
          }, 'UPDATE_USERNAME', OptionsModalTransitionStyle.crossDissolve);
        }}
      />
    </View>
  ));
