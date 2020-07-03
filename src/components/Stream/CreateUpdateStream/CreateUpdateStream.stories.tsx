import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CreateUpdateStream from './CreateUpdateStream';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import GetChannelSelfDecorator from '../../../../storybook/Decorators/GetChannelSelfDecorator/GetChannelSelfDecorator';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

storiesOf('CreateUpdateStream', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .addDecorator((getStory) => <GetChannelSelfDecorator>{getStory()}</GetChannelSelfDecorator>)
  .add('CreateUpdateStream - Create', () => {
    const TestComponent = () => {
      const { data } = useGetChannelSelfQuery();

      return (
        <CreateUpdateStream channel={data.getChannelSelf} />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStream - Create (freeStreamAllowance = 0)', () => {
    const TestComponent = () => {
      const { data } = useGetChannelSelfQuery();

      return (
        <CreateUpdateStream
          channel={{
            ...data.getChannelSelf,
            freeStreamAllowance: 0,
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStream - update', () => {
    const TestComponent = () => {
      const { data } = useGetChannelSelfQuery();
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <CreateUpdateStream
          channel={data.getChannelSelf}
          data={queryResult.data.getStreamSelf}
        />
      );
    };

    return <TestComponent />;
  });
