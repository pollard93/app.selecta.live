import React from 'react';
import { storiesOf } from '@storybook/react-native';
import FollowChannel from './FollowChannel';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetChannelProfileQuery } from '../../../API/query/getChannelProfile/getChannelProfile';

storiesOf('FollowChannel', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FollowChannel', () => {
    const TestComponent = () => {
      const queryResult = useGetChannelProfileQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <FollowChannel
          data={queryResult.data.getChannelProfile}
        />
      );
    };

    return <TestComponent />;
  });
