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
  .add('StreamSelfsListItem - Not published', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            published: null,
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Cancelled', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            cancelled: new Date().toISOString(),
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
            timeTo: new Date(Date.now() + 360000).toISOString(), // Not finished
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Not Started', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            timeFrom: new Date(Date.now() + 360000).toISOString(), // not started yet
            timeTo: new Date(Date.now() + 360000).toISOString(), // Not finished
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Finished', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            timeFrom: new Date(Date.now() - 360000).toISOString(), // has started
            timeTo: new Date(Date.now() - 360000).toISOString(), // has finished
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItemSkeleton', () => <StreamSelfListItemSkeleton />);
