import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamVideo from './StreamVideo';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';

storiesOf('StreamVideo', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('StreamVideo', () => (
    <StreamVideo id="test" />
  ));
