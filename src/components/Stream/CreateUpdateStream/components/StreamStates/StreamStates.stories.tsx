import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { useGetStreamSelfQuery } from '../../../../../API/query/getStreamSelf/getStreamSelf';
import StreamStates from './StreamStates';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';

storiesOf('Stream/CreateUpdateStream/StreamStates', module)
  .addDecorator((getStory) => <CenterView style={{ alignItems: 'stretch' }}>{getStory()}</CenterView>)
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
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - published', () => {
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
          }}
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
        />
      );
    };

    return <TestComponent />;
  });
