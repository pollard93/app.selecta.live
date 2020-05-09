import React from 'react';
import { storiesOf } from '@storybook/react-native';
import UpdateChannel from './UpdateChannel';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import AssetPickerDecorator from '../../../../storybook/Decorators/AssetPickerDecorator/AssetPickerDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

storiesOf('UpdateChannel', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <AssetPickerDecorator>{getStory()}</AssetPickerDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .add('UpdateChannel', () => {
    const TestComponent = () => {
      const queryResult = useGetChannelSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <UpdateChannel
          data={queryResult.data.getChannelSelf}
        />
      );
    };

    return <TestComponent />;
  });
