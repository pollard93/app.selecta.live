import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamPurchase from './StreamPurchase';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamProfileQuery } from '../../../../../API/query/getStreamProfile/getStreamProfile';
import GetSelfDecorator from '../../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/StreamProfile/StreamPurchase', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamPurchase', () => {
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
          }}
        />
      );
    };

    return <TestComponent />;
  });
