import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Config from 'react-native-config';
import StreamVideo from './StreamVideo';
import StreamVideoView from './StreamVideoView';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';

storiesOf('Stream/StreamVideo', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('StreamVideo', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamVideo data={queryResult.data.getStreamProfile} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamVideoView', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'test-id',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamVideoView
          url={Config.REACT_APP_APP_TEST_STREAM_URL}
          data={queryResult.data.getStreamProfile}
        />
      );
    };

    return <TestComponent />;
  });
