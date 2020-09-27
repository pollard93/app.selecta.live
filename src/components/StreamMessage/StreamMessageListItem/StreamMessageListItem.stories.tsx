import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamMessageListItem from './StreamMessageListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamMessagesQuery } from '../../../API/query/getStreamMessages/getStreamMessages';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

storiesOf('Stream/StreamMessages/StreamMessageListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamMessageListItem - long message', () => {
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
            // eslint-disable-next-line max-len
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae odio id nibh iaculis tempus id nec lectus. In laoreet placerat mi eu blandit. Duis non felis turpis. Aliquam diam odio, faucibus in dui ut, ultrices laoreet lectus. Ut tempus magna nibh, et tincidunt leo placerat non. Fusce commodo faucibus mi, non maximus metus consequat ut',
          }}
          streamData={streamProfile.data.getStreamProfile}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
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
  .add('StreamMessageListItem - channel self', () => {
    const TestComonent = () => {
      const channelSelf = useGetChannelSelfQuery();
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
      if (streamProfile.loading || channelSelf.loading || streamMessages.loading) return null;

      return (
        <StreamMessageListItem
          data={{
            ...streamMessages.data.getStreamMessages.messages[0],
            user: null,
          }}
          streamData={{
            ...streamProfile.data.getStreamProfile,
            channel: {
              ...streamProfile.data.getStreamProfile.channel,
              id: channelSelf.data.getChannelSelf.id,
            },
          }}
        />
      );
    };

    return (
      <TestComonent />
    );
  });
