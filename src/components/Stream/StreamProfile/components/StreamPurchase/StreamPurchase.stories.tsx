import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamPurchase from './StreamPurchase';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamProfileQuery } from '../../../../../API/query/getStreamProfile/getStreamProfile';
import GetSelfDecorator from '../../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/StreamProfile/StreamPurchase', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamPurchase - pre live', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'TEST',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamPurchase
          data={{
            ...queryResult.data.getStreamProfile,
            timeFrom: new Date().toISOString(),
            timeTo: new Date(Date.now() + 7.2e+6).toISOString(),
            timeFromLive: null,
            timeToLive: null,
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamPurchase - gone live', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'TEST',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamPurchase
          data={{
            ...queryResult.data.getStreamProfile,
            timeFrom: new Date().toISOString(),
            timeTo: new Date(Date.now() + 7.2e+6).toISOString(),
            timeFromLive: new Date().toISOString(),
            timeToLive: new Date(Date.now() + 7.2e+6).toISOString(),
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamPurchase - gone live with minutes', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'TEST',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <StreamPurchase
          data={{
            ...queryResult.data.getStreamProfile,
            timeFrom: new Date().toISOString(),
            timeTo: new Date(Date.now() + 9e+6).toISOString(),
            timeFromLive: new Date().toISOString(),
            timeToLive: new Date(Date.now() + 9e+6).toISOString(),
          }}
        />
      );
    };

    return <TestComponent />;
  });
