import React from 'react';
import { storiesOf } from '@storybook/react-native';
import UpdateChannel from './UpdateChannel';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

storiesOf('UpdateChannel', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .add('UpdateChannel', () => {
    const TestComponent = () => {
      const queryResult = useGetChannelSelfQuery();
      if (queryResult.loading) return null;

      return (
        <UpdateChannel
          data={queryResult.data.getChannelSelf}
        />
      );
    };

    return <TestComponent />;
  })
  .add('UpdateChannel - empty data', () => {
    const TestComponent = () => {
      const queryResult = useGetChannelSelfQuery();
      if (queryResult.loading) return null;

      return (
        <UpdateChannel
          data={{
            ...queryResult.data.getChannelSelf,
            coverImage: null,
            profileImage: null,
            name: null,
            description: null,
            websiteUrl: null,
            twitterUrl: null,
            facebookUrl: null,
            instagramUrl: null,
          }}
        />
      );
    };

    return <TestComponent />;
  });
