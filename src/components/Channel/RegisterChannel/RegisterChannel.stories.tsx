import React from 'react';
import { storiesOf } from '@storybook/react-native';
import RegisterChannel from './RegisterChannel';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('RegisterChannel', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('RegisterChannel', () => (
    <RegisterChannel />
  ));
