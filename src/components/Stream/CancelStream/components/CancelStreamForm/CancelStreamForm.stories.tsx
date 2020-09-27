/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CancelStreamForm from './CancelStreamForm';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamSelfQuery } from '../../../../../API/query/getStreamSelf/getStreamSelf';

storiesOf('Stream/CancelStream/CancelStreamForm', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('CancelStreamForm', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <CancelStreamForm
          data={queryResult.data.getStreamSelf}
          onDismiss={console.log}
        />
      );
    };

    return <TestComponent />;
  });
