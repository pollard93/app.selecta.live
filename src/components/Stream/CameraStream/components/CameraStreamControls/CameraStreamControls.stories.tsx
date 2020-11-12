/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaView } from 'react-native';
import CameraStreamControls from './CameraStreamControls';
import GlobalStyles from '../../../../../styles/stylesheets/GlobalStyles';
import { useGetStreamSelfQuery } from '../../../../../API/query/getStreamSelf/getStreamSelf';
import { useGetStreamUrlQuery } from '../../../../../API/query/getStreamUrl/getStreamUrl';
import GetSelfDecorator from '../../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/CameraStreamControls', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('CameraStreamControls - WAITING - not streaming', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="WAITING"
            streaming={false}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - WAITING - streaming', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="WAITING"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - CONNECTED - not streaming', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="CONNECTED"
            streaming={false}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - CONNECTED - streaming', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="CONNECTED"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - LIVE_CONFIRM', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="LIVE_CONFIRM"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - LIVE - not streaming', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="LIVE"
            streaming={false}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - LIVE - streaming', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="LIVE"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - LIVE with consumers', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            liveConsumers={10000}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="LIVE"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - ENDED', () => {
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
          <CameraStreamControls
            endLiveLoading={false}
            goLiveLoading={false}
            liveConsumers={10000}
            onCancel={console.log}
            onEndLive={console.log}
            onEndLiveCancel={console.log}
            onEndLiveConfirm={console.log}
            onGoLive={console.log}
            onGoLiveCancel={console.log}
            onGoLiveConfirm={console.log}
            setStreaming={console.log}
            state="ENDED"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  });
