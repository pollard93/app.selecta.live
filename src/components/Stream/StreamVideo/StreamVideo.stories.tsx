import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamVideo from './StreamVideo';
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
      if (queryResult.loading) return null;

      return (
        <StreamVideo data={queryResult.data.getStreamProfile} />
      );
    };

    return <TestComponent />;
  });
