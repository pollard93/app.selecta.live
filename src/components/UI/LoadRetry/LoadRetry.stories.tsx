import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ApolloError } from 'apollo-client';
import LoadRetry from './LoadRetry';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';

storiesOf('UI/LoadRetry', module)
  .add('LoadRetry Loading', () => {
    const TestComponent = () => {
      const queryResult = useGetSelfQuery();
      queryResult.loading = true;

      return (
        <LoadRetry {...queryResult} />
      );
    };

    return <TestComponent />;
  })
  .add('LoadRetry Error', () => {
    const TestComponent = () => {
      const queryResult = useGetSelfQuery();
      queryResult.error = new ApolloError({
        errorMessage: 'Unauthorised',
      });

      return (
        <LoadRetry {...queryResult} />
      );
    };

    return <TestComponent />;
  })
  .add('LoadRetry Network Error', () => {
    const TestComponent = () => {
      const queryResult = useGetSelfQuery();
      queryResult.error = new ApolloError({
        networkError: new Error(),
      });

      return (
        <LoadRetry {...queryResult} />
      );
    };

    return <TestComponent />;
  });
