/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import RegisterView from './RegisterView';
import Register from './Register';
import { View } from 'react-native';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import color from '../../styles/definitions/color';

storiesOf('Onboarding/Register', module)
  .addDecorator((getStory) => <View style={[GlobalStyles.PageFill, { backgroundColor: color.mono.dark }]}>{getStory()}</View>)
  .add('Register', () => (
    <Register />
  ))
  .add('RegisterView Default', () => (
    <RegisterView
      loading={false}
      onSubmit={console.log}
      onLogin={console.log}
    />
  ))
  .add('RegisterView Loading', () => (
    <RegisterView
      loading={true}
      onSubmit={console.log}
      onLogin={console.log}
    />
  ));