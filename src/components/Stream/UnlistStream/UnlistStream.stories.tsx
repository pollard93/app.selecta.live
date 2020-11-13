import React from 'react';
import { storiesOf } from '@storybook/react-native';
import UnlistStream from './UnlistStream';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';

storiesOf('Stream/UnlistStream', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('UnlistStream', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <UnlistStream data={queryResult.data.getStreamSelf} />
      );
    };

    return <TestComponent />;
  });
