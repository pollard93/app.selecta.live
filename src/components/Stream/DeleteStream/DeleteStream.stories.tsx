import React from 'react';
import { storiesOf } from '@storybook/react-native';
import DeleteStream from './DeleteStream';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';

storiesOf('Stream/DeleteStream', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('DeleteStream', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <DeleteStream
          getStreamSelfsVariables={{}}
          data={queryResult.data.getStreamSelf}
        />
      );
    };

    return <TestComponent />;
  });
