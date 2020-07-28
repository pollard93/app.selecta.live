import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ApolloError } from 'apollo-client';
import ChannelHeader from './ChannelHeader';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetChannelProfileQuery } from '../../../API/query/getChannelProfile/getChannelProfile';
import Body from '../../UI/Typography/components/Body';

storiesOf('Channel/ChannelHeader', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ChannelHeader', () => {
    const TestComponent = () => {
      const queryResult = useGetChannelProfileQuery({
        variables: {
          id: 'TEST',
        },
      });

      return (
        <ChannelHeader
          queryResult={queryResult}
          data={queryResult.data?.getChannelProfile}
          topContent={() => (
            <Body>Top Content</Body>
          )}
        >
          {() => (
            <Body>Children</Body>
          )}
        </ChannelHeader>
      );
    };

    return <TestComponent />;
  })
  .add('ChannelHeader - loading', () => (
    <ChannelHeader
      queryResult={{ loading: true } as any}
      data={null}
      topContent={() => (
        <Body>Top Content</Body>
      )}
    >
      {() => (
        <Body>Children</Body>
      )}
    </ChannelHeader>
  ))
  .add('ChannelHeader - error', () => (
    <ChannelHeader
      queryResult={{
        called: true,
        error: new ApolloError({
          errorMessage: 'Unauthorised',
        }),
      } as any}
      data={null}
      topContent={() => (
        <Body>Top Content</Body>
      )}
    >
      {() => (
        <Body>Children</Body>
      )}
    </ChannelHeader>
  ));
