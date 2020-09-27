/* eslint-disable no-console */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, View } from 'react-native';
import { OptionsModalTransitionStyle, Navigation } from 'react-native-navigation';
import UpdateUsername from './UpdateUsername';
import { openModalScreen } from '../../../screens/utils';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

storiesOf('UserSelf/UpdateUsername', module)
  .add('UpdateUsername', () => (
    <UpdateUsername onClosed={console.log} />
  ))
  .add('UpdateUsername - with drawer', () => (
    <View style={[GlobalStyles.PageFill, { justifyContent: 'center', alignItems: 'center' }]}>
      <Button
        title="Open Drawer"
        onPress={() => {
          openModalScreen({
            component: (
              <UpdateUsername
                onClosed={() => {
                  Navigation.dismissModal('UPDATE_USERNAME');
                }}
              />
            ),
          }, 'UPDATE_USERNAME', OptionsModalTransitionStyle.crossDissolve);
        }}
      />
    </View>
  ));
