import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamCommentListItem from './StreamCommentListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetStreamCommentsQuery } from '../../../API/query/getStreamComments/getStreamComments';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import color from '../../../styles/definitions/color';

storiesOf('Stream/StreamComments/StreamCommentListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: color.mono.pale.light }}>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamCommentListItem - other user', () => {
    const TestComonent = () => {
      const queryResult = useGetStreamCommentsQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamCommentListItem data={queryResult.data.getStreamComments.comments[0]} />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamCommentListItem - no profile picture', () => {
    const TestComonent = () => {
      const queryResult = useGetStreamCommentsQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamCommentListItem
          data={{
            ...queryResult.data.getStreamComments.comments[0],
            user: {
              ...queryResult.data.getStreamComments.comments[0].user,
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
  .add('StreamCommentListItem - self', () => {
    const TestComonent = () => {
      const queryResult = useGetStreamCommentsQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamCommentListItem
          data={{
            ...queryResult.data.getStreamComments.comments[0],
            user: {
              ...queryResult.data.getStreamComments.comments[0].user,
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
