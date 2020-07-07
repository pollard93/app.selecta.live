import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamMessagesVod from './StreamMessagesVod';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/StreamMessagesVod', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamMessagesVod', () => (
    <StreamMessagesVod
      variables={{
        id: 'test',
        after: new Date().toISOString(),
        threshold: 1000,
      }}
    />
  ));
