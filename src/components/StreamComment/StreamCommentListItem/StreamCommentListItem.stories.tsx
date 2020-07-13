import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamCommentListItem from './StreamCommentListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamCommentsQuery } from '../../../API/query/getStreamComments/getStreamComments';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import color from '../../../styles/definitions/color';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';

storiesOf('Stream/StreamComments/StreamCommentListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: color.mono.pale.light }}>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamCommentListItem - other user', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      const streamComments = useGetStreamCommentsQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading || streamComments.loading) return null;

      return (
        <StreamCommentListItem
          data={streamComments.data.getStreamComments.comments[0]}
          channelData={streamProfile.data.getStreamProfile.channel}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamCommentListItem - no profile picture', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      const streamComments = useGetStreamCommentsQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading || streamComments.loading) return null;

      return (
        <StreamCommentListItem
          data={{
            ...streamComments.data.getStreamComments.comments[0],
            user: {
              ...streamComments.data.getStreamComments.comments[0].user,
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
  .add('StreamCommentListItem - self', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      const streamComments = useGetStreamCommentsQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading || streamComments.loading) return null;

      return (
        <StreamCommentListItem
          data={{
            ...streamComments.data.getStreamComments.comments[0],
            user: {
              ...streamComments.data.getStreamComments.comments[0].user,
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
  .add('StreamCommentListItem - channel', () => {
    const TestComonent = () => {
      const streamProfile = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      const streamComments = useGetStreamCommentsQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (streamProfile.loading || streamComments.loading) return null;

      return (
        <StreamCommentListItem
          data={{
            ...streamComments.data.getStreamComments.comments[0],
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
