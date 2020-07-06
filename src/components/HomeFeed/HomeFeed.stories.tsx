import React from 'react';
import { storiesOf } from '@storybook/react-native';
import HomeFeed from './HomeFeed';
import GetSelfDecorator from '../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('HomeFeed', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('HomeFeed', () => (
    <HomeFeed />
  ));
