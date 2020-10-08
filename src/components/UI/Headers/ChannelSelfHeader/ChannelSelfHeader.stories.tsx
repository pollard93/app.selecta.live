/* eslint-disable no-console */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import ChannelSelfHeader from './ChannelSelfHeader';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';
import { useGetSelfQuery, GET_SELF_QUERY } from '../../../../API/query/getSelf/getSelf';
import { getSelf } from '../../../../API/query/getSelf/__generated__/getSelf';
import color from '../../../../styles/definitions/color';
import GetChannelSelfDecorator from '../../../../../storybook/Decorators/GetChannelSelfDecorator/GetChannelSelfDecorator';

storiesOf('UI/Headers/ChannelSelfHeader', module)
  .addDecorator((getStory) => <GetChannelSelfDecorator>{getStory()}</GetChannelSelfDecorator>)
  .addDecorator((getStory) => <View style={[GlobalStyles.PageFill, { backgroundColor: color.mono.pale.dark }]}>{getStory()}</View>)
  .add('ChannelSelfHeader', () => (
    <ChannelSelfHeader />
  ))
  .add('ChannelSelfHeader - with pop', () => (
    <ChannelSelfHeader onPop={console.log} />
  ))
  .add('ChannelSelfHeader - no profile picture', () => {
    const TestComponent = () => {
      const { loading, error, data, client } = useGetSelfQuery();

      /**
       * Clears getSelf.profilePicture
       */
      useEffect(() => {
        if (!loading && !error) {
          client.writeQuery<getSelf>({
            query: GET_SELF_QUERY,
            data: {
              ...data,
              getSelf: {
                ...data.getSelf,
                profilePicture: null,
              },
            },
          });
        }
      }, []);

      if (loading || error || data.getSelf.profilePicture) return null;

      return <ChannelSelfHeader />;
    };

    return (
      <TestComponent />
    );
  });
