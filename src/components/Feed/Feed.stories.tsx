import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Feed from './Feed';
import GetSelfDecorator from '../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Feed', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('Feed', () => (
    <Feed />
  ));
