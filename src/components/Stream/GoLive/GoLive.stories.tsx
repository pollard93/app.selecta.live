/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaView } from 'react-native';
import GoLiveView from './GoLiveView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import { useGetStreamUrlQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import GoLive from './GoLive';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/GoLive', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('GoLive', () => <GoLive id="TEST" />)
  .add('GoLive - WAITING', () => {
    const TestComponent = () => {
      const streamSelfQueryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      const streamUrlQueryResult = useGetStreamUrlQuery({
        variables: {
          id: 'test',
        },
      });
      if (streamSelfQueryResult.loading) return null;
      if (streamUrlQueryResult.loading) return null;

      return (
        <SafeAreaView>
          <GoLiveView
            state="WAITING"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
            onGoLive={console.log}
            goLiveLoading={false}
            onEndLive={console.log}
            endLiveLoading={false}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('GoLive - CONNECTED', () => {
    const TestComponent = () => {
      const streamSelfQueryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      const streamUrlQueryResult = useGetStreamUrlQuery({
        variables: {
          id: 'test',
        },
      });
      if (streamSelfQueryResult.loading) return null;
      if (streamUrlQueryResult.loading) return null;

      return (
        <SafeAreaView>
          <GoLiveView
            state="CONNECTED"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
            onGoLive={console.log}
            goLiveLoading={false}
            onEndLive={console.log}
            endLiveLoading={false}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('GoLive - LIVE', () => {
    const TestComponent = () => {
      const streamSelfQueryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      const streamUrlQueryResult = useGetStreamUrlQuery({
        variables: {
          id: 'test',
        },
      });
      if (streamSelfQueryResult.loading) return null;
      if (streamUrlQueryResult.loading) return null;

      return (
        <SafeAreaView>
          <GoLiveView
            state="LIVE"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
            onGoLive={console.log}
            goLiveLoading={false}
            onEndLive={console.log}
            endLiveLoading={false}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('GoLive - ENDED', () => {
    const TestComponent = () => {
      const streamSelfQueryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      const streamUrlQueryResult = useGetStreamUrlQuery({
        variables: {
          id: 'test',
        },
      });
      if (streamSelfQueryResult.loading) return null;
      if (streamUrlQueryResult.loading) return null;

      return (
        <SafeAreaView>
          <GoLiveView
            state="ENDED"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
            onGoLive={console.log}
            goLiveLoading={false}
            onEndLive={console.log}
            endLiveLoading={false}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  });
