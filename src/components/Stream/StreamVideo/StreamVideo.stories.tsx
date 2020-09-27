import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import StreamVideo from './StreamVideo';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';

storiesOf('Stream/StreamVideo', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('StreamVideo - VOD', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'VOD',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamVideo
          data={queryResult.data.getStreamProfile}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamVideo - LIVE', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'LIVE',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamVideo
          data={{
            ...queryResult.data.getStreamProfile,
            timeToLive: null,
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamVideo - About to go live', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'VOD',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamVideo
          data={{
            ...queryResult.data.getStreamProfile,
            timeFromLive: null,
            timeToLive: null,
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamVideo - Disable full screen', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'VOD',
        },
      });
      if (queryResult.loading) return null;

      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ aspectRatio: 1.7777777778 }}>
          <StreamVideo
            disableFullScreen
            data={queryResult.data.getStreamProfile}
          />
        </View>
      );
    };

    return <TestComponent />;
  });
