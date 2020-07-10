import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamMessageListItem from './StreamMessageListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetStreamMessagesQuery } from '../../../API/query/getStreamMessages/getStreamMessages';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import color from '../../../styles/definitions/color';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';

storiesOf('Stream/StreamMessages/StreamMessageListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: color.mono.pale.light }}>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamMessageListItem - other user', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      const streamMessages = useGetStreamMessagesQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading || streamMessages.loading) return null;

      return (
        <StreamMessageListItem
          data={streamMessages.data.getStreamMessages.messages[0]}
          channelData={streamProfile.data.getStreamProfile.channel}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamMessageListItem - no profile picture', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      const streamMessages = useGetStreamMessagesQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading || streamMessages.loading) return null;

      return (
        <StreamMessageListItem
          data={{
            ...streamMessages.data.getStreamMessages.messages[0],
            user: {
              ...streamMessages.data.getStreamMessages.messages[0].user,
              profilePicture: null,
            },
          }}
          channelData={streamProfile.data.getStreamProfile.channel}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamMessageListItem - self', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      const streamMessages = useGetStreamMessagesQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading || streamMessages.loading) return null;

      return (
        <StreamMessageListItem
          data={{
            ...streamMessages.data.getStreamMessages.messages[0],
            user: {
              ...streamMessages.data.getStreamMessages.messages[0].user,
              id: 'SELF',
            },
          }}
          channelData={streamProfile.data.getStreamProfile.channel}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamMessageListItem - channel', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      const streamMessages = useGetStreamMessagesQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading || streamMessages.loading) return null;

      return (
        <StreamMessageListItem
          data={{
            ...streamMessages.data.getStreamMessages.messages[0],
            user: null,
          }}
          channelData={streamProfile.data.getStreamProfile.channel}
        />
      );
    };

    return (
      <TestComonent />
    );
  });
