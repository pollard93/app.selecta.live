import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamCommentListItem from './StreamCommentListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamCommentsQuery } from '../../../API/query/getStreamComments/getStreamComments';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

storiesOf('Stream/StreamComments/StreamCommentListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamCommentListItem - long message', () => {
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
            // eslint-disable-next-line max-len
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae odio id nibh iaculis tempus id nec lectus. In laoreet placerat mi eu blandit. Duis non felis turpis. Aliquam diam odio, faucibus in dui ut, ultrices laoreet lectus. Ut tempus magna nibh, et tincidunt leo placerat non. Fusce commodo faucibus mi, non maximus metus consequat ut',
          }}
          streamData={streamProfile.data.getStreamProfile}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
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
          streamData={streamProfile.data.getStreamProfile}
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
          streamData={streamProfile.data.getStreamProfile}
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
          streamData={streamProfile.data.getStreamProfile}
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
          streamData={streamProfile.data.getStreamProfile}
        />
      );
    };

    return (
      <TestComonent />
    );
  })
  .add('StreamCommentListItem - channel self', () => {
    const TestComonent = () => {
      const channelSelf = useGetChannelSelfQuery();
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
      if (streamProfile.loading || channelSelf.loading || streamComments.loading) return null;

      return (
        <StreamCommentListItem
          data={{
            ...streamComments.data.getStreamComments.comments[0],
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
