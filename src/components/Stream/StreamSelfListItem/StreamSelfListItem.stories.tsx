import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamSelfListItem from './StreamSelfListItem';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';

storiesOf('StreamSelfs/StreamSelfListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('StreamSelfsListItem', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });

      if (res.loading) return null;

      return (
        <StreamSelfListItem data={res.data.getStreamSelf} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Long title', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });

      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            name: 'Stream Title to go here and here and here And maybe here',
          }}
        />
      );
    };

    return <TestComponent />;
  })
  .add('StreamSelfsListItem - Upcoming', () => {
    const TestComponent = () => {
      const res = useGetStreamSelfQuery({ variables: { id: '1' } });

      if (res.loading) return null;

      return (
        <StreamSelfListItem
          data={{
            ...res.data.getStreamSelf,
            name: 'Stream Title to go here and here and here And maybe here',
            timeFrom: new Date(Date.now() + 360000).toISOString(), // now
          }}
        />
      );
    };

    return <TestComponent />;
  });
