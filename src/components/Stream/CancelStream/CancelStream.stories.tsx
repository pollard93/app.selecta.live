import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CancelStream from './CancelStream';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';

storiesOf('Stream/CancelStream', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('CancelStream', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <CancelStream data={queryResult.data.getStreamSelf} />
      );
    };

    return <TestComponent />;
  });
