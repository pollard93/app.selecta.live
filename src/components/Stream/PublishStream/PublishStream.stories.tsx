import React from 'react';
import { storiesOf } from '@storybook/react-native';
import PublishStream from './PublishStream';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';

storiesOf('Stream/PublishStream', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('PublishStream', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <PublishStream data={queryResult.data.getStreamSelf} />
      );
    };

    return <TestComponent />;
  });
