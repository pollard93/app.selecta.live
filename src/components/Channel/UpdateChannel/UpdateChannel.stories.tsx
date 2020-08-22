import React from 'react';
import { storiesOf } from '@storybook/react-native';
import UpdateChannel from './UpdateChannel';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import GetChannelSelfDecorator from '../../../../storybook/Decorators/GetChannelSelfDecorator/GetChannelSelfDecorator';
import UpdateChannelView from './UpdateChannelView';

storiesOf('UpdateChannel', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <GetChannelSelfDecorator>{getStory()}</GetChannelSelfDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .add('UpdateChannel', () => <UpdateChannel />)
  .add('UpdateChannelView', () => {
    const TestComponent = () => {
      const queryResult = useGetChannelSelfQuery();
      if (queryResult.loading) return null;

      return (
        <UpdateChannelView
          canPopRef={{ current: false }}
          data={queryResult.data.getChannelSelf}
        />
      );
    };

    return <TestComponent />;
  })
  .add('UpdateChannelView - empty data', () => {
    const TestComponent = () => {
      const queryResult = useGetChannelSelfQuery();
      if (queryResult.loading) return null;

      return (
        <UpdateChannelView
          canPopRef={{ current: false }}
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
