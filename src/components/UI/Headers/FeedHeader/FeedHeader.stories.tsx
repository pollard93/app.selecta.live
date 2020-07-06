/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import FeedHeader from './FeedHeader';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';
import { useGetSelfQuery, GET_SELF_QUERY } from '../../../../API/query/getSelf/getSelf';
import { getSelf } from '../../../../API/query/getSelf/__generated__/getSelf';
import GetSelfDecorator from '../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('UI/Headers/FeedHeader', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <View style={[GlobalStyles.PageFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>{getStory()}</View>)
  .add('FeedHeader', () => (
    <FeedHeader />
  ))
  .add('FeedHeader - no profile picture', () => {
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

      return <FeedHeader />;
    };

    return (
      <TestComponent />
    );
  })
  .add('FeedHeader - 1000 credits', () => {
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
                credit: 1000,
              },
            },
          });
        }
      }, []);

      if (loading || error || data.getSelf.credit < 1000) return null;

      return <FeedHeader />;
    };

    return (
      <TestComponent />
    );
  });
