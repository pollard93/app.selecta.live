import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelFunds from './ChannelFunds';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

storiesOf('ChannelFunds', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
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
