import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import StreamMessagesVod from './StreamMessagesVod';

storiesOf('Stream/StreamMessagesVodVod', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamMessagesVod', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading) return null;

      return (
        <StreamMessagesVod data={streamProfile.data.getStreamProfile} />
      );
    };

    return (
      <TestComonent />
    );
  });
