import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamSelfListItem from './StreamSelfListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';

storiesOf('Stream/StreamSelfs/StreamSelfListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('StreamSelfsListItem - Long title, multiple tags', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          getStreamSelfsVariables={{}}
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
  .add('StreamSelfsListItem - No Tags', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          getStreamSelfsVariables={{}}
          data={{
            ...res.data.getStreamSelf,
            tags: [],
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
          getStreamSelfsVariables={{}}
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
          getStreamSelfsVariables={{}}
          data={{
            ...res.data.getStreamSelf,
            cancelled: new Date().toISOString(),
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Starts in 1 hour', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          getStreamSelfsVariables={{}}
          data={{
            ...res.data.getStreamSelf,
            timeFromLive: null,
            timeToLive: null,
            timeFrom: new Date(Date.now() + 3.6e+6).toISOString(), // Starts in 1 hour
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Starts in 0.5 hour', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          getStreamSelfsVariables={{}}
          data={{
            ...res.data.getStreamSelf,
            timeFromLive: null,
            timeToLive: null,
            timeFrom: new Date(Date.now() + 1.8e+6).toISOString(), // Starts in 0.5 hour
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Is live', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          getStreamSelfsVariables={{}}
          data={{
            ...res.data.getStreamSelf,
            timeToLive: null,
            timeFromLive: new Date().toISOString(), // Has gone live
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Has ended', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });
      if (res.loading) return null;

      return (
        <StreamSelfListItem
          getStreamSelfsVariables={{}}
          data={{
            ...res.data.getStreamSelf,
            timeToLive: new Date().toISOString(), // Has ended
          }}
        />
      );
    };

    return <TestComponent />;
  });
