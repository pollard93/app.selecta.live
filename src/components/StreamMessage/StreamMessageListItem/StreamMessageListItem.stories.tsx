import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamMessageListItem from './StreamMessageListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetStreamMessagesQuery } from '../../../API/query/getStreamMessages/getStreamMessages';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import color from '../../../styles/definitions/color';

storiesOf('Stream/StreamMessages/StreamMessageListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: color.mono.pale.light }}>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamMessageListItem - other user', () => {
    const TestComonent = () => {
      const queryResult = useGetStreamMessagesQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamMessageListItem data={queryResult.data.getStreamMessages.messages[0]} />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamMessageListItem - no profile picture', () => {
    const TestComonent = () => {
      const queryResult = useGetStreamMessagesQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamMessageListItem
          data={{
            ...queryResult.data.getStreamMessages.messages[0],
            user: {
              ...queryResult.data.getStreamMessages.messages[0].user,
              profilePicture: null,
            },
          }}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamMessageListItem - self', () => {
    const TestComonent = () => {
      const queryResult = useGetStreamMessagesQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamMessageListItem
          data={{
            ...queryResult.data.getStreamMessages.messages[0],
            user: {
              ...queryResult.data.getStreamMessages.messages[0].user,
              id: 'SELF',
            },
          }}
        />
      );
    };

    return (
      <TestComonent />
    );
  });
