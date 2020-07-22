import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamMessageListItem from './StreamMessageListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamMessagesQuery } from '../../../API/query/getStreamMessages/getStreamMessages';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import color from '../../../styles/definitions/color';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';

storiesOf('Stream/StreamMessages/StreamMessageListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: color.mono.pale.light }}>{getStory()}</SafeAreaViewDecorator>)
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
          streamData={streamProfile.data.getStreamProfile}
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
          streamData={streamProfile.data.getStreamProfile}
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
          streamData={streamProfile.data.getStreamProfile}
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
          streamData={streamProfile.data.getStreamProfile}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamMessageListItem - large text', () => {
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
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere, urna et auctor scelerisque, dui justo faucibus neque, nec tempor neque lectus ut velit. Suspendisse semper faucibus ex, nec finibus ex egestas ut. Vivamus sed sapien a dolor molestie congue. Duis eget nisi eu eros sagittis interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ut lectus eros. Cras volutpat lacus eget nisi tincidunt, eu fringilla urna iaculis. Phasellus facilisis pretium leo at bibendum. Vivamus venenatis tellus ut pulvinar malesuada. Fusce ultricies leo sem, ut pulvinar arcu placerat et. Etiam eget tristique libero.',
          }}
          streamData={streamProfile.data.getStreamProfile}
        />
      );
    };

    return (
      <TestComonent />
    );
  });
