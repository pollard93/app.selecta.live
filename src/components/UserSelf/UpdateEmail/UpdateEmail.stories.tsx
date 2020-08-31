/* eslint-disable no-console */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, View } from 'react-native';
import { OptionsModalTransitionStyle, Navigation } from 'react-native-navigation';
import UpdateEmail from './UpdateEmail';
import { openModalScreen } from '../../../screens/utils';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

storiesOf('UserSelf/UpdateEmail', module)
  .add('UpdateEmail', () => (
    <UpdateEmail onClosed={console.log} />
  ))
  .add('UpdateEmail - with drawer', () => (
    <View style={[GlobalStyles.PageFill, { justifyContent: 'center', alignItems: 'center' }]}>
      <Button
        title="Open Drawer"
        onPress={() => {
          openModalScreen({
            component: (
              <UpdateEmail
                onClosed={() => {
                  Navigation.dismissModal('UPDATE_EMAIL');
                }}
              />
            ),
          }, 'UPDATE_EMAIL', OptionsModalTransitionStyle.crossDissolve);
        }}
      />
    </View>
  ));
