import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Profile from './Profile';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Profile', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('Profile', () => (
    <Profile />
  ));
