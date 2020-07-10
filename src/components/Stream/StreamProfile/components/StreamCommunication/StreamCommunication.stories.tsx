import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamCommunication from './StreamCommunication';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamProfileQuery } from '../../../../../API/query/getStreamProfile/getStreamProfile';
import GetSelfDecorator from '../../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import DarkModeDecorator from '../../../../../../storybook/Decorators/DarkModeDecorator/DarkModeDecorator';

storiesOf('Stream/StreamProfile/StreamCommunication', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <DarkModeDecorator switchPosition="bottomRight">{getStory()}</DarkModeDecorator>)
  .add('StreamCommunication - isConsumer - Stream has not started (starts in 5 seconds)', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'TEST',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamCommunication
          data={{
            ...queryResult.data.getStreamProfile,
            isConsumer: true,
            timeFrom: new Date(Date.now() + 5000).toISOString(),
            timeTo: new Date(Date.now() + 8.64e+7).toISOString(),
            cancelled: null,
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCommunication - isConsumer - Stream is live', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'TEST',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamCommunication
          data={{
            ...queryResult.data.getStreamProfile,
            isConsumer: true,
            timeFrom: new Date().toISOString(),
            timeTo: new Date(Date.now() + 8.64e+7).toISOString(),
            cancelled: null,
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCommunication - isConsumer - Stream has finished', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'TEST',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamCommunication
          data={{
            ...queryResult.data.getStreamProfile,
            isConsumer: true,
            timeFrom: new Date(Date.now() - 8.64e+7).toISOString(),
            timeTo: new Date().toISOString(),
            cancelled: null,
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCommunication - isConsumer false', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'TEST',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamCommunication
          data={{
            ...queryResult.data.getStreamProfile,
            isConsumer: false,
            cancelled: null,
          }}
        />
      );
    };

    return <TestComponent />;
  });
