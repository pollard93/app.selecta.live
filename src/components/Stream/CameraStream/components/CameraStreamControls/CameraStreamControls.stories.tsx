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
            onGoLive={console.log}
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
            onGoLive={console.log}
            setStreaming={console.log}
            state="WAITING"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - CONNECTED', () => {
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
            onGoLive={console.log}
            setStreaming={console.log}
            state="CONNECTED"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  })
  .add('CameraStreamControls - LIVE', () => {
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
            onGoLive={console.log}
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
            onCancel={console.log}
            onEndLive={console.log}
            onGoLive={console.log}
            setStreaming={console.log}
            state="LIVE"
            streaming={true}
            liveConsumers={100}
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
            onCancel={console.log}
            onEndLive={console.log}
            onGoLive={console.log}
            setStreaming={console.log}
            state="ENDED"
            streaming={true}
          />
        </SafeAreaView>
      );
    };

    return <TestComponent />;
  });
