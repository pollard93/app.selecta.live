import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react-native';
import CreateUpdateStream from './CreateUpdateStream';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import GetChannelSelfDecorator from '../../../../storybook/Decorators/GetChannelSelfDecorator/GetChannelSelfDecorator';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import CreateUpdateStreamView from './CreateUpdateStreamView';

storiesOf('Stream/CreateUpdateStream', module)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .addDecorator((getStory) => <GetChannelSelfDecorator>{getStory()}</GetChannelSelfDecorator>)
  .add('CreateUpdateStreamView - Create', () => {
    const TestComponent = () => {
      const { data: { getChannelSelf } } = useGetChannelSelfQuery();
      const ref = useRef();

      return (
        <CreateUpdateStreamView
          channelData={getChannelSelf}
          getStreamSelfsVariables={{}}
          canPopRef={ref}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - Create (freeStreamAllowance = 0)', () => {
    const TestComponent = () => {
      const { data: { getChannelSelf } } = useGetChannelSelfQuery();
      const ref = useRef();

      return (
        <CreateUpdateStreamView
          channelData={{
            ...getChannelSelf,
            freeStreamAllowance: 0,
          }}
          getStreamSelfsVariables={{}}
          canPopRef={ref}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - update', () => {
    const TestComponent = () => {
      const { data: { getChannelSelf } } = useGetChannelSelfQuery();
      const ref = useRef();

      // Get stream data
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <CreateUpdateStreamView
          channelData={getChannelSelf}
          data={{
            ...queryResult.data.getStreamSelf,
            cost: getChannelSelf.creditMinimumStreamCost,
            published: null,
          }}
          getStreamSelfsVariables={{}}
          canPopRef={ref}
        />
      );
    };

    return <TestComponent />;
  })
  .add('CreateUpdateStreamView - update (freeStreamAllowance = 0)', () => {
    const TestComponent = () => {
      const { data: { getChannelSelf } } = useGetChannelSelfQuery();
      const ref = useRef();

      // Get stream data
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <CreateUpdateStreamView
          channelData={{
            ...getChannelSelf,
            freeStreamAllowance: 0,
          }}
          data={{
            ...queryResult.data.getStreamSelf,
            cost: getChannelSelf.creditMinimumStreamCost,
            published: null,
          }}
          getStreamSelfsVariables={{}}
          canPopRef={ref}
        />
      );
    };

    return <TestComponent />;
  });
