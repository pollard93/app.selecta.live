/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaView } from 'react-native';
import GoLiveView from './GoLiveView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import { useGetStreamUrlQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import GoLive from './GoLive';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

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
        <SafeAreaView style={GlobalStyles.PageFill}>
          <GoLiveView
            endLiveLoading={false}
            goLiveLoading={false}
            id=""
            onCancelEndLive={console.log}
            onEndLive={console.log}
            onGoLive={console.log}
            onStartEndLive={console.log}
            state="WAITING"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
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
        <SafeAreaView style={GlobalStyles.PageFill}>
          <GoLiveView
            endLiveLoading={false}
            goLiveLoading={false}
            id=""
            onCancelEndLive={console.log}
            onEndLive={console.log}
            onGoLive={console.log}
            onStartEndLive={console.log}
            state="CONNECTED"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
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
        <SafeAreaView style={GlobalStyles.PageFill}>
          <GoLiveView
            endLiveLoading={false}
            goLiveLoading={false}
            id=""
            onCancelEndLive={console.log}
            onEndLive={console.log}
            onGoLive={console.log}
            onStartEndLive={console.log}
            state="LIVE"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('GoLive - END_CONFIRM', () => {
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
        <SafeAreaView style={GlobalStyles.PageFill}>
          <GoLiveView
            endLiveLoading={false}
            goLiveLoading={false}
            id=""
            onCancelEndLive={console.log}
            onEndLive={console.log}
            onGoLive={console.log}
            onStartEndLive={console.log}
            state="END_CONFIRM"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
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
        <SafeAreaView style={GlobalStyles.PageFill}>
          <GoLiveView
            endLiveLoading={false}
            goLiveLoading={false}
            id=""
            onCancelEndLive={console.log}
            onEndLive={console.log}
            onGoLive={console.log}
            onStartEndLive={console.log}
            state="ENDED"
            streamSelfQueryResult={streamSelfQueryResult}
            streamUrlQueryResult={streamUrlQueryResult}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  });
