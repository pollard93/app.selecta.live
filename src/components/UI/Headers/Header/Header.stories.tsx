/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Header from './Header';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';
import { useGetSelfQuery, GET_SELF_QUERY } from '../../../../API/query/getSelf/getSelf';
import { getSelf } from '../../../../API/query/getSelf/__generated__/getSelf';
import GetSelfDecorator from '../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import DarkModeDecorator from '../../../../../storybook/Decorators/DarkModeDecorator/DarkModeDecorator';
import color from '../../../../styles/definitions/color';

storiesOf('UI/Headers/Header', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <View style={[GlobalStyles.PageFill, { backgroundColor: color.mono.pale.dark }]}>{getStory()}</View>)
  .addDecorator((getStory) => <DarkModeDecorator switchPosition="bottomRight">{getStory()}</DarkModeDecorator>)
  .add('Header', () => (
    <Header />
  ))
  .add('Header - no profile picture', () => {
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

      return <Header />;
    };

    return (
      <TestComponent />
    );
  })
  .add('Header - 1000 credits', () => {
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

      return <Header />;
    };

    return (
      <TestComponent />
    );
  });
