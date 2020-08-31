/* eslint-disable no-console */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, View } from 'react-native';
import { OptionsModalTransitionStyle, Navigation } from 'react-native-navigation';
import UpdatePassword from './UpdatePassword';
import { openModalScreen } from '../../../screens/utils';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

storiesOf('UserSelf/UpdatePassword', module)
  .add('UpdatePassword', () => (
    <UpdatePassword onClosed={console.log} />
  ))
  .add('UpdatePassword - with drawer', () => (
    <View style={[GlobalStyles.PageFill, { justifyContent: 'center', alignItems: 'center' }]}>
      <Button
        title="Open Drawer"
        onPress={() => {
          openModalScreen({
            component: (
              <UpdatePassword
                onClosed={() => {
                  Navigation.dismissModal('UPDATE_PASSWORD');
                }}
              />
            ),
          }, 'UPDATE_PASSWORD', OptionsModalTransitionStyle.crossDissolve);
        }}
      />
    </View>
  ));
