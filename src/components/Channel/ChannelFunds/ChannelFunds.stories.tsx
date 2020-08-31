import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelFunds from './ChannelFunds';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

storiesOf('ChannelFunds', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ChannelFunds', () => {
    const TestComponent = () => {
      const queryResult = useGetChannelSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <ChannelFunds data={queryResult.data.getChannelSelf} />
      );
    };

    return <TestComponent />;
  });
