import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamUrl from './StreamUrl';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';

storiesOf('StreamUrl', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('StreamUrl', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <StreamUrl data={queryResult.data.getStreamSelf} />
      );
    };

    return <TestComponent />;
  });
