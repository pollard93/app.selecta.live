import React from 'react';
import { storiesOf } from '@storybook/react-native';
import PayForStream from './PayForStream';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';

storiesOf('PayForStream', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('PayForStream', () => {
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'IS_NOT_CONSUMER',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <PayForStream
          data={queryResult.data.getStreamProfile}
        />
      );
    };

    return <TestComponent />;
  });
