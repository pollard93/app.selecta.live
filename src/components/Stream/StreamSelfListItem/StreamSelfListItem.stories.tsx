import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamSelfListItem from './StreamSelfListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import StreamSelfListItemSkeleton from './StreamSelfListItemSkeleton';

storiesOf('Stream/StreamSelfs/StreamSelfListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .add('StreamSelfsListItem', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });

      if (res.loading) return null;

      return (
        <StreamSelfListItem data={res.data.getStreamSelf} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Long title, multiple tags', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });

      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            name: 'Stream Title to go here and here and here And maybe here',
            tags: [
              { __typename: 'TagProfile', title: 'hello' },
              { __typename: 'TagProfile', title: 'hello' },
              { __typename: 'TagProfile', title: 'hello' },
              { __typename: 'TagProfile', title: 'hello' },
              { __typename: 'TagProfile', title: 'hello' },
              { __typename: 'TagProfile', title: 'hello' },
              { __typename: 'TagProfile', title: 'hello' },
            ],
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Live now', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });

      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            timeFrom: new Date().toISOString(), // Just started
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Upcoming', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });

      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            timeFrom: new Date(Date.now() + 360000).toISOString(), // not started yet
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItemSkeleton', () => <StreamSelfListItemSkeleton />);
