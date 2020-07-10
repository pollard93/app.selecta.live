import React from 'react';
import { storiesOf } from '@storybook/react-native';
import HomeFeed from './HomeFeed';
import GetSelfDecorator from '../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import DarkModeDecorator from '../../../storybook/Decorators/DarkModeDecorator/DarkModeDecorator';

storiesOf('HomeFeed', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <DarkModeDecorator switchPosition="bottomRight">{getStory()}</DarkModeDecorator>)
  .add('HomeFeed', () => (
    <HomeFeed />
  ));
