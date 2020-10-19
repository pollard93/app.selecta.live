/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { useGetStreamSelfQuery } from '../../../../../API/query/getStreamSelf/getStreamSelf';
import StreamStates from './StreamStates';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';

storiesOf('Stream/CreateUpdateStream/StreamStates', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('CreateUpdateStreamView - not published', () => {
    const TestComponent = () => {
      // Get stream data
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamStates
          data={{
            ...queryResult.data.getStreamSelf,
            published: null,
          }}
          onPop={console.log}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - cancelled', () => {
    const TestComponent = () => {
      // Get stream data
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamStates
          data={{
            ...queryResult.data.getStreamSelf,
            published: new Date().toISOString(),
            cancelled: new Date().toISOString(),
          }}
          onPop={console.log}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - live', () => {
    const TestComponent = () => {
      // Get stream data
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamStates
          data={{
            ...queryResult.data.getStreamSelf,
            timeFromLive: new Date().toISOString(),
            timeToLive: null,
          }}
          onPop={console.log}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - published - not gone live', () => {
    const TestComponent = () => {
      // Get stream data
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamStates
          data={{
            ...queryResult.data.getStreamSelf,
            timeFromLive: null,
            timeToLive: null,
          }}
          onPop={console.log}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - published - has finished - listed', () => {
    const TestComponent = () => {
      // Get stream data
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamStates
          data={{
            ...queryResult.data.getStreamSelf,
            timeFromLive: new Date().toISOString(),
            timeToLive: new Date().toISOString(),
            unlisted: null,
          }}
          onPop={console.log}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - published - has finished - unlisted', () => {
    const TestComponent = () => {
      // Get stream data
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamStates
          data={{
            ...queryResult.data.getStreamSelf,
            timeFromLive: new Date().toISOString(),
            timeToLive: new Date().toISOString(),
            unlisted: new Date().toISOString(),
          }}
          onPop={console.log}
        />
      );
    };

    return <TestComponent />;
  });
