import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamComments from './StreamComments';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/StreamComments', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamComments', () => (
    <StreamComments id="test" />
  ));
